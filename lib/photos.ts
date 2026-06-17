export interface Photo {
  id: number;
  src: string;
  alt: string;
  category: string;
  description: string;
  width: number;
  height: number;
  span: "tall" | "wide" | "normal";
  blurDataURL: string;
}

// Tiny base64 placeholders for blur-up effect
const blurPlaceholder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAA GklEQVQIW2P8z8DwHwMxgHGQKGKkRBE1FAEAtdgH/YftfUMAAAAASUVORK5CYII=";

export const photos: Photo[] = [
  {
    id: 1,
    src: "/portfolio/photos/individual.jpeg",
    alt: "Fotografia individual artística",
    category: "Individuais",
    description:
      "A essência de cada pessoa capturada em um único instante. Retratos que revelam histórias únicas.",
    width: 1200,
    height: 1600,
    span: "tall",
    blurDataURL: blurPlaceholder,
  },
  {
    id: 2,
    src: "/portfolio/photos/Eventos.jpeg",
    alt: "Fotografia de aniversário e celebração",
    category: "Eventos",
    description:
      "Celebrações inesquecíveis. Cada detalhe, cada risada, cada abraço registrado com carinho.",
    width: 1600,
    height: 1200,
    span: "wide",
    blurDataURL: blurPlaceholder,
  },
  {
    id: 3,
    src: "/portfolio/photos/Infantil.jpeg",
    alt: "Ensaio fotográfico infantil",
    category: "Infantil",
    description:
      "Sorrisos genuínos e momentos espontâneos. A pureza da infância eternizada.",
    width: 1200,
    height: 1600,
    span: "normal",
    blurDataURL: blurPlaceholder,
  },
  {
    id: 4,
    src: "/portfolio/photos/Retratos.jpeg",
    alt: "Fotografia de retrato",
    category: "Retratos",
    description: "Retratos profissionais capturando a verdadeira essência de cada olhar.",
    width: 1200,
    height: 1600,
    span: "tall",
    blurDataURL: blurPlaceholder,
  },
];

export const categories = [
  "Todos",
  "Individuais",
  "Retratos",
  "Infantil",
  "Eventos",
];
