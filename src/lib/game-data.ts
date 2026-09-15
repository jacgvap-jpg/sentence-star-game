import manzana from "@/assets/manzana.jpg";
import perro from "@/assets/perro.jpg";
import cocina from "@/assets/cocina.jpg";
import gato from "@/assets/gato.jpg";
import pajaros from "@/assets/pajaros.jpg";
import coche from "@/assets/coche.jpg";
import libro from "@/assets/libro.jpg";

export type Nivel = "facil" | "medio" | "dificil";

export type Frase = {
  id: string;
  palabras: string[];
  imagen?: string;
  emoji?: string;
  alt: string;
};

export const MAX_PALABRAS = 8;

export const FRASES: Frase[] = [
  // --- Con ilustración ---
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
    palabras: ["LA", "NIÑA", "LEE", "UN", "LIBRO", "EN", "LA", "CAMA"],
    imagen: libro,
    alt: "Una niña leyendo un libro en la cama",
  },

  // --- Fáciles (4 y 5 palabras) ---
  { id: "perro-ladra", palabras: ["EL", "PERRO", "LADRA", "FUERTE"], emoji: "🐕", alt: "Un perro ladrando" },
  { id: "gato-salta", palabras: ["EL", "GATO", "SALTA", "MUY", "ALTO"], emoji: "🐈", alt: "Un gato saltando" },
  { id: "leon-ruge", palabras: ["EL", "LEÓN", "RUGE", "CON", "FUERZA"], emoji: "🦁", alt: "Un león rugiendo" },
  { id: "tigre-caza", palabras: ["EL", "TIGRE", "CAZA", "UN", "CIERVO"], emoji: "🐅", alt: "Un tigre cazando" },
  { id: "pez-nada", palabras: ["EL", "PEZ", "NADA", "MUY", "DEPRISA"], emoji: "🐟", alt: "Un pez nadando" },
  { id: "hormiga-lleva", palabras: ["LA", "HORMIGA", "LLEVA", "UNA", "HOJA"], emoji: "🐜", alt: "Una hormiga llevando una hoja" },
  { id: "abeja-vuela", palabras: ["LA", "ABEJA", "VUELA", "ENTRE", "FLORES"], emoji: "🐝", alt: "Una abeja volando entre flores" },
  { id: "vaca-come", palabras: ["LA", "VACA", "COME", "HIERBA", "VERDE"], emoji: "🐄", alt: "Una vaca comiendo hierba" },
  { id: "rana-salta", palabras: ["LA", "RANA", "SALTA", "AL", "AGUA"], emoji: "🐸", alt: "Una rana saltando al agua" },
  { id: "pato-nada", palabras: ["EL", "PATO", "NADA", "EN", "EL", "LAGO"], emoji: "🦆", alt: "Un pato nadando en el lago" },

  // --- Medios (6 palabras) ---
  { id: "perros-juegan", palabras: ["LOS", "PERROS", "JUEGAN", "CON", "UNA", "PELOTA"], emoji: "🐕", alt: "Perros jugando con una pelota" },
  { id: "gatos-beben", palabras: ["LOS", "GATOS", "BEBEN", "LECHE", "MUY", "CALIENTE"], emoji: "🥛", alt: "Gatos bebiendo leche" },
  { id: "leon-duerme", palabras: ["EL", "LEÓN", "DUERME", "BAJO", "UN", "ÁRBOL"], emoji: "🌳", alt: "Un león durmiendo bajo un árbol" },
  { id: "tigre-corre", palabras: ["EL", "TIGRE", "CORRE", "POR", "LA", "SELVA"], emoji: "🌴", alt: "Un tigre corriendo por la selva" },
  { id: "hormigas-cavan", palabras: ["LAS", "HORMIGAS", "CAVAN", "UN", "TÚNEL", "LARGO"], emoji: "🐜", alt: "Hormigas cavando un túnel" },
  { id: "peces-saltan", palabras: ["LOS", "PECES", "SALTAN", "SOBRE", "LAS", "OLAS"], emoji: "🌊", alt: "Peces saltando sobre las olas" },
  { id: "caballo-galopa", palabras: ["EL", "CABALLO", "GALOPA", "POR", "EL", "CAMPO"], emoji: "🐎", alt: "Un caballo galopando por el campo" },
  { id: "mono-trepa", palabras: ["EL", "MONO", "TREPA", "POR", "LAS", "RAMAS"], emoji: "🐒", alt: "Un mono trepando por las ramas" },
  { id: "elefante-bebe", palabras: ["EL", "ELEFANTE", "BEBE", "AGUA", "DEL", "RÍO"], emoji: "🐘", alt: "Un elefante bebiendo agua del río" },
  { id: "abuelo-riega", palabras: ["EL", "ABUELO", "RIEGA", "LAS", "PLANTAS", "VERDES"], emoji: "🪴", alt: "Un abuelo regando las plantas" },
  { id: "nino-pinta", palabras: ["EL", "NIÑO", "PINTA", "UN", "DIBUJO", "BONITO"], emoji: "🎨", alt: "Un niño pintando un dibujo" },
  { id: "nina-canta", palabras: ["LA", "NIÑA", "CANTA", "UNA", "CANCIÓN", "ALEGRE"], emoji: "🎵", alt: "Una niña cantando" },

  // --- Difíciles (7 y 8 palabras) ---
  { id: "perro-busca", palabras: ["EL", "PERRO", "BUSCA", "SU", "HUESO", "EN", "EL", "JARDÍN"], emoji: "🦴", alt: "Un perro buscando su hueso" },
  { id: "gato-persigue", palabras: ["EL", "GATO", "PERSIGUE", "UN", "RATÓN", "POR", "LA", "CASA"], emoji: "🐭", alt: "Un gato persiguiendo un ratón" },
  { id: "leones-descansan", palabras: ["LOS", "LEONES", "DESCANSAN", "EN", "LA", "SABANA", "CALUROSA"], emoji: "🦁", alt: "Leones descansando en la sabana" },
  { id: "tigres-beben", palabras: ["LOS", "TIGRES", "BEBEN", "AGUA", "EN", "EL", "RÍO", "TRANQUILO"], emoji: "🐅", alt: "Tigres bebiendo agua en el río" },
  { id: "hormigas-guardan", palabras: ["LAS", "HORMIGAS", "GUARDAN", "COMIDA", "DENTRO", "DEL", "HORMIGUERO"], emoji: "🐜", alt: "Hormigas guardando comida" },
  { id: "peces-nadan", palabras: ["LOS", "PECES", "NADAN", "ENTRE", "LAS", "PIEDRAS", "DEL", "MAR"], emoji: "🐠", alt: "Peces nadando entre piedras" },
  { id: "pajaro-construye", palabras: ["EL", "PÁJARO", "CONSTRUYE", "SU", "NIDO", "EN", "EL", "ÁRBOL"], emoji: "🪹", alt: "Un pájaro construyendo su nido" },
  { id: "papa-lava", palabras: ["PAPÁ", "LAVA", "EL", "COCHE", "AZUL", "CON", "AGUA"], emoji: "🚗", alt: "Papá lavando el coche" },
  { id: "nino-escribe", palabras: ["EL", "NIÑO", "ESCRIBE", "SU", "NOMBRE", "EN", "EL", "CUADERNO"], emoji: "✏️", alt: "Un niño escribiendo su nombre" },
  { id: "abuela-cuenta", palabras: ["LA", "ABUELA", "CUENTA", "UN", "CUENTO", "A", "LOS", "NIÑOS"], emoji: "📖", alt: "Una abuela contando un cuento" },
];

export const NOMBRES = ["Pablo", "María", "Lucas", "Mauro", "Mariana", "Teresa", "Daniel"];

export const NIVELES: { id: Nivel; titulo: string; descripcion: string; segundos: number; emoji: string }[] = [
  { id: "facil", titulo: "Fácil", descripcion: "4 o 5 palabras", segundos: 90, emoji: "🐣" },
  { id: "medio", titulo: "Medio", descripcion: "6 palabras", segundos: 70, emoji: "🦊" },
  { id: "dificil", titulo: "Difícil", descripcion: "7 u 8 palabras", segundos: 60, emoji: "🦁" },
];

/** Solo frases con sentido y con 4 a 8 palabras. */
export const FRASES_VALIDAS: Frase[] = FRASES.filter(
  (f) => f.palabras.length >= 4 && f.palabras.length <= MAX_PALABRAS,
);

export function frasesDeNivel(nivel: Nivel): Frase[] {
  const rangos: Record<Nivel, [number, number]> = {
    facil: [4, 5],
    medio: [6, 6],
    dificil: [7, 8],
  };
  const [min, max] = rangos[nivel];
  const lista = FRASES_VALIDAS.filter((f) => f.palabras.length >= min && f.palabras.length <= max);
  return lista.length > 0 ? lista : FRASES_VALIDAS;
}

export function mezclar<T>(items: T[]): T[] {
  const copia = [...items];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = copia[i] as T;
    copia[i] = copia[j] as T;
    copia[j] = tmp;
  }
  return copia;
}
