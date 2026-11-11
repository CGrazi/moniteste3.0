import morangoImg from "@/assets/moniteste-morango.jpg";
import pistacheImg from "@/assets/moniteste-pistache.jpg";
import chocolateImg from "@/assets/moniteste-chocolate.jpg";
import picoleImg from "@/assets/moniteste-picole.jpg";
import limaoImg from "@/assets/moniteste-limao.jpg";
import bananaImg from "@/assets/moniteste-banana.jpg";
import milkshakeImg from "@/assets/moniteste-milkshake.jpg";
import sanduicheImg from "@/assets/moniteste-sanduiche.jpg";
import degustacaoImg from "@/assets/moniteste-degustacao.jpg";

export const galleryCategories = ["sorvetes", "sobremesas", "novidades", "eventos"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  title: string;
  category: GalleryCategory;
  tags: string[];
  description: string;
  images: GalleryImage[];
}

const image = (src: string, width: number, height: number): GalleryImage => ({
  src,
  width,
  height,
});

const morango = image(morangoImg, 1024, 1280);
const pistache = image(pistacheImg, 1024, 1024);
const chocolate = image(chocolateImg, 1280, 1024);
const picole = image(picoleImg, 1024, 1280);
const limao = image(limaoImg, 1024, 1024);
const banana = image(bananaImg, 1280, 1024);
const milkshake = image(milkshakeImg, 1024, 1280);
const sanduiche = image(sanduicheImg, 1024, 1024);
const degustacao = image(degustacaoImg, 1280, 1024);

export const projects: Project[] = [
  {
    id: "morango-da-casa",
    title: "Morango da casa",
    category: "sorvetes",
    tags: ["morango", "cremoso"],
    description: "Duas bolas de sorvete de morango em uma casquinha crocante, com uma apresentação rosa que celebra o sabor da fruta.",
    images: [morango, milkshake, degustacao],
  },
  {
    id: "pistache-cremoso",
    title: "Pistache cremoso",
    category: "sorvetes",
    tags: ["pistache", "especial"],
    description: "Sorvete de pistache servido na taça e finalizado com pedacinhos da castanha, em uma composição delicada e cheia de textura.",
    images: [pistache, degustacao],
  },
  {
    id: "limao-refrescante",
    title: "Limão refrescante",
    category: "sorvetes",
    tags: ["limão", "cítrico"],
    description: "Uma proposta cítrica e refrescante, apresentada em casquinha com tons de amarelo que traduzem a leveza do limão.",
    images: [limao, picole],
  },
  {
    id: "taca-de-chocolate",
    title: "Taça de chocolate",
    category: "sobremesas",
    tags: ["chocolate", "taça"],
    description: "Bolas de sorvete, calda de chocolate, raspas e wafer formam uma taça generosa para quem gosta de uma sobremesa marcante.",
    images: [chocolate, sanduiche],
  },
  {
    id: "banana-split",
    title: "Banana split",
    category: "sobremesas",
    tags: ["banana", "para compartilhar"],
    description: "Uma releitura colorida do clássico, com banana, diferentes sabores de sorvete, chantilly, caramelo e castanhas.",
    images: [banana, degustacao],
  },
  {
    id: "milkshake-de-morango",
    title: "Milkshake de morango",
    category: "sobremesas",
    tags: ["morango", "geladinho"],
    description: "Milkshake rosado servido em taça alta, com chantilly e morango fresco para completar a apresentação.",
    images: [milkshake, morango],
  },
  {
    id: "picoles-de-verao",
    title: "Picolés de verão",
    category: "novidades",
    tags: ["frutas", "coloridos"],
    description: "Uma vitrine de picolés em cores vibrantes, inspirada em combinações de manga, morango e coco para os dias quentes.",
    images: [picole, limao],
  },
  {
    id: "sanduiche-de-sorvete",
    title: "Sanduíche de sorvete",
    category: "novidades",
    tags: ["cookie", "baunilha"],
    description: "Cookies dourados abraçam uma camada generosa de sorvete de baunilha nesta novidade feita para comer com as mãos.",
    images: [sanduiche, chocolate],
  },
  {
    id: "encontro-de-sabores",
    title: "Encontro de sabores",
    category: "eventos",
    tags: ["degustação", "encontro"],
    description: "Uma mesa colorida reúne diferentes sabores em casquinhas individuais, criando uma experiência de degustação para compartilhar.",
    images: [degustacao, pistache, morango],
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};

export const getCategories = (): string[] => [...galleryCategories];
