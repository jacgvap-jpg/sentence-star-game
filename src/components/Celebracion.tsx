const CONFETI = Array.from({ length: 40 }, (_, i) => i);
const ESTRELLAS = Array.from({ length: 18 }, (_, i) => i);
const COLORES = [
  "var(--color-fiesta-1)",
  "var(--color-fiesta-2)",
  "var(--color-fiesta-3)",
  "var(--color-fiesta-4)",
];

export function Celebracion() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {CONFETI.map((i) => (
        <span
          key={`c-${i}`}
          className="confeti"
          style={{
            left: `${(i * 2.5) % 100}%`,
            background: COLORES[i % COLORES.length],
            animationDelay: `${(i % 10) * 0.18}s`,
            animationDuration: `${3.2 + (i % 5) * 0.5}s`,
          }}
        />
      ))}
      {ESTRELLAS.map((i) => (
        <span
          key={`e-${i}`}
          className="estrella"
          style={{
            left: `${5 + ((i * 11) % 90)}%`,
            top: `${20 + ((i * 17) % 60)}%`,
            animationDelay: `${(i % 6) * 0.22}s`,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
