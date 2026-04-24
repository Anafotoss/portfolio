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
    src: "/photos/IMG_0374.webp",
    alt: "Fotografia individual artística",
    category: "Individual",
    description:
      "A essência de cada pessoa capturada em um único instante. Retratos que revelam histórias únicas.",
    width: 1200,
    height: 1600,
    span: "tall",
    blurDataURL: blurPlaceholder,
  },
  {
    id: 2,
    src: "/photos/IMG_0714.webp",
    alt: "Fotografia de aniversário e celebração",
    category: "Aniversários",
    description:
      "Celebrações inesquecíveis. Cada detalhe, cada risada, cada abraço registrado com carinho.",
    width: 1600,
    height: 1200,
    span: "wide",
    blurDataURL: blurPlaceholder,
  },
  {
    id: 3,
    src: "/photos/infantil_real.webp",
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
    src: "/photos/Hellen_01.webp",
    alt: "Ensaio fotográfico de gestante",
    category: "Gestantes",
    description:
      "A magia da espera. Registros delicados e emocionantes dessa fase tão especial.",
    width: 1600,
    height: 1200,
    span: "wide",
    blurDataURL: blurPlaceholder,
  },
  {
    id: 5,
    src: "/photos/Sensuais.webp",
    alt: "Ensaio sensual feminino",
    category: "Sensuais",
    description:
      "Beleza, empoderamento e confiança. Ensaios que celebram a feminilidade com arte e elegância.",
    width: 1200,
    height: 1600,
    span: "tall",
    blurDataURL: blurPlaceholder,
  },
  {
    id: 6,
    src: "/photos/natureza_real.webp",
    alt: "Fotografia de natureza com luz natural",
    category: "Natureza",
    description:
      "A grandiosidade do mundo natural. Paisagens que inspiram e conectam com o essencial.",
    width: 1600,
    height: 1200,
    span: "normal",
    blurDataURL: blurPlaceholder,
  },
];

export const categories = [
  "Todos",
  "Individual",
  "Aniversários",
  "Infantil",
  "Gestantes",
  "Sensuais",
  "Natureza",
];
