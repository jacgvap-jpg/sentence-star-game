import { useCallback, useEffect, useRef, useState } from "react";
import triste from "@/assets/triste.png";
import { Celebracion } from "@/components/Celebracion";
import { FRASES, mezclar, type Frase } from "@/lib/game-data";
import { hablar, sonidoAlarma, sonidoClic, sonidoPalmas } from "@/lib/sfx";

const SEGUNDOS = 70;

function frasesMezcladas(): Frase[] {
  return mezclar(FRASES);
}

function desordenar(palabras: string[]): string[] {
  const objetivo = palabras.join(" ");
  for (let i = 0; i < 30; i++) {
    const intento = mezclar(palabras);
    if (intento.join(" ") !== objetivo) return intento;
  }
  return [...palabras].reverse();
}

type Estado = "jugando" | "acierto" | "tiempo";

export function OrdenarPalabras({ nombre }: { nombre: string }) {
  const [cola, setCola] = useState<Frase[]>(() => frasesMezcladas());
  const [indice, setIndice] = useState(0);
  const [ronda, setRonda] = useState(0);
  const [orden, setOrden] = useState<string[]>([]);
  const [estado, setEstado] = useState<Estado>("jugando");
  const [restante, setRestante] = useState(SEGUNDOS);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const arrastrando = useRef<number | null>(null);

  const frase = cola[indice] ?? FRASES[0]!;

  const cargar = useCallback((f: Frase) => {
    setOrden(desordenar(f.palabras));
    setRestante(SEGUNDOS);
    setEstado("jugando");
    setSeleccion(null);
  }, []);

  useEffect(() => {
    cargar(frase);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ronda]);

  const siguiente = useCallback(() => {
    setIndice((i) => {
      if (i + 1 < cola.length) return i + 1;
      setCola(frasesMezcladas());
      return 0;
    });
    setRonda((r) => r + 1);
  }, [cola.length]);

  // Temporizador
  useEffect(() => {
    if (estado !== "jugando") return;
    const id = window.setInterval(() => {
      setRestante((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [estado, ronda]);

  useEffect(() => {
    if (estado === "jugando" && restante === 0) {
      setEstado("tiempo");
      sonidoAlarma();
      hablar("¡Tiempo agotado!", false);
    }
  }, [restante, estado]);

  // Pasa a palabras nuevas tras mostrar "Tiempo agotado"
  useEffect(() => {
    if (estado !== "tiempo") return;
    const t = window.setTimeout(() => siguiente(), 4000);
    return () => window.clearTimeout(t);
  }, [estado, siguiente]);

  const comprobar = useCallback(
    (nuevo: string[]) => {
      if (nuevo.join(" ") === frase.palabras.join(" ")) {
        setEstado("acierto");
        sonidoPalmas();
        window.setTimeout(() => hablar(`¡Muy bien ${nombre}!`), 350);
      }
    },
    [frase, nombre],
  );

  const mover = useCallback(
    (desde: number, hasta: number) => {
      if (desde === hasta || estado !== "jugando") return;
      setOrden((actual) => {
        const nuevo = [...actual];
        const [item] = nuevo.splice(desde, 1);
        nuevo.splice(hasta, 0, item as string);
        sonidoClic();
        comprobar(nuevo);
        return nuevo;
      });
      setSeleccion(null);
    },
    [estado, comprobar],
  );

  const tocar = (i: number) => {
    if (estado !== "jugando") return;
    if (seleccion === null) {
      setSeleccion(i);
      sonidoClic();
    } else {
      mover(seleccion, i);
    }
  };

  const minutos = String(Math.floor(restante / 60)).padStart(2, "0");
  const segundos = String(restante % 60).padStart(2, "0");
  const urgente = restante <= 10 && estado === "jugando";

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-5xl px-4 pb-16 pt-5">
      {estado === "acierto" && <Celebracion />}

      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-primary sm:text-4xl">Ordenar Palabras</h1>
          <p className="mt-1 text-lg font-bold text-muted-foreground">¡Vamos, {nombre}!</p>
        </div>
        <div
          className={`rounded-2xl border-4 border-primary bg-card px-5 py-3 text-center shadow-tarjeta ${
            urgente ? "animar-latido border-destructive" : ""
          }`}
          aria-live="off"
        >
          <span className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Tiempo
          </span>
          <span
            className={`block font-display text-4xl font-extrabold tabular-nums ${
              urgente ? "text-destructive" : "text-primary"
            }`}
          >
            {minutos}:{segundos}
          </span>
        </div>
      </header>

      <p className="mt-6 rounded-2xl bg-card/80 px-5 py-4 text-center text-xl font-bold text-foreground shadow-tarjeta">
        Arrastra los bloques (o toca dos bloques para cambiarlos) y forma una frase con sentido.
      </p>

      <ul className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {orden.map((palabra, i) => (
          <li key={`${palabra}-${i}`}>
            <button
              type="button"
              draggable={estado === "jugando"}
              onDragStart={() => {
                arrastrando.current = i;
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (arrastrando.current !== null) mover(arrastrando.current, i);
                arrastrando.current = null;
              }}
              onClick={() => tocar(i)}
              className={`bloque-palabra rounded-2xl px-6 py-5 text-2xl font-extrabold shadow-bloque transition-transform active:translate-y-1 sm:px-8 sm:py-6 sm:text-3xl ${
                seleccion === i
                  ? "scale-110 bg-secondary text-secondary-foreground"
                  : "bg-primary text-primary-foreground hover:-translate-y-1"
              }`}
            >
              {palabra}
            </button>
          </li>
        ))}
      </ul>

      {estado === "tiempo" && (
        <div className="mt-10 animar-temblor flex flex-col items-center justify-center gap-5 rounded-3xl bg-destructive px-6 py-8 text-center shadow-tarjeta sm:flex-row sm:gap-8">
          <img
            src={triste}
            alt="Carita triste con lágrimas en los ojos"
            width={768}
            height={768}
            loading="lazy"
            className="h-32 w-32 shrink-0 sm:h-40 sm:w-40"
          />
          <div>
            <p className="font-display text-4xl font-extrabold uppercase text-destructive-foreground sm:text-6xl">
              Tiempo agotado
            </p>
            <p className="mt-3 text-lg font-bold text-destructive-foreground">
              Preparando palabras nuevas…
            </p>
          </div>
        </div>
      )}

      {estado === "acierto" && (
        <section className="mt-10 rounded-3xl bg-card p-6 text-center shadow-tarjeta">
          <p className="font-display text-4xl font-extrabold text-accent sm:text-5xl">
            ¡Muy bien {nombre}!
          </p>
          <p className="mt-4 font-display text-2xl font-extrabold uppercase text-primary sm:text-3xl">
            {frase.palabras.join(" ")}
          </p>
          <img
            src={frase.imagen}
            alt={frase.alt}
            width={1024}
            height={768}
            loading="lazy"
            className="mx-auto mt-5 w-full max-w-xl rounded-2xl border-4 border-primary"
          />
          <button
            type="button"
            onClick={siguiente}
            className="mt-6 rounded-2xl bg-accent px-8 py-5 font-display text-2xl font-extrabold uppercase text-accent-foreground shadow-bloque active:translate-y-1"
          >
            Otra frase
          </button>
        </section>
      )}
    </main>
  );
}
