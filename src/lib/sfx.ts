let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function desbloquearAudio() {
  getCtx();
}

/** Palmas estridentes: ráfagas de ruido filtrado. */
export function sonidoPalmas(veces = 14) {
  const ac = getCtx();
  if (!ac) return;
  const buffer = ac.createBuffer(1, ac.sampleRate * 0.18, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const decay = Math.pow(1 - i / data.length, 5);
    data[i] = (Math.random() * 2 - 1) * decay;
  }
  for (let i = 0; i < veces; i++) {
    const src = ac.createBufferSource();
    src.buffer = buffer;
    const filtro = ac.createBiquadFilter();
    filtro.type = "bandpass";
    filtro.frequency.value = 1600 + Math.random() * 1800;
    filtro.Q.value = 0.9;
    const gain = ac.createGain();
    gain.gain.value = 0.55 + Math.random() * 0.35;
    src.connect(filtro).connect(gain).connect(ac.destination);
    src.start(ac.currentTime + i * 0.11 + Math.random() * 0.04);
  }
}

/** Alarma muy sonora para el tiempo agotado. */
export function sonidoAlarma() {
  const ac = getCtx();
  if (!ac) return;
  const t0 = ac.currentTime;
  for (let i = 0; i < 3; i++) {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "square";
    const inicio = t0 + i * 0.5;
    osc.frequency.setValueAtTime(880, inicio);
    osc.frequency.linearRampToValueAtTime(300, inicio + 0.42);
    gain.gain.setValueAtTime(0.0001, inicio);
    gain.gain.exponentialRampToValueAtTime(0.5, inicio + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, inicio + 0.45);
    osc.connect(gain).connect(ac.destination);
    osc.start(inicio);
    osc.stop(inicio + 0.5);
  }
}

export function sonidoClic() {
  const ac = getCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(520, ac.currentTime);
  osc.frequency.linearRampToValueAtTime(780, ac.currentTime + 0.09);
  gain.gain.setValueAtTime(0.18, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.14);
  osc.connect(gain).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + 0.15);
}

// --- Melodía infantil de fondo ("Estrellita dónde estás") ---

type Nota = [frecuencia: number, duracion: number];

// Do Re Mi Fa Sol La Si
const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.0, A4 = 440.0;
const C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99, A5 = 880.0;

const MELODIA: Nota[] = [
  [C4, 1], [C4, 1], [G4, 1], [G4, 1], [A4, 1], [A4, 1], [G4, 2],
  [F4, 1], [F4, 1], [E4, 1], [E4, 1], [D4, 1], [D4, 1], [C4, 2],
  [G4, 1], [G4, 1], [F4, 1], [F4, 1], [E4, 1], [E4, 1], [D4, 2],
  [G4, 1], [G4, 1], [F4, 1], [F4, 1], [E4, 1], [E4, 1], [D4, 2],
  [C4, 1], [C4, 1], [G4, 1], [G4, 1], [A4, 1], [A4, 1], [G4, 2],
  [F4, 1], [F4, 1], [E4, 1], [E4, 1], [D4, 1], [D4, 1], [C4, 2],
];

// Acompañamiento suave en segunda voz (una octava por encima, muy bajito)
const ARPEGIO: Nota[] = [
  [C5, 0.5], [E5, 0.5], [G5, 0.5], [E5, 0.5],
  [F5, 0.5], [A5, 0.5], [F5, 0.5], [A5, 0.5],
  [E5, 0.5], [G5, 0.5], [E5, 0.5], [G5, 0.5],
  [D5, 0.5], [F5, 0.5], [D5, 0.5], [F5, 0.5],
];

const TEMPO = 0.42; // segundos por pulso
let temporizadorMusica: number | null = null;
let nodoMusica: GainNode | null = null;

function programarNota(ac: AudioContext, salida: AudioNode, freq: number, inicio: number, dur: number, volumen: number) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, inicio);
  gain.gain.setValueAtTime(0.0001, inicio);
  gain.gain.exponentialRampToValueAtTime(volumen, inicio + 0.04);
  gain.gain.setValueAtTime(volumen, inicio + dur * 0.7);
  gain.gain.exponentialRampToValueAtTime(0.0001, inicio + dur * 0.95);
  osc.connect(gain).connect(salida);
  osc.start(inicio);
  osc.stop(inicio + dur);
}

function tocarMelodia(ac: AudioContext, salida: AudioNode) {
  let t = ac.currentTime + 0.05;
  for (const [freq, pulsos] of MELODIA) {
    programarNota(ac, salida, freq, t, pulsos * TEMPO, 0.16);
    t += pulsos * TEMPO;
  }
  // Acompañamiento repetido para cubrir toda la melodía
  let ta = ac.currentTime + 0.05;
  const duracionTotal = t - ta;
  while (ta < t - 0.1) {
    for (const [freq, pulsos] of ARPEGIO) {
      if (ta >= t - 0.1) break;
      programarNota(ac, salida, freq, ta, pulsos * TEMPO, 0.05);
      ta += pulsos * TEMPO;
    }
  }
  return duracionTotal;
}

/** Inicia la música infantil de fondo en bucle. */
export function iniciarMusica() {
  const ac = getCtx();
  if (!ac || temporizadorMusica !== null) return;
  nodoMusica = ac.createGain();
  nodoMusica.gain.value = 1;
  nodoMusica.connect(ac.destination);
  const repetir = () => {
    if (!nodoMusica) return;
    const duracion = tocarMelodia(ac, nodoMusica);
    temporizadorMusica = window.setTimeout(repetir, duracion * 1000 + 600);
  };
  repetir();
}

/** Para la música de fondo. */
export function pararMusica() {
  if (temporizadorMusica !== null) {
    window.clearTimeout(temporizadorMusica);
    temporizadorMusica = null;
  }
  if (nodoMusica) {
    nodoMusica.disconnect();
    nodoMusica = null;
  }
}

/** ¿Está sonando la música? */
export function musicaActiva() {
  return temporizadorMusica !== null;
}

export function hablar(texto: string, alegre = true) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = "es-ES";
  u.rate = alegre ? 1.05 : 0.95;
  u.pitch = alegre ? 1.6 : 1;
  u.volume = 1;
  const voces = window.speechSynthesis.getVoices();
  const es = voces.find((v) => v.lang.toLowerCase().startsWith("es"));
  if (es) u.voice = es;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}
