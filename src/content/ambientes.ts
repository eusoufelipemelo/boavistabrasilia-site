/**
 * Ambientes que a Boa Vista Brasília projeta.
 *
 * Todas as fotos são de projetos executados com móveis Boa Vista, enviadas pela loja
 * (pasta "3 - Fotos/Fotos Ambientes"). As fotos reais da loja, da fábrica, dos sócios
 * e da CASACOR ficam em /public/fotos.
 */

export type ProjectImage = { src: string; width: number; height: number; alt: string };

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

function img(src: string, alt: string, size: { width: number; height: number }): ProjectImage {
  return { src, ...size, alt };
}

export const projects: Project[] = [
  {
    slug: "cozinha",
    title: "Cozinha",
    kind: "Cozinha",
    place: "Casas e apartamentos",
    cover: 1,
    hero: 5,
    summary:
      "A cozinha é o ambiente que mais exige do projeto: cada gaveta tem uma função, cada medida depende do eletrodoméstico e nada pode sobrar. O desenho começa pelo que você cozinha e por quantas pessoas ficam ali ao mesmo tempo.",
    rooms: ["Armários até o teto", "Gavetas com divisórias", "Torre quente", "Adega e iluminação embutida"],
    details: [
      { title: "Divisão interna pensada antes", text: "Faqueiro, porta-temperos, lixeira embutida e altura de gaveta definida pelo que você guarda — não pelo que cabe." },
      { title: "Medidas conferidas na obra", text: "A medição acontece depois do revestimento, com os eletrodomésticos definidos. É o que evita o vão de dois centímetros no dia da montagem." },
      { title: "Acabamento que aguenta o uso", text: "Portas, puxadores e ferragens escolhidos para a rotina da casa, com a possibilidade de trocar frentes no futuro sem refazer o móvel." },
    ],
    images: [
      img("/ambientes/cozinha-1.jpg", "Cozinha integrada com adega climatizada, nichos iluminados e divisória de vidro", { width: 2000, height: 1364 }),
      img("/ambientes/cozinha-2.jpg", "Cozinha em tons escuros com painel de madeira e iluminação sob os armários", { width: 1333, height: 2000 }),
      img("/ambientes/cozinha-3.jpg", "Nicho de madeira iluminado com adega, taças e objetos de decoração", { width: 2000, height: 1333 }),
      img("/ambientes/cozinha-4.jpg", "Cozinha clara com armários até o teto, torneira dourada e bancada de pedra", { width: 1333, height: 2000 }),
      img("/ambientes/cozinha-5.jpg", "Cozinha com bancada de mármore, ripado de madeira e banquetas de palha", { width: 2000, height: 1333 }),
      img("/ambientes/cozinha-6.jpg", "Gaveta aberta com divisórias de madeira e talheres organizados", { width: 1333, height: 2000 }),
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
      img("/ambientes/closet-1.jpg", "Closet amadeirado com cabideiros iluminados, gaveteiro e nichos para sapatos", { width: 1333, height: 2000 }),
      img("/ambientes/closet-2.jpg", "Closet com portas de vidro, espelho iluminado e penteadeira", { width: 2000, height: 1333 }),
      img("/ambientes/closet-3.jpg", "Closet claro com gaveteiro central, cabideiros e iluminação embutida", { width: 1333, height: 2000 }),
      img("/ambientes/closet-4.jpg", "Closet aberto em tom claro com prateleiras, gavetas e sapateira inclinada", { width: 1333, height: 2000 }),
      img("/ambientes/closet-5.jpg", "Closet junto à janela com cabideiro iluminado e bancada de apoio", { width: 1333, height: 2000 }),
      img("/ambientes/closet-6.jpg", "Cabideiro de madeira escura com iluminação em perfil e gavetas internas", { width: 1333, height: 2000 }),
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
      "No dormitório a marcenaria precisa desaparecer. Guarda-roupa, cabeceira, criado e painel de televisão entram como uma peça só, no mesmo acabamento, para o quarto continuar sendo um quarto. Nos quartos de criança, o projeto é feito para durar além da fase.",
    rooms: ["Guarda-roupa até o teto", "Cabeceira planejada", "Painel de TV", "Criados e penteadeira"],
    details: [
      { title: "Uma peça, não quatro móveis", text: "Cabeceira, criados e painel desenhados juntos, com as mesmas linhas e o mesmo acabamento." },
      { title: "Aproveitamento do pé-direito", text: "Armário até o teto, com portas de abrir ou correr conforme o espaço de circulação da cama." },
      { title: "Quarto de criança que cresce", text: "Divisões internas reguláveis e frentes que podem ser trocadas quando a fase muda." },
    ],
    images: [
      img("/ambientes/dormitorio-1.jpg", "Quarto de casal com painel laranja, cabeceira estofada e bancada ao lado da cama", { width: 2000, height: 1333 }),
      img("/ambientes/dormitorio-2.jpg", "Suíte com cabeceira de madeira, criados suspensos e armário com portas espelhadas", { width: 2000, height: 1333 }),
      img("/ambientes/dormitorio-3.jpg", "Quarto compacto com divisória vazada, bancada de estudos e armário cinza", { width: 1333, height: 2000 }),
      img("/ambientes/dormitorio-4.jpg", "Quarto infantil com cabeceira arredondada em tom rosa e cortina até o teto", { width: 2000, height: 1333 }),
      img("/ambientes/dormitorio-5.jpg", "Quarto infantil com cabeceira vazada iluminada e marcenaria em tom claro", { width: 2000, height: 1333 }),
      img("/ambientes/dormitorio-6.jpg", "Quarto infantil com penteadeira iluminada, gaveteiro rosé e painel ripado", { width: 2000, height: 1333 }),
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
      img("/ambientes/home-office-1.jpg", "Home office com bancada de madeira em L, prateleiras iluminadas e painel de TV", { width: 2000, height: 1333 }),
      img("/ambientes/home-office-2.jpg", "Escritório com armário de madeira do piso ao teto, bancada e estante integrada", { width: 2000, height: 1333 }),
      img("/ambientes/home-office-3.jpg", "Home office claro com mesa redonda, armários curvos e iluminação embutida", { width: 2000, height: 1333 }),
      img("/ambientes/home-office-4.jpg", "Estante metálica iluminada no showroom da Boa Vista, com poltrona de leitura", { width: 1333, height: 2000 }),
      img("/ambientes/home-office-5.jpg", "Sala de reunião com mesa comprida, painel de madeira e nichos iluminados", { width: 2000, height: 1333 }),
      img("/ambientes/home-office-6.jpg", "Escritório amadeirado com escrivaninha, cadeiras e painel ripado", { width: 1333, height: 2000 }),
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
      img("/ambientes/sala-1.jpg", "Sala de estar com painel de mármore e ripado de madeira, rack suspenso e iluminação embutida", { width: 2000, height: 1333 }),
      img("/ambientes/sala-2.jpg", "Sala clara e ampla com painel de TV, sofá curvo e marcenaria branca", { width: 2000, height: 1318 }),
      img("/ambientes/sala-3.jpg", "Sala de estar com painel de madeira, rack suspenso e poltrona azul", { width: 2000, height: 1333 }),
      img("/ambientes/sala-4.jpg", "Home theater com painel ripado iluminado, lareira ecológica e poltrona", { width: 1333, height: 2000 }),
      img("/ambientes/sala-5.jpg", "Estante clara com nichos, aparador e objetos de decoração na sala de jantar", { width: 2000, height: 1388 }),
      img("/ambientes/sala-6.jpg", "Painel escuro com nichos de madeira iluminados e plantas na sala de estar", { width: 1333, height: 2000 }),
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
      img("/ambientes/banheiro-1.jpg", "Lavabo revestido de madeira com bancada de pedra, cuba esculpida e espelho orgânico", { width: 1333, height: 2000 }),
      img("/ambientes/banheiro-2.jpg", "Banheiro com gabinete suspenso amadeirado, bancada ampla e espelheira iluminada", { width: 1333, height: 2000 }),
      img("/ambientes/banheiro-3.jpg", "Lavabo com parede de terrazzo, gabinete claro e espelho de borda arredondada", { width: 1333, height: 2000 }),
      img("/ambientes/banheiro-4.jpg", "Lavabo com papel de parede estampado, bancada iluminada e gabinete amadeirado", { width: 1333, height: 2000 }),
      img("/ambientes/banheiro-5.jpg", "Gabinete de banheiro em tom amadeirado com bancada de apoio e espelho", { width: 1333, height: 2000 }),
    ],
  },
];

export const galleryCategories = ["Cozinha", "Closet", "Dormitório", "Home office", "Sala", "Banheiro"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = ProjectImage & { category: string; project: { slug: string; title: string } };

/** Todas as fotos dos ambientes, intercaladas por categoria para a galeria não ficar em blocos. */
export const galleryItems: GalleryItem[] = (() => {
  const lists = projects.map((p) => p.images.map((image) => ({ ...image, category: p.kind, project: { slug: p.slug, title: p.title } })));
  const out: GalleryItem[] = [];
  for (let i = 0; i < Math.max(...lists.map((l) => l.length)); i++) {
    for (const list of lists) if (list[i]) out.push(list[i]);
  }
  return out;
})();

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function coverOf(p: Project): ProjectImage {
  return p.images[p.cover - 1] ?? p.images[0];
}

export function heroOf(p: Project): ProjectImage {
  return p.images[p.hero - 1] ?? coverOf(p);
}
