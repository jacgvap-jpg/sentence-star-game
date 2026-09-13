import manzana from "@/assets/manzana.jpg";
import perro from "@/assets/perro.jpg";
import cocina from "@/assets/cocina.jpg";
import gato from "@/assets/gato.jpg";
import pajaros from "@/assets/pajaros.jpg";
import coche from "@/assets/coche.jpg";
import libro from "@/assets/libro.jpg";

export type Frase = {
  id: string;
  palabras: string[];
  imagen: string;
  alt: string;
};

export const FRASES: Frase[] = [
  {
    id: "manzana",
    palabras: ["EL", "NIÑO", "COME", "UNA", "MANZANA", "ROJA"],
    imagen: manzana,
    alt: "Un niño comiendo una manzana roja",
  },
  {
    id: "perro",
    palabras: ["EL", "PERRO", "CORRE", "EN", "EL", "PARQUE"],
    imagen: perro,
    alt: "Un perro corriendo en el parque",
  },
  {
    id: "cocina",
    palabras: ["MAMÁ", "PREPARA", "LA", "COMIDA", "EN", "LA", "COCINA"],
    imagen: cocina,
    alt: "Una mamá preparando la comida en la cocina",
  },
  {
    id: "gato",
    palabras: ["EL", "GATO", "DUERME", "EN", "EL", "SOFÁ"],
    imagen: gato,
    alt: "Un gato durmiendo en el sofá",
  },
  {
    id: "pajaros",
    palabras: ["LOS", "PÁJAROS", "VUELAN", "EN", "EL", "CIELO", "AZUL"],
    imagen: pajaros,
    alt: "Pájaros volando en el cielo azul",
  },
  {
    id: "coche",
    palabras: ["EL", "COCHE", "ROJO", "CRUZA", "EL", "PUENTE"],
    imagen: coche,
    alt: "Un coche rojo cruzando el puente",
  },
  {
    id: "libro",
    palabras: ["LA", "NIÑA", "LEE", "UN", "LIBRO", "EN", "LA", "CAMA"].slice(0, 7),
    imagen: libro,
    alt: "Una niña leyendo un libro en la cama",
  },
];

export const NOMBRES = ["Pablo", "María", "Lucas", "Mauro", "Mariana", "Teresa", "Daniel"];

export function mezclar<T>(items: T[]): T[] {
  const copia = [...items];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}
