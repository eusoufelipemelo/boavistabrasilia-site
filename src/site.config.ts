import { Manrope } from "next/font/google";

/**
 * IDENTIDADE DO CLIENTE: Boa Vista Brasília (DKASA Móveis Planejados Ltda), Brasília/DF.
 *
 * Fonte dos textos: briefing de 20/08/2026 e o arquivo "Informações - site Boa Vista Brasília".
 * Nada aqui é inventado: o que o cliente não informou fica vazio e some da tela.
 * Os ambientes do portfólio ficam em src/content/ambientes.ts.
 */

// ---------------------------------------------------------------------------
// Tipografia: Manrope, uma família só, em pesos diferentes (títulos 500/600, texto 400).
// O logo da marca é um grotesco geométrico; a Manrope conversa com ele sem competir.
// Os argumentos precisam ser literais (regra do next/font). Mantenha a `variable`.
// ---------------------------------------------------------------------------
export const brandFont = Manrope({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
});

export type NavLink = { label: string; href: string };
export type Service = {
  title: string;
  /** Resumo curto de quem é atendido nesse serviço. */
  scope: string;
  description: string;
  /** Para quem o serviço é indicado. */
  forWhom: string;
  includes: string[];
  /** Foto do serviço (em /public). */
  image: { src: string; alt: string };
};

export const siteConfig = {
  /** Nome público da empresa. */
  name: "Boa Vista Brasília",
  /** Razão social informada no briefing. */
  legalName: "DKASA Móveis Planejados Ltda",
  /** Slogan da marca. */
  tagline: "Design que transforma. Exclusividade que inspira.",
  /** Grupo a que a loja pertence (arquivo de informações do cliente). */
  group: "Uma empresa do Grupo D'Kaza",
  /** Descrição padrão das páginas (150–160 caracteres). */
  description:
    "Móveis planejados de alto padrão em Brasília. A Boa Vista Brasília acompanha do projeto à montagem, com 10 anos de garantia e móveis 100% editáveis.",
  /** Domínio de produção, sem barra no fim. A variável SITE_URL tem prioridade. */
  url: "https://www.boavistabrasilia.com.br",
  locale: "pt_BR",
  language: "pt-BR",

  /** Logo original do cliente (grafite), sem redesenho. A versão branca fica em /marca. */
  logo: { src: "/marca/boa-vista-grafite.png", width: 1200, height: 331 },
  logoLight: { src: "/marca/boa-vista-branco.png", width: 1200, height: 331 },
  /** Imagem de compartilhamento (1200x630) com o logo e foto real do cliente. */
  ogImage: "/compartilhamento.jpg",

  /** Loja de móveis planejados: FurnitureStore no schema.org. */
  schemaType: "FurnitureStore",

  nav: [
    { label: "Início", href: "/" },
    { label: "Ambientes", href: "/projetos" },
    { label: "Serviços", href: "/servicos" },
    { label: "Sobre", href: "/sobre" },
    { label: "Blog", href: "/blog" },
    { label: "Contato", href: "/contato" },
  ] satisfies NavLink[],

  contact: {
    /** Só números, com DDI e DDD. */
    whatsapp: "5561996694747",
    whatsappMessage: "Olá! Vim pelo site da Boa Vista Brasília e gostaria de conversar sobre um projeto.",
    phone: "(61) 99669-4747",
    phoneHref: "+5561996694747",
    email: "comercial@boavistabrasilia.com",
    address: {
      street: "SIA Trecho 2, Lote 2005 a 2015, Sala 101A",
      neighborhood: "SIA",
      city: "Brasília",
      state: "DF",
      postalCode: "71200-020",
      country: "BR",
    },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=SIA+Trecho+2+Lote+2005+Bras%C3%ADlia+DF+71200-020",
    hours: "Segunda a sexta, das 9h às 19h. Sábado, das 9h às 12h.",
    hoursNote: "Fora desses horários, o atendimento é feito com agendamento.",
    openingHoursSpec: ["Mo-Fr 09:00-19:00", "Sa 09:00-12:00"] as string[],
    areaServed: "Brasília e entorno (DF)",
    /** Regiões de atendimento (a confirmar com o cliente). */
    regions: ["Lago Sul", "Lago Norte", "Park Way", "Sudoeste", "Noroeste", "Asa Sul", "Asa Norte", "Jardim Botânico"],
    /** Centro aproximado de cada região, para o mapa de "Onde atendemos". */
    regionPoints: [
      { name: "Lago Sul", lat: -15.8385, lng: -47.8618 },
      { name: "Lago Norte", lat: -15.7355, lng: -47.8585 },
      { name: "Park Way", lat: -15.8926, lng: -47.9494 },
      { name: "Sudoeste", lat: -15.7975, lng: -47.9255 },
      { name: "Noroeste", lat: -15.7391, lng: -47.9149 },
      { name: "Asa Sul", lat: -15.8163, lng: -47.9053 },
      { name: "Asa Norte", lat: -15.7631, lng: -47.8828 },
      { name: "Jardim Botânico", lat: -15.8757, lng: -47.8065 },
    ],
  },

  /** Perfis oficiais (entram no JSON-LD como sameAs). */
  social: [{ label: "Instagram", href: "https://www.instagram.com/boavistabrasilia/" }] satisfies NavLink[],

  /** Vídeos do cliente. Os dois primeiros ficam no site; a conversa longa vai pelo YouTube. */
  videos: {
    casacor: {
      src: "/video/casacor-1.mp4",
      poster: "/video/casacor-1.jpg",
      title: "A Boa Vista Brasília na CASACOR Brasília 2026",
      alt: "Sócia da Boa Vista Brasília apresenta a cozinha assinada para a CASACOR Brasília 2026",
    },
    detalhes: {
      src: "/video/casacor-2.mp4",
      poster: "/video/casacor-2.jpg",
      title: "Os detalhes por dentro dos móveis",
      alt: "Gavetas com divisórias de madeira, porta-temperos e adega, abertas uma a uma",
    },
    conversa: {
      youtubeId: "-EXsQbmtZv4",
      poster: "/video/zardo.jpg",
      title: "Conversa com o arquiteto Jorge Zardo na CASACOR",
      alt: "O arquiteto Jorge Zardo conversa com a sócia da Boa Vista Brasília na cozinha da CASACOR",
    },
  },

  /** O que a loja faz (briefing). */
  services: [
    {
      title: "Projeto e móveis planejados",
      scope: "Para quem vai morar no espaço",
      description:
        "Você conta como vive, a gente desenha o móvel para essa rotina e acompanha até a montagem. O projeto é 100% editável: muda enquanto a sua ideia muda, antes de ir para a fábrica.",
      forWhom: "Para quem está montando ou reformando a casa e quer resolver um ambiente ou a casa inteira.",
      includes: ["Medição e projeto do ambiente", "Escolha de acabamentos, ferragens e iluminação", "Produção, entrega e montagem"],
      image: { src: "/ambientes/cozinha-1.jpg", alt: "Cozinha planejada em tons escuros com iluminação embutida sob os armários" },
    },
    {
      title: "Execução do projeto do seu arquiteto",
      scope: "Para arquitetos e designers de interiores",
      description:
        "Seu projeto sai do papel do jeito que foi desenhado. A equipe técnica detalha a marcenaria, discute cada solução com você e mantém o acompanhamento durante a produção e a montagem.",
      forWhom: "Para arquitetos e designers que precisam de uma marcenaria que respeite o desenho e o prazo combinado.",
      includes: ["Detalhamento técnico da marcenaria", "Compatibilização com o projeto de interiores", "Acompanhamento na produção e na montagem"],
      image: { src: "/fotos/equipe-projeto.jpg", alt: "Os três sócios da Boa Vista Brasília analisam um projeto juntos, em frente ao horizonte de Brasília" },
    },
    {
      title: "Atendimento a construtoras e incorporadoras",
      scope: "Para quem entrega unidades mobiliadas",
      description:
        "Móveis planejados para decorados, unidades mobiliadas e áreas comuns, com padrão repetível entre as unidades e uma equipe que fala a língua da obra.",
      forWhom: "Para construtoras, incorporadoras e corretores que precisam de volume com o mesmo acabamento.",
      includes: ["Projeto padrão por tipologia", "Cronograma alinhado à obra", "Montagem por etapas"],
      image: { src: "/ambientes/sala-2.jpg", alt: "Sala de estar com painel ripado e marcenaria sob medida em torno da televisão" },
    },
    {
      title: "Pós-entrega e garantia",
      scope: "Depois que o móvel está na sua casa",
      description:
        "A relação não termina na montagem. Os móveis têm 10 anos de garantia de fábrica, e o mesmo time que atendeu você continua sendo o canal para qualquer ajuste.",
      forWhom: "Para todo cliente da Boa Vista Brasília, desde a entrega.",
      includes: ["10 anos de garantia de fábrica", "Canal direto com quem atendeu você", "Assistência para ajustes e regulagens"],
      image: { src: "/fotos/gaveta-mao.jpg", alt: "Mão fechando uma gaveta com interior de madeira em um armário preto" },
    },
  ] satisfies Service[],

  /** Etapas do atendimento, da primeira conversa ao pós-entrega. */
  process: [
    {
      title: "Conversa",
      text: "A primeira conversa é sobre a sua rotina, não sobre o móvel. Quem mora na casa, o que incomoda hoje e o que o ambiente precisa resolver.",
      image: { src: "/fotos/equipe-projeto.jpg", alt: "Sócios da Boa Vista Brasília conversando sobre um projeto ao lado da janela" },
    },
    {
      title: "Medição e projeto",
      text: "Medimos o espaço e desenhamos o ambiente em 3D, com os acabamentos, as ferragens e a iluminação escolhidos junto com você.",
      image: { src: "/ambientes/home-office-1.jpg", alt: "Estante de madeira iluminada com nichos abertos e objetos de decoração" },
    },
    {
      title: "Ajustes",
      text: "O projeto é 100% editável. Muda a medida, o acabamento, a divisão interna — quantas vezes for preciso, até ficar do seu jeito.",
      image: { src: "/fotos/faqueiro.jpg", alt: "Gaveta aberta com divisórias de madeira e talheres organizados" },
    },
    {
      title: "Produção",
      text: "Os móveis são produzidos na fábrica Boa Vista, com maquinário alemão de corte e usinagem. Cada peça sai com a medida do seu projeto.",
      image: { src: "/fotos/nicho.jpg", alt: "Nicho embutido em marcenaria preta com peça de cerâmica branca" },
    },
    {
      title: "Entrega e montagem",
      text: "A montagem é acompanhada por quem atendeu você. A entrega é combinada com a obra e com a sua rotina, sem surpresa no dia.",
      image: { src: "/fotos/cozinha-madeira.jpg", alt: "Sócio da Boa Vista Brasília conferindo o acabamento de uma bancada de cozinha" },
    },
    {
      title: "Depois da entrega",
      text: "Os móveis têm 10 anos de garantia de fábrica e o mesmo canal de atendimento continua aberto para ajustes e dúvidas.",
      image: { src: "/fotos/gaveta-mao.jpg", alt: "Mão fechando uma gaveta de madeira em um armário preto" },
    },
  ],

  /** Diferenciais confirmados no briefing. Nada além disso. */
  facts: [
    { value: "10 anos", label: "de garantia de fábrica nos móveis" },
    { value: "100% editável", label: "o projeto muda até você aprovar" },
    { value: "Maquinário alemão", label: "corte e usinagem com precisão de indústria" },
  ],

  /** Página Sobre e blocos da Home. */
  about: {
    headline: "Três sócios, uma loja e um jeito de fazer",
    paragraphs: [
      "A Boa Vista Brasília nasceu de um encontro. Giovanna já era lojista Boa Vista em Posse, em Goiás, e convidou Maikel para trabalhar com ela. Quando a fábrica ofereceu a loja de Brasília, os dois chamaram Thais, e os três assumiram a operação em janeiro de 2026.",
      "A loja existe há cinco anos na cidade. O que mudou com a nova administração foi o jeito de conduzir: setores internos definidos, processos escritos e alguém responsável por cada etapa, do primeiro atendimento à montagem.",
      "Entregar um móvel muito bem feito é obrigação, e para isso existe a fábrica: tecnologia, maquinário alemão e 10 anos de garantia. O que a Boa Vista Brasília faz de diferente é a forma de conduzir o caminho até lá — com acompanhamento próximo, prazo combinado e nenhuma etapa que você descubra sozinho.",
    ],
    /**
     * Sócios (briefing). Os retratos aparecem sem nome: o cliente ainda não confirmou
     * quem é quem nas fotos. Quando confirmar, é só ligar cada nome ao seu retrato.
     */
    partners: [
      {
        name: "Giovanna",
        role: "Sócia-proprietária, diretora administrativa",
        does: "Responde pela operação interna: contratos, pedidos de fábrica e o combinado de cada entrega.",
      },
      {
        name: "Maikel",
        role: "Sócio-proprietário, diretor de projetos",
        does: "Conduz o detalhamento técnico da marcenaria e a conversa com os arquitetos que trazem seus projetos.",
      },
      {
        name: "Thais",
        role: "Sócia-proprietária, diretora comercial",
        does: "Cuida do atendimento, do primeiro contato à apresentação do projeto na loja.",
      },
    ],
    /** Retratos dos sócios, no mesmo enquadramento (sem legenda individual). */
    portraits: ["/fotos/socia-1.jpg", "/fotos/socio-1.jpg", "/fotos/socia-2.jpg"],
    /** Quem responde tecnicamente pelos projetos (E-E-A-T). */
    expert: {
      name: "Maikel",
      credentials: "Sócio-proprietário e diretor de projetos da Boa Vista Brasília",
      bio: "Maikel começou como conferente de loja, acompanhando a conferência de cada peça antes da montagem, e hoje responde pelos projetos da Boa Vista Brasília. É ele quem conduz o detalhamento técnico da marcenaria e a conversa com os arquitetos que trazem seus projetos para a loja.",
      image: { src: "/fotos/maikel.jpg", alt: "Maikel, sócio e diretor de projetos da Boa Vista Brasília, de braços cruzados diante da janela" },
    },
  },

  /** Textos da Home. */
  home: {
    heroTitle: "Móveis planejados para quem repara nos detalhes",
    heroSubtitle: "Alto padrão em Brasília",
    heroText:
      "Projeto, produção e montagem conduzidos pela mesma equipe. Os móveis saem da fábrica Boa Vista com 10 anos de garantia; o resto do caminho é com a gente.",
    primaryCta: "Conversar no WhatsApp",
    secondaryCta: "Ver ambientes",
    manifestoTitle: "Um bom móvel é o mínimo",
    manifestoText: [
      "A indústria resolve o produto. Maquinário alemão, projeto 100% editável, 10 anos de garantia: isso é dever de casa, e é por isso que escolhemos a fábrica Boa Vista.",
      "O que decide a sua experiência é o que acontece entre o primeiro atendimento e a última gaveta montada. É aí que colocamos gente, processo e tempo — para que a entrega seja tranquila, no prazo, e você não precise correr atrás de ninguém.",
    ],
  },

  blog: {
    title: "Blog",
    description: "Ideias, materiais e cuidados com móveis planejados de alto padrão, para quem está montando ou reformando a casa em Brasília.",
    perPage: 12,
  },

  /** Chamada para ação no fim dos artigos e das páginas. */
  cta: {
    title: "Vamos desenhar o seu ambiente?",
    text: "Conte qual ambiente você quer resolver e em que região de Brasília fica. A conversa começa pelo WhatsApp, no seu tempo.",
    button: "Conversar no WhatsApp",
  },

  /** Perguntas frequentes (Home e Serviços, com FAQPage no JSON-LD). Só fatos do briefing. */
  faq: [
    {
      q: "Os móveis da Boa Vista Brasília têm garantia?",
      a: "Sim. Os móveis têm 10 anos de garantia de fábrica. Depois da montagem, o mesmo time que atendeu você continua sendo o canal para ajustes e dúvidas.",
    },
    {
      q: "O que significa o projeto ser 100% editável?",
      a: "Significa que o desenho muda enquanto a sua ideia muda: medida, acabamento, ferragem, divisão interna. Os ajustes são feitos no projeto, antes de a peça ir para a produção.",
    },
    {
      q: "Vocês executam o projeto do meu arquiteto?",
      a: "Sim. A equipe técnica detalha a marcenaria a partir do projeto do arquiteto, discute as soluções com ele e acompanha a produção e a montagem.",
    },
    {
      q: "Quais ambientes a Boa Vista Brasília faz?",
      a: "Cozinha, dormitório, closet, home office, sala e home theater, banheiro e lavabo, área gourmet, lavanderia e ambientes comerciais. Se o seu ambiente não está nessa lista, pergunte pelo WhatsApp.",
    },
    {
      q: "Onde fica a loja e como funciona o atendimento?",
      a: "A loja fica no SIA Trecho 2, Lote 2005 a 2015, Sala 101A, em Brasília. O atendimento é de segunda a sexta, das 9h às 19h, e aos sábados das 9h às 12h. Fora desses horários, é possível agendar.",
    },
    {
      q: "Como peço um orçamento?",
      a: "Mande uma mensagem no WhatsApp (61) 99669-4747 contando qual ambiente quer resolver e em que região mora. Se tiver a planta ou as medidas do espaço, envie junto: adianta a conversa.",
    },
  ],

  /**
   * CORES: a marca é monocromática (o logo usa um único grafite, #201E1E).
   * Os outros tons são apoios derivados dele; a cor do site vem das fotos, não de um acento inventado.
   * Contraste: #FFFFFF sobre #201E1E = 15,5:1; #201E1E sobre #F4F3F1 = 14,6:1; #63605C sobre #F4F3F1 = 5,6:1.
   */
  theme: {
    brand: "#201E1E", // grafite exato do logo
    brandContrast: "#FFFFFF", // texto sobre o grafite
    brandSoft: "#E4E2DE", // fundo suave derivado do grafite
    ink: "#201E1E", // texto principal
    muted: "#63605C", // texto secundário
    surface: "#F4F3F1", // fundo da página
    surfaceAlt: "#E9E7E3", // fundo de seções alternadas
    line: "#D6D3CE", // bordas e divisórias
    radius: "2px", // arredondamento de caixas (botões são arredondados à parte)
  },
};

export type SiteConfig = typeof siteConfig;
