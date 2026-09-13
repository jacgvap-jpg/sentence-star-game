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
