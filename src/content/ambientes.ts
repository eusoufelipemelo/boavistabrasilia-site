/**
 * Ambientes que a Boa Vista Brasília projeta.
 *
 * IMPORTANTE: as fotos de ambiente ainda são de banco de imagens (Unsplash), usadas como
 * referência do tipo de solução até o cliente enviar as fotos dos projetos executados.
 * Toda foto ilustrativa tem `stock: true` e o site avisa isso na tela.
 * As fotos reais do cliente (fábrica, loja, sócios, CASACOR) ficam em /public/fotos.
 */

export type ProjectImage = { src: string; width: number; height: number; alt: string; stock?: boolean };

export type Project = {
  slug: string;
  title: string;
  /** Categoria curta usada na galeria e nos filtros. */
  kind: string;
  /** Onde o ambiente costuma estar (apartamento, casa, escritório). */
  place: string;
  summary: string;
  /** O que a marcenaria resolve nesse ambiente. */
  rooms: string[];
  /** Itens detalhados na página do ambiente. */
  details: { title: string; text: string }[];
  /** Número da foto usada como capa (1 = primeira). */
  cover: number;
  /** Número da foto usada no topo da página do ambiente. */
  hero: number;
  images: ProjectImage[];
};

const L = { width: 2000, height: 1333 };

function img(src: string, alt: string, size = L): ProjectImage {
  return { src, ...size, alt, stock: true };
}

export const projects: Project[] = [
  {
    slug: "cozinha",
    title: "Cozinha",
    kind: "Cozinha",
    place: "Casas e apartamentos",
    cover: 1,
    hero: 1,
    summary:
      "A cozinha é o ambiente que mais exige do projeto: cada gaveta tem uma função, cada medida depende do eletrodoméstico e nada pode sobrar. O desenho começa pelo que você cozinha e por quantas pessoas ficam ali ao mesmo tempo.",
    rooms: ["Armários até o teto", "Gavetas com divisórias", "Torre quente", "Iluminação embutida"],
    details: [
      { title: "Divisão interna pensada antes", text: "Faqueiro, porta-temperos, lixeira embutida e altura de gaveta definida pelo que você guarda — não pelo que cabe." },
      { title: "Medidas conferidas na obra", text: "A medição acontece depois do revestimento, com os eletrodomésticos definidos. É o que evita o vão de dois centímetros no dia da montagem." },
      { title: "Acabamento que aguenta o uso", text: "Portas, puxadores e ferragens escolhidos para a rotina da casa, com a possibilidade de trocar frentes no futuro sem refazer o móvel." },
    ],
    images: [
      img("/ambientes/cozinha-1.jpg", "Cozinha planejada escura com iluminação embutida sob os armários superiores", { width: 1600, height: 2000 }),
      img("/ambientes/cozinha-2.jpg", "Cozinha com ilha central, bancada de pedra e marcenaria amadeirada até o teto", { width: 2000, height: 1208 }),
      img("/ambientes/cozinha-3.jpg", "Cozinha preta com torre de fornos embutida e pendentes sobre a bancada", { width: 1600, height: 2000 }),
    ],
  },
  {
    slug: "closet",
    title: "Closet",
    kind: "Closet",
    place: "Suítes e quartos",
    cover: 1,
    hero: 2,
    summary:
      "Um closet bem resolvido cabe em quase qualquer suíte: o que muda é a divisão. Cabides, gavetas, sapateira e espaço para malas entram no desenho a partir do que você realmente tem guardado hoje.",
    rooms: ["Cabideiros em dois níveis", "Gaveteiros internos", "Sapateira", "Iluminação em perfil"],
    details: [
      { title: "Inventário antes do desenho", text: "Quantos cabides, quantas gavetas, quantos pares de sapato. O projeto parte da sua roupa, não de um padrão." },
      { title: "Portas de vidro ou frentes fechadas", text: "Vidro deixa a peça à vista e pede organização; frente fechada some com a bagunça. A escolha é sua, e ela muda o preço." },
      { title: "Luz onde a roupa fica", text: "Perfil de LED nos cabideiros e nas prateleiras, com sensor de porta quando faz sentido." },
    ],
    images: [
      img("/ambientes/closet-1.jpg", "Closet com portas de vidro escuro, cabideiros iluminados e piso de madeira", { width: 1333, height: 2000 }),
      img("/ambientes/closet-2.jpg", "Closet claro com cabideiro suspenso, banco central e prateleiras de madeira", { width: 1667, height: 2000 }),
      img("/ambientes/closet-3.jpg", "Quarto com closet aberto integrado, cabideiros e penteadeira", { width: 1600, height: 2000 }),
    ],
  },
  {
    slug: "dormitorio",
    title: "Dormitório",
    kind: "Dormitório",
    place: "Suítes, quartos de casal e infantis",
    cover: 1,
    hero: 1,
    summary:
      "No dormitório a marcenaria precisa desaparecer. Guarda-roupa, cabeceira, criado e painel de televisão entram como uma peça só, no mesmo acabamento, para o quarto continuar sendo um quarto.",
    rooms: ["Guarda-roupa até o teto", "Cabeceira planejada", "Painel de TV", "Criados suspensos"],
    details: [
      { title: "Uma peça, não quatro móveis", text: "Cabeceira, criados e painel desenhados juntos, com as mesmas linhas e o mesmo acabamento." },
      { title: "Aproveitamento do pé-direito", text: "Armário até o teto, com portas de abrir ou correr conforme o espaço de circulação da cama." },
      { title: "Quarto de criança que cresce", text: "Divisões internas reguláveis e frentes que podem ser trocadas quando a fase muda." },
    ],
    images: [
      img("/ambientes/dormitorio-1.jpg", "Dormitório com cabeceira de madeira, criados suspensos e armário amadeirado", { width: 2000, height: 1125 }),
      img("/ambientes/dormitorio-2.jpg", "Quarto de casal com guarda-roupa claro, lustre e cama ampla", { width: 2000, height: 1862 }),
      img("/ambientes/dormitorio-3.jpg", "Quarto escuro com painel de madeira, nichos iluminados e cama baixa", { width: 1600, height: 2000 }),
    ],
  },
  {
    slug: "home-office",
    title: "Home office",
    kind: "Home office",
    place: "Apartamentos, casas e escritórios",
    cover: 1,
    hero: 2,
    summary:
      "Trabalhar em casa mudou o projeto dos apartamentos. Um home office resolvido tem bancada na altura certa, passagem de fios escondida e estante que aguenta livro de verdade — e ainda aparece bem na chamada de vídeo.",
    rooms: ["Bancada sob medida", "Estante com nichos", "Passagem de fios", "Armário fechado"],
    details: [
      { title: "Bancada na altura do seu corpo", text: "A altura muda conforme a cadeira e quem usa. Dois centímetros resolvem dor nas costas depois de oito horas." },
      { title: "Fio nenhum aparecendo", text: "Furos, calhas e tomadas previstos no projeto, na posição de cada equipamento." },
      { title: "Estante que sustenta", text: "Prateleiras dimensionadas para o peso dos livros, sem a barriga que aparece seis meses depois." },
    ],
    images: [
      img("/ambientes/home-office-1.jpg", "Estante de madeira iluminada com nichos abertos, livros e objetos", { width: 1333, height: 2000 }),
      img("/ambientes/home-office-2.jpg", "Home office com estante de madeira do chão ao teto, bancada e poltrona junto à janela", { width: 2000, height: 1333 }),
      img("/ambientes/home-office-3.jpg", "Home office compacto com bancada e nichos iluminados em madeira clara", { width: 1393, height: 2000 }),
    ],
  },
  {
    slug: "sala-e-home-theater",
    title: "Sala e home theater",
    kind: "Sala",
    place: "Salas de estar e jantar",
    cover: 1,
    hero: 1,
    summary:
      "Na sala, a marcenaria organiza o que fica à vista e esconde o resto: painel de televisão, adega, buffet e armário fechado para o que não precisa aparecer. É o ambiente onde o acabamento é mais notado, porque é onde a visita senta.",
    rooms: ["Painel de TV", "Buffet e adega", "Estante com nichos", "Rack suspenso"],
    details: [
      { title: "Painel que esconde a fiação", text: "Tomadas, caixas de som e suporte da televisão resolvidos por trás do painel, sem canaleta aparente." },
      { title: "Guardar sem poluir", text: "Portas fechadas para o que não precisa estar à vista e nichos abertos só onde há o que mostrar." },
      { title: "Integração com a sala de jantar", text: "Buffet, adega e aparador no mesmo desenho do painel, ligando os dois ambientes." },
    ],
    images: [
      img("/ambientes/sala-1.jpg", "Sala de jantar com marcenaria escura, bancada de pedra e mesa para seis lugares", { width: 2000, height: 1627 }),
      img("/ambientes/sala-2.jpg", "Sala de estar com painel ripado e marcenaria em torno da televisão", { width: 2000, height: 1600 }),
      img("/ambientes/sala-3.jpg", "Sala com estante de madeira escura, livros e poltrona de leitura", { width: 1501, height: 2000 }),
    ],
  },
  {
    slug: "banheiro-e-lavabo",
    title: "Banheiro e lavabo",
    kind: "Banheiro",
    place: "Suítes, banheiros sociais e lavabos",
    cover: 1,
    hero: 1,
    summary:
      "Banheiro é o ambiente mais úmido da casa e o que menos perdoa erro de medida. Gabinete suspenso, espelheira com luz e ferragem preparada para umidade fazem a diferença entre um móvel de cinco e de quinze anos.",
    rooms: ["Gabinete suspenso", "Espelheira iluminada", "Nichos no box", "Torre de apoio"],
    details: [
      { title: "Material preparado para umidade", text: "Chapa, borda e ferragem escolhidas para banheiro — é o que evita a porta estufada perto do chuveiro." },
      { title: "Cuba e encanamento no desenho", text: "O gabinete é desenhado em cima da posição real do sifão, com recorte feito na fábrica." },
      { title: "Luz que serve para se arrumar", text: "Iluminação na espelheira pensada para o rosto, não só para o ambiente." },
    ],
    images: [
      img("/ambientes/banheiro-1.jpg", "Banheiro com bancada de mármore escuro, gabinete de madeira e espelho oval iluminado", { width: 2000, height: 2000 }),
      img("/ambientes/banheiro-2.jpg", "Banheiro com revestimento de mármore escuro, box de vidro e banheira", { width: 1333, height: 2000 }),
      img("/ambientes/banheiro-3.jpg", "Lavabo com parede de mármore claro, bancada suspensa e espelho redondo", { width: 2000, height: 2000 }),
    ],
  },
];

export const galleryCategories = ["Cozinha", "Closet", "Dormitório", "Home office", "Sala", "Banheiro"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = ProjectImage & { category: string; project: { slug: string; title: string } };

/** Todas as fotos dos ambientes, na ordem em que aparecem na galeria da Home. */
export const galleryItems: GalleryItem[] = projects.flatMap((p) =>
  p.images.map((image) => ({ ...image, category: p.kind, project: { slug: p.slug, title: p.title } })),
);

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function coverOf(p: Project): ProjectImage {
  return p.images[p.cover - 1] ?? p.images[0];
}

export function heroOf(p: Project): ProjectImage {
  return p.images[p.hero - 1] ?? coverOf(p);
}
