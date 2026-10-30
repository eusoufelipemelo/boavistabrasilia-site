import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { whatsappUrl } from "@/lib/format";
import { siteConfig } from "@/site.config";
import { HeroPicture } from "../HeroPicture";
import { ApnDeck, type Capitulo } from "./ApnDeck";
import { ApnBoasVindas, ApnContatoFinal, ApnPropostaCapa, ApnPropostaTabela } from "./ApnProposta";
import { ApnVideo } from "./ApnVideo";

type Foto = { src: string; width: number; height: number; alt: string };
const f = (nome: string, width: number, height: number, alt: string): Foto => ({ src: `/apn/${nome}.jpg`, width, height, alt });

/** Slides 16 a 37 do arquivo, na mesma ordem. `par`: os dois recortes empilhados no celular. */
const GALERIA: { foto: Foto; par?: [Foto, Foto]; claro?: boolean }[] = [
  {
    foto: f("g01", 2000, 1125, "Vanessa Giácomo em sua cozinha e Danielle Winits em seu closet, clientes Boa Vista"),
    par: [f("g01a", 1000, 1125, "Vanessa Giácomo, cliente Boa Vista, tomando café na bancada da cozinha"), f("g01b", 1000, 1125, "Danielle Winits, cliente Boa Vista, diante das portas de vidro do closet")],
  },
  { foto: f("g02", 2000, 1125, "Naiara Azevedo, cliente Boa Vista, sentada junto à penteadeira iluminada") },
  { foto: f("g03", 2000, 1125, "Renato Aragão e família, clientes Boa Vista, à mesa diante de painéis de madeira") },
  {
    foto: f("g04", 2000, 1125, "Eduardo e Julia com o filho, clientes Boa Vista, e a sala com painel de TV da casa deles"),
    par: [f("g04a", 765, 1125, "Eduardo e Julia, clientes Boa Vista, com o filho"), f("g04b", 1200, 1093, "Sala com painel de TV, ripado de madeira iluminado e adega")],
  },
  { foto: f("g05", 2000, 1125, "Bruno, cliente Boa Vista, cantando e tocando violão no palco dos 30 anos da marca") },
  {
    foto: f("g06", 2000, 1125, "Coleção Flora: mão sobre tronco de árvore e cinco amostras de lâminas de madeira"),
    par: [f("g06a", 785, 1125, "Coleção Flora: mão sobre o tronco de uma árvore"), f("g06b", 1200, 1111, "Cinco amostras de lâminas de madeira da coleção Flora")],
  },
  {
    foto: f("g07", 1998, 1125, "Ripado curvo da coleção Finesse e cozinha com ilha curva"),
    par: [f("g07a", 757, 999, "Detalhe do ripado curvo da coleção Finesse"), f("g07b", 1154, 999, "Cozinha com ilha curva e bancada arredondada")],
    claro: true,
  },
  {
    foto: f("g08", 1998, 1125, "Painel muxarabi iluminado da coleção Finesse e escritório com o mesmo painel"),
    par: [f("g08a", 757, 999, "Detalhe do painel muxarabi iluminado"), f("g08b", 1154, 999, "Escritório com mesa oval, prateleiras iluminadas e painel muxarabi")],
    claro: true,
  },
  {
    foto: f("g09", 1998, 1125, "Colaboradoras e colaboradores da fábrica mostrando portas provençal e dormitório com portas de tela"),
    par: [f("g09a", 650, 1059, "Quatro colaboradores da fábrica mostrando as portas provençal, com vidro, tela quadriculada e tela sextavada"), f("g09b", 1154, 999, "Dormitório com armário de portas de tela e janela para o jardim")],
    claro: true,
  },
  { foto: f("g10", 2000, 1125, "Suíte com cabeceira estofada, closet de vidro com perfis dourados e armários até o teto") },
  { foto: f("g11", 2000, 1125, "Aparador com escultura e vaso diante de painéis de madeira com luz embutida") },
  { foto: f("g12", 2000, 1125, "Cozinha grafite com ilha, mesa integrada e pendentes") },
  {
    foto: f("g13", 2000, 1125, "Painel ripado do quarto, fechado e depois aberto, revelando uma porta oculta"),
    par: [f("g13a", 1000, 1125, "Quarto com painel ripado de madeira, com a porta oculta fechada"), f("g13b", 960, 1125, "O mesmo painel ripado com a porta oculta aberta por uma pessoa")],
  },
  { foto: f("g14", 2000, 1125, "Gavetas abertas com divisórias de madeira em cozinha clássica") },
  { foto: f("g15", 2000, 1125, "Cozinha cinza com torre de fornos, adega e bancada clara") },
  { foto: f("g16", 2000, 1125, "Cozinha branca clássica com puxadores dourados") },
  { foto: f("g17", 2000, 1125, "Cozinha com ilha, banquetas de palhinha e armários em dois tons") },
  {
    foto: f("g18", 2000, 1125, "Lavanderia oculta por portas de madeira vazadas"),
    par: [f("g18a", 520, 725, "Lavanderia com armários brancos e máquina de lavar, vista com as portas abertas"), f("g18b", 1100, 1125, "Portas de madeira vazadas que escondem a lavanderia")],
  },
  { foto: f("g19", 2000, 1125, "Dormitório com painel de TV claro, rack de cantos curvos e perfis dourados") },
  { foto: f("g20", 2000, 1125, "Cozinha gourmet com ilha ripada, mesa integrada e prateleira suspensa") },
  { foto: f("g21", 2000, 1125, "Quarto infantil com balanço, armários claros e bancada de estudos") },
  { foto: f("g22", 2000, 1125, "Brinquedoteca com casinha de madeira, escorregador e piscina de bolinhas") },
];

const ETAPAS: Foto[] = [
  f("etapa-venda", 1000, 667, "Aperto de mãos na venda"),
  f("etapa-medicao", 800, 534, "Medição com trena a laser"),
  f("etapa-execucao", 750, 1000, "Projeto executivo aberto em um monitor"),
  f("etapa-fabricacao", 666, 1000, "Conferência de peças na fábrica"),
  f("etapa-entrega", 562, 1000, "Móveis embalados entregues no imóvel"),
  f("etapa-montagem", 750, 1000, "Equipe montando os móveis"),
  f("etapa-pos", 687, 1000, "Ajuste com parafusadeira depois da montagem"),
  f("etapa-assistencia", 687, 1000, "Regulagem de porta durante a assistência"),
];
const NOMES_ETAPAS = ["Venda", "Medição", "Execução", "Fabricação", "Entrega", "Montagem", "Pós-montagem", "Assistência"];

const SOLUCOES = ["Iluminação", "Ferragens", "Metais", "Lâminas naturais", "Mobiliário solto", "Personalização", "Vidros", "Alumínio", "Usinagens especiais", "Palhas", "Tecidos"];

function Tela({ children, tom = "escuro", className = "", nome }: { children: ReactNode; tom?: "escuro" | "claro" | "branco"; className?: string; nome: string }) {
  const cores = { escuro: "bg-ink text-surface on-dark", claro: "bg-surface text-ink", branco: "bg-white text-ink" };
  return (
    <section data-tela aria-label={nome} className={`apn-tela ${cores[tom]} ${className}`}>
      {children}
    </section>
  );
}

/** Texto centralizado que rola por dentro só se a tela for baixa demais (celular deitado). */
function Conteudo({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div data-rolagem-interna className={`apn-rolagem flex h-full ${className}`}>
      <div className="apn-margem m-auto w-full">{children}</div>
    </div>
  );
}

function Fundo({ foto, foco = "50% 50%", prioridade = false }: { foto: Foto; foco?: string; prioridade?: boolean }) {
  return <Image src={foto.src} alt={foto.alt} fill sizes="(orientation: portrait) 180vw, 100vw" loading={prioridade ? "eager" : "lazy"} className="object-cover" style={{ objectPosition: foco }} />;
}

export function ApnPresentation() {
  const a = siteConfig.about;
  const c = siteConfig.contact;
  const whatsappHref = whatsappUrl(c.whatsapp, c.whatsappMessage) ?? "#";

  const capitulos: Capitulo[] = [
    { titulo: "Boas-vindas", inicio: 0 },
    { titulo: "A história da Boa Vista", inicio: 1 },
    { titulo: "Tour pela fábrica", inicio: 4 },
    { titulo: "A loja de Brasília", inicio: 5 },
    { titulo: "Como trabalhamos", inicio: 7 },
    { titulo: "A solução completa", inicio: 10 },
    { titulo: "Clientes e projetos", inicio: 13 },
    { titulo: "Proposta", inicio: 35 },
    { titulo: "Agradecimento", inicio: 37 },
  ];
  const total = 13 + GALERIA.length + 3;

  return (
    <>
      {/* evita mostrar a saudação geral antes do nome, em quem abre um link pessoal */}
      <script dangerouslySetInnerHTML={{ __html: "if(location.hash.indexOf('#p=')===0)document.documentElement.classList.add('apn-pessoal')" }} />
      <ApnDeck total={total} capitulos={capitulos} whatsappHref={whatsappHref}>
        {/* 1. Boas-vindas */}
        <Tela nome="Boas-vindas">
          <div className="absolute inset-0">
            <HeroPicture
              desktop={{ src: "/fotos/hero-desktop-a.jpg", width: 2560, height: 1440 }}
              mobile={{ src: "/fotos/hero-mobile-a.jpg", width: 1050, height: 1400 }}
              alt="Gaveta de madeira com a marca Boa Vista gravada na lateral"
              high
            />
          </div>
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgb(32_30_30/0.94),rgb(32_30_30/0.3)_65%,rgb(32_30_30/0.55))]" />
          <div className="apn-margem relative flex h-full flex-col justify-between">
            <Image src={siteConfig.logoLight.src} alt="Boa Vista Brasília" width={siteConfig.logoLight.width} height={siteConfig.logoLight.height} unoptimized className="apn-logo h-11 w-auto self-start sm:h-14" />
            <div>
              <ApnBoasVindas />
              <p className="mt-8 inline-flex items-center gap-3 text-[0.95rem] text-surface/75">
                <span aria-hidden className="apn-dica" />
                <span className="pointer-coarse:hidden">Role para o lado</span>
                <span className="hidden pointer-coarse:inline">Deslize para o lado</span>
              </p>
            </div>
          </div>
        </Tela>

        {/* 2. Qual é o tamanho dos seus sonhos? (slide 4) */}
        <Tela nome="Qual é o tamanho dos seus sonhos?">
          <div className="grid h-full portrait:grid-rows-[minmax(0,30%)_minmax(0,1fr)] landscape:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <Conteudo className="portrait:order-2">
              <h2 className="apn-t1 display text-surface">Qual é o tamanho dos seus sonhos?</h2>
              <p data-reveal="fade" className="apn-c mt-5 max-w-[58ch] text-surface/80">
                Desde 1995, a Boa Vista Planejados nasceu de um recomeço, movida pela coragem, pelo trabalho e pela busca por propósito. Ao longo dos anos, construiu uma trajetória sólida baseada em confiança, dedicação e respeito pelas pessoas. Em 2026, ao celebrar 31 anos de história, vive uma nova fase que une legado familiar, experiência e um olhar estratégico para o futuro, mantendo sua essência enquanto evolui com inovação e compromisso com a qualidade.
              </p>
            </Conteudo>
            <div className="grid grid-cols-4 gap-1 portrait:order-1">
              {[
                f("fundador-1", 666, 1000, "Tarcísio Liell conferindo peças de madeira na fábrica, em preto e branco"),
                f("fundador-2", 666, 1000, "Tarcísio Liell empilhando peças na fábrica"),
                f("fundador-3", 666, 1000, "Tarcísio Liell na linha de produção, em preto e branco"),
                f("fundador-4", 666, 1000, "Tarcísio Liell apontando para amostras de acabamentos"),
              ].map((x) => (
                <div key={x.src} className="relative overflow-hidden">
                  <Image src={x.src} alt={x.alt} fill sizes="(orientation: portrait) 25vw, 15vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </Tela>

        {/* 3. O começo e hoje (slide 5) */}
        <Tela nome="O começo e hoje" tom="claro">
          <div className="grid h-full portrait:grid-rows-[auto_minmax(0,1fr)] landscape:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="apn-margem flex items-center gap-5 bg-surface-alt landscape:flex-col landscape:items-start landscape:justify-center portrait:!py-5">
              <div className="relative aspect-[658/406] w-[42%] shrink-0 overflow-hidden landscape:w-full">
                <Image src="/apn/comeco.jpg" alt="A primeira sede da Boa Vista: casa simples com um carro antigo na frente, em preto e branco" fill sizes="(orientation: portrait) 42vw, 34vw" className="object-cover" />
              </div>
              <div>
                <h2 className="apn-t2 display text-ink">O começo</h2>
                <ul className="apn-c mt-2 text-muted landscape:mt-4">
                  <li>Fundação: 1995</li>
                  <li>Município: Nova Boa Vista/RS</li>
                  <li>30 m²</li>
                  <li>3 pessoas</li>
                </ul>
              </div>
            </div>
            <div className="relative overflow-hidden bg-ink text-surface">
              <Image src="/apn/fabrica-hoje.jpg" alt="A fábrica da Boa Vista hoje, vista do alto, com o estacionamento e a mata ao redor" fill sizes="(orientation: portrait) 180vw, 60vw" className="object-cover opacity-30" />
              <Conteudo className="relative">
                <h2 className="apn-t1 display text-surface">Hoje, 2026</h2>
                <ul className="mt-5 grid grid-cols-2 gap-x-6 border-t border-white/20 landscape:mt-8">
                  {["31 anos de mercado", "22.000 m²", "280 funcionários", "Tecnologia alemã", "Mais de 200 lojas", "23 estados do Brasil", "Expansão nos EUA"].map((x) => (
                    <li key={x} data-reveal="fade" className="last:col-span-2 border-b border-white/20 py-3 text-[1.05rem] font-medium leading-snug tracking-[-0.015em] sm:py-4 sm:text-[1.4rem]">
                      {x}
                    </li>
                  ))}
                </ul>
              </Conteudo>
            </div>
          </div>
        </Tela>

        {/* 4. Família Boa Vista (slide 6) */}
        <Tela nome="Família Boa Vista Planejados">
          <div className="grid h-full portrait:grid-rows-[minmax(0,1.25fr)_auto] landscape:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="relative overflow-hidden">
              <Fundo foto={f("familia", 960, 1200, "Evandro, Tarcísio, Marcelo e Fernando Liell lado a lado, de camisa branca")} foco="50% 22%" />
            </div>
            <Conteudo>
              <h2 className="apn-t1 display text-surface">Família Boa Vista Planejados</h2>
              <p className="apn-c mt-5 text-surface/70">Da esquerda para a direita:</p>
              <p className="apn-c mt-1 max-w-[42ch] text-surface">Evandro Liell, Tarcísio Luiz Liell, Marcelo Liell e Fernando Liell.</p>
            </Conteudo>
          </div>
        </Tela>

        {/* 5. Tour pela fábrica (slide 7) */}
        <Tela nome="Tour pela fábrica">
          <div className="grid h-full landscape:grid-cols-[minmax(0,1fr)_auto]">
            <div className="apn-margem pointer-events-none flex items-center portrait:absolute portrait:inset-x-0 portrait:top-0 portrait:z-10 portrait:bg-[linear-gradient(to_bottom,rgb(32_30_30/0.85),transparent)] portrait:!pb-16">
              <h2 className="apn-t0 display text-surface">Tour pela fábrica</h2>
            </div>
            <ApnVideo src="/apn/tour-fabrica.mp4" poster="/apn/tour-fabrica.jpg" titulo="Tour pela fábrica da Boa Vista" alt="Vista interna da fábrica, com esteiras e pilhas de peças sob um teto metálico" className="h-full portrait:w-full landscape:aspect-[9/16]" />
          </div>
        </Tela>

        {/* 6. A loja de Brasília (slide 8, adaptado) */}
        <Tela nome="A loja de Brasília" tom="claro">
          <div className="grid h-full portrait:grid-rows-[minmax(0,27%)_minmax(0,1fr)] landscape:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="relative overflow-hidden">
              <Fundo foto={{ src: "/fotos/cozinha-madeira.jpg", width: 1600, height: 2000, alt: "Sócio da Boa Vista Brasília conferindo o acabamento de uma bancada" }} foco="50% 30%" />
            </div>
            <Conteudo>
              <h2 className="apn-t1 display text-ink">Loja Boa Vista Brasília</h2>
              <p className="apn-c mt-2 font-medium text-ink">{c.address.street}, Brasília/DF</p>
              <p data-reveal="fade" className="apn-c mt-5 max-w-[56ch] text-muted">
                A loja existe há cinco anos em Brasília e, desde janeiro de 2026, é conduzida por três sócios. Setores definidos, processos escritos e alguém responsável por cada etapa, do primeiro atendimento à montagem, para que nenhuma etapa fique para o cliente descobrir sozinho.
              </p>
              <p data-reveal="fade" className="apn-c mt-3 max-w-[56ch] text-muted">
                Atendemos em todo o Brasil, com lojas em Brasília (DF) e em Luís Eduardo Magalhães (BA). {siteConfig.group}.
              </p>
            </Conteudo>
          </div>
        </Tela>

        {/* 7. Os sócios (slide 9, adaptado) */}
        <Tela nome="Os sócios da Boa Vista Brasília">
          <div className="grid h-full portrait:grid-rows-[minmax(0,25%)_minmax(0,1fr)] landscape:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 landscape:hidden">
                <Fundo foto={{ src: "/fotos/socios-topo.jpg", width: 2560, height: 1097, alt: "Os três sócios da Boa Vista Brasília juntos no sofá, diante da janela" }} foco="40% 50%" />
              </div>
              <div className="absolute inset-0 portrait:hidden">
                <Fundo foto={{ src: "/fotos/socios-topo-mobile.jpg", width: 1050, height: 1400, alt: "Os três sócios da Boa Vista Brasília juntos no sofá, diante da janela" }} foco="50% 62%" />
              </div>
            </div>
            <Conteudo>
              <h2 className="apn-t2 display text-surface">Quase uma década de Boa Vista</h2>
              <p className="apn-c mt-3 max-w-[50ch] text-surface/75">Maikel e Thais começaram dentro da fábrica, no Rio Grande do Sul. Giovanna já era lojista Boa Vista em Posse, em Goiás.</p>
              <ul className="mt-5 border-t border-white/20">
                {a.partners.map((p) => (
                  <li key={p.name} className="border-b border-white/20 py-2.5">
                    <p className="text-[1.15rem] font-medium tracking-[-0.02em] text-surface">{p.name}</p>
                    <p className="text-[0.95rem] leading-snug text-surface/70">{p.role}</p>
                  </li>
                ))}
              </ul>
            </Conteudo>
          </div>
        </Tela>

        {/* 8. Processo (slide 10) */}
        <Tela nome="Processo Boa Vista Brasília" tom="claro">
          <div className="apn-margem flex h-full flex-col portrait:!pb-4">
            <h2 className="apn-t2 display shrink-0 text-ink">Processo Boa Vista Brasília</h2>
            <ol className="mt-4 grid min-h-0 flex-1 grid-cols-2 grid-rows-4 gap-2 sm:gap-3 landscape:mt-6 landscape:grid-cols-4 landscape:grid-rows-2">
              {ETAPAS.map((e, i) => (
                <li key={e.src} className="relative min-h-0 overflow-hidden bg-ink">
                  <Image src={e.src} alt={e.alt} fill sizes="(orientation: portrait) 50vw, 25vw" className="object-cover" />
                  <span className="absolute inset-x-0 bottom-0 flex items-baseline gap-2 bg-[linear-gradient(to_top,rgb(32_30_30/0.88),transparent)] px-3 pb-2.5 pt-8 text-surface sm:px-4 sm:pb-3">
                    <span className="text-[0.9rem] tabular-nums text-surface/80">{i + 1}</span>
                    <span className="text-[1rem] font-medium tracking-[-0.015em] sm:text-[1.2rem]">{NOMES_ETAPAS[i]}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Tela>

        {/* 9. Painel (slide 11, com nomes de clientes borrados) */}
        <Tela nome="Painel de acompanhamento dos projetos" tom="branco">
          <div className="flex h-full flex-col">
            <h2 className="apn-margem apn-t2 display shrink-0 text-ink portrait:!pb-4 landscape:!pb-2">Cada projeto acompanhado em um painel, etapa por etapa</h2>
            <div className="apn-pan relative min-h-0 flex-1 overflow-hidden">
              <Image src="/apn/painel.jpg" alt="Painel de controle com as etapas de pré-venda, venda, medição, executivo, fabricação, entrega, montagem, pós-montagem e assistência técnica; os dados dos clientes estão borrados" width={1847} height={936} sizes="(orientation: portrait) 240vh, 100vw" className="apn-pan-foto landscape:!object-contain" />
            </div>
          </div>
        </Tela>

        {/* 10. Equipe de supervisão e montagem (slide 12, adaptado) */}
        <Tela nome="Equipe de supervisão e montagem">
          <div className="grid h-full portrait:relative landscape:grid-cols-[minmax(0,0.7fr)_minmax(0,1.1fr)_auto]">
            <div className="relative hidden overflow-hidden landscape:block">
              <Fundo foto={f("g17", 2000, 1125, "Cozinha com ilha, banquetas de palhinha e armários em dois tons")} />
            </div>
            <div className="apn-margem pointer-events-none flex items-center portrait:absolute portrait:inset-x-0 portrait:top-0 portrait:z-10 portrait:bg-[linear-gradient(to_bottom,rgb(32_30_30/0.88),transparent)] portrait:!pb-16">
              <h2 className="apn-t2 display text-surface">A Boa Vista Brasília conta com uma equipe especializada de supervisão e montagem</h2>
            </div>
            <ApnVideo src="/apn/montagem.mp4" poster="/apn/montagem.jpg" titulo="Supervisão técnica da montagem" alt="Supervisor conferindo uma cozinha montada e fazendo anotações em um caderno" className="h-full portrait:w-full landscape:aspect-[9/16]" />
          </div>
        </Tela>

        {/* 11. Onde você se vê (slide 13) */}
        <Tela nome="Onde você se vê daqui a 10 anos?">
          <div className="absolute inset-0 landscape:left-1/2">
            <Fundo foto={f("dez-anos", 1080, 1350, "Cozinha clara com uma pessoa em movimento, vista do corredor")} foco="50% 60%" />
          </div>
          <div aria-hidden className="absolute inset-0 bg-ink/60 landscape:hidden" />
          <div className="apn-margem relative flex h-full items-center landscape:w-1/2">
            <h2 className="apn-t0 display text-surface">Onde você se vê daqui a 10 anos?</h2>
          </div>
        </Tela>

        {/* 12. Solução completa (slide 14) */}
        <Tela nome="A solução completa para você" tom="claro">
          <div className="grid h-full portrait:grid-rows-[minmax(0,26%)_minmax(0,1fr)] landscape:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="relative overflow-hidden landscape:order-2">
              <Fundo foto={f("solucao", 2000, 1334, "Sala com adega de vidro e painéis de madeira do piso ao teto")} />
            </div>
            <Conteudo>
              <h2 className="apn-t1 display text-ink">A Boa Vista Brasília tem a solução completa para você!</h2>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 border-t border-line landscape:mt-6">
                {SOLUCOES.map((s) => (
                  <li key={s} className="border-b border-line py-2 text-[1rem] font-medium leading-snug tracking-[-0.01em] sm:text-[1.15rem]">
                    {s}
                  </li>
                ))}
              </ul>
            </Conteudo>
          </div>
        </Tela>

        {/* 13. Única empresa (slide 15) */}
        <Tela nome="100% sob medida">
          <div className="apn-margem flex h-full items-center">
            <h2 className="apn-t0 display max-w-[20ch] text-surface">A única empresa do Brasil 100% sob medida com alta tecnologia de fabricação totalmente automatizada</h2>
          </div>
        </Tela>

        {/* 14 a 35. Clientes e projetos (slides 16 a 37) */}
        {GALERIA.map(({ foto, par, claro }) => (
          <Tela key={foto.src} nome={foto.alt} tom={claro ? "branco" : "escuro"}>
            {par ? (
              <>
                <div className="relative hidden h-full landscape:block">
                  <Image src={foto.src} alt={foto.alt} fill sizes="100vw" className="object-cover" />
                </div>
                <div className="grid h-full grid-rows-2 gap-1 landscape:hidden">
                  {par.map((p) => (
                    <div key={p.src} className="relative overflow-hidden">
                      <Image src={p.src} alt={p.alt} fill sizes="100vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="apn-pan absolute inset-0 overflow-hidden">
                <Image src={foto.src} alt={foto.alt} width={foto.width} height={foto.height} sizes="(orientation: portrait) 240vh, 100vw" className="apn-pan-foto" />
              </div>
            )}
          </Tela>
        ))}

        {/* 36. Proposta (slide 38) */}
        <Tela nome="Proposta" tom="claro">
          <div className="apn-margem flex h-full flex-col justify-center">
            <ApnPropostaCapa />
          </div>
        </Tela>

        {/* 37. Ambientes e valores (slide 39) */}
        <Tela nome="Ambientes da proposta" tom="claro">
          <div data-rolagem-interna className="apn-rolagem apn-margem h-full">
            <ApnPropostaTabela />
          </div>
        </Tela>

        {/* 38. Agradecimento (slide 40) */}
        <Tela nome="Agradecimento">
          <div className="absolute inset-0">
            <Fundo foto={f("obrigado", 2200, 1467, "Cozinha bege com uma pessoa em movimento junto à bancada")} foco="70% 50%" />
          </div>
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgb(32_30_30/0.95),rgb(32_30_30/0.45)_70%,rgb(32_30_30/0.6))]" />
          <div data-rolagem-interna className="apn-rolagem relative h-full">
            <div className="apn-margem flex min-h-full flex-col justify-between gap-8">
              <Image src={siteConfig.logoLight.src} alt="Boa Vista Brasília" width={siteConfig.logoLight.width} height={siteConfig.logoLight.height} unoptimized className="apn-logo h-11 w-auto self-start sm:h-14" />
              <div>
                <h2 className="apn-t0 display max-w-[18ch] text-surface">Obrigada pela oportunidade de poder transformar seu sonho em realidade!</h2>
                <div className="mt-7">
                  <ApnContatoFinal />
                </div>
              </div>
              <p className="flex flex-wrap gap-x-4 gap-y-1 text-[0.85rem] text-surface/70">
                <Link href="/" className="inline-flex min-h-8 items-center underline-offset-4 hover:underline">Site</Link>
                <Link href="/politica-de-privacidade" className="inline-flex min-h-8 items-center underline-offset-4 hover:underline">Privacidade</Link>
                <Link href="/politica-de-cookies" className="inline-flex min-h-8 items-center underline-offset-4 hover:underline">Cookies</Link>
                <Link href="/termos-de-uso" className="inline-flex min-h-8 items-center underline-offset-4 hover:underline">Termos</Link>
                <span className="inline-flex min-h-8 items-center">
                  Desenvolvido por:&nbsp;
                  <a href="https://www.outboxgroup.com.br" target="_blank" rel="noopener" className="underline underline-offset-4">OutBox Soluções Digitais</a>
                </span>
              </p>
            </div>
          </div>
        </Tela>
      </ApnDeck>
    </>
  );
}
