import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OrdenarPalabras } from "@/components/OrdenarPalabras";
import { NOMBRES } from "@/lib/game-data";
import { desbloquearAudio, hablar, sonidoClic } from "@/lib/sfx";

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

  if (nombre) return <OrdenarPalabras nombre={nombre} />;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-10 text-center">
      <h1 className="font-display text-4xl font-extrabold text-primary sm:text-5xl">
        Juego Educativo
      </h1>
      <p className="mt-4 text-2xl font-bold text-foreground">¿Cómo te llamas?</p>
      <p className="mt-2 text-lg font-bold text-muted-foreground">Elige tu nombre para empezar</p>

      <ul className="mt-8 flex flex-wrap justify-center gap-4">
        {NOMBRES.map((n) => (
          <li key={n}>
            <button
              type="button"
              onClick={() => {
                desbloquearAudio();
                sonidoClic();
                hablar(`¡Hola ${n}! Vamos a ordenar palabras.`);
                setNombre(n);
              }}
              className="bloque-palabra rounded-2xl bg-primary px-8 py-6 text-2xl font-extrabold text-primary-foreground shadow-bloque transition-transform hover:-translate-y-1 active:translate-y-1 sm:text-3xl"
            >
              {n}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
