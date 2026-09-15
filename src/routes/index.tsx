import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OrdenarPalabras } from "@/components/OrdenarPalabras";
import { NIVELES, NOMBRES, type Nivel } from "@/lib/game-data";
import { desbloquearAudio, hablar, iniciarMusica, sonidoClic } from "@/lib/sfx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Juego Educativo: Ordenar Palabras y Formar Frases" },
      {
        name: "description",
        content:
          "Juego educativo infantil para ordenar palabras arrastrando bloques y construir frases lógicas, con premios sonoros, estrellas e imágenes.",
      },
      { property: "og:title", content: "Juego Educativo: Ordenar Palabras" },
      {
        property: "og:description",
        content:
          "Arrastra bloques de palabras y forma frases con sentido. Refuerzo positivo con aplausos, estrellas y confeti.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [nombre, setNombre] = useState<string | null>(null);
  const [nivel, setNivel] = useState<Nivel | null>(null);

  if (nombre && nivel)
    return <OrdenarPalabras nombre={nombre} nivel={nivel} onCambiarNivel={() => setNivel(null)} />;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-10 text-center">
      <h1 className="font-display text-4xl font-extrabold text-primary sm:text-5xl">
        Juego Educativo
      </h1>

      {!nombre ? (
        <>
          <p className="mt-4 text-2xl font-bold text-foreground">¿Cómo te llamas?</p>
          <p className="mt-2 text-lg font-bold text-muted-foreground">
            Elige tu nombre para empezar
          </p>

          <ul className="mt-8 flex flex-wrap justify-center gap-4">
            {NOMBRES.map((n) => (
              <li key={n}>
                <button
                  type="button"
                  onClick={() => {
                    desbloquearAudio();
                    sonidoClic();
                    iniciarMusica();
                    hablar(`¡Hola ${n}! Elige el nivel.`);
                    setNombre(n);
                  }}
                  className="bloque-palabra rounded-2xl bg-primary px-8 py-6 text-2xl font-extrabold text-primary-foreground shadow-bloque transition-transform hover:-translate-y-1 active:translate-y-1 sm:text-3xl"
                >
                  {n}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="mt-4 text-2xl font-bold text-foreground">
            ¡Hola {nombre}! Elige el nivel de dificultad
          </p>

          <ul className="mt-8 grid w-full gap-5 sm:grid-cols-3">
            {NIVELES.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => {
                    desbloquearAudio();
                    sonidoClic();
                    hablar(`Nivel ${n.titulo}. ¡Vamos a ordenar palabras!`);
                    setNivel(n.id);
                  }}
                  className="bloque-palabra w-full rounded-3xl bg-primary px-6 py-8 text-primary-foreground shadow-bloque transition-transform hover:-translate-y-1 active:translate-y-1"
                >
                  <span className="block text-5xl">{n.emoji}</span>
                  <span className="mt-2 block font-display text-3xl font-extrabold uppercase">
                    {n.titulo}
                  </span>
                  <span className="mt-1 block text-lg font-bold">{n.descripcion}</span>
                  <span className="mt-1 block text-base font-bold opacity-90">
                    {n.segundos} segundos
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => {
              sonidoClic();
              setNombre(null);
            }}
            className="mt-8 rounded-2xl bg-secondary px-6 py-3 text-lg font-extrabold text-secondary-foreground shadow-bloque active:translate-y-1"
          >
            Cambiar de nombre
          </button>
        </>
      )}
    </main>
  );
}
