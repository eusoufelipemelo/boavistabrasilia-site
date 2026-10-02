import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { CtaBlock } from "@/components/CtaBlock";
import { JsonLd } from "@/components/JsonLd";
import { LeadSection } from "@/components/LeadSection";
import { PageHeader } from "@/components/PageHeader";
import { AmbienceStrip } from "@/components/AmbienceStrip";
import { PartnersSection } from "@/components/PartnersSection";
import { SplitTitle } from "@/components/SplitTitle";
import { YouTubeFacade } from "@/components/VideoPlayer";
import { absoluteUrl } from "@/lib/env";
import { organizationId } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { projectBySlug } from "@/content/ambientes";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata({
  title: "Sobre a Boa Vista Brasília",
  description:
    "Três sócios assumiram a loja Boa Vista de Brasília em janeiro de 2026. Conheça o jeito de trabalhar: processo definido, acompanhamento próximo e 10 anos de garantia.",
  path: "/sobre",
  image: "/og/sobre.jpg",
});

export default function AboutPage() {
  const a = siteConfig.about;

  return (
    <>
      <PageHeader
        title={a.headline}
        intro="A loja existe há cinco anos em Brasília. A administração é nova, e com ela veio um jeito diferente de conduzir cada projeto."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Sobre", path: "/sobre" },
        ]}
        image={{ src: "/fotos/socios-sofa.jpg", alt: "Os três sócios da Boa Vista Brasília sentados juntos diante de uma janela ampla" }}
        position="50% 35%"
      />

      {/* história */}
      <section aria-labelledby="historia" className="bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SplitTitle id="historia" text="Como a loja chegou até aqui" className="display text-[2.1rem] text-ink sm:text-[3rem]" />
              <div className="mt-8 space-y-6">
                {a.paragraphs.map((p, i) => (
                  <p key={i} data-reveal="fade" className="max-w-[62ch] text-[1.08rem] leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <div data-reveal="image" className="relative aspect-[4/5] overflow-hidden bg-surface-alt">
                <Image
                  src="/fotos/socios-sofa.jpg"
                  alt="Os três sócios da Boa Vista Brasília sentados juntos diante de uma janela ampla"
                  fill
                  sizes="(min-width: 1024px) 32vw, 92vw"
                  className="object-cover"
                />
              </div>
              <p className="legenda mt-4">Giovanna, Maikel e Thais assumiram a loja de Brasília em janeiro de 2026.</p>
              <p className="mt-6 text-[0.95rem] text-muted">{siteConfig.group}.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* princípios */}
      <section aria-labelledby="principios" className="bg-surface-alt py-20 sm:py-28">
        <Container>
          <SplitTitle id="principios" text="O que orienta o trabalho" className="display text-[2.1rem] text-ink sm:text-[3rem]" />
          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "O produto é obrigação",
                text: "Maquinário alemão, projeto 100% editável e 10 anos de garantia vêm da fábrica. Isso é o mínimo que você deve esperar, não um diferencial.",
              },
              {
                title: "Cada etapa tem um responsável",
                text: "Projeto, conferência, produção, entrega e montagem têm alguém encarregado. Você nunca precisa descobrir sozinho em que ponto o pedido está.",
              },
              {
                title: "Prazo combinado é prazo cumprido",
                text: "A data é definida junto com você e com a obra. Se algo mudar, o aviso vem de nós antes de você perguntar.",
              },
              {
                title: "Atendimento que continua depois",
                text: "Quem vendeu continua respondendo. A conversa não muda de canal quando o móvel já está montado.",
              },
              {
                title: "Arquiteto é parceiro, não concorrente",
                text: "Quando o projeto vem de um arquiteto, a nossa função é executar o desenho dele com precisão e manter o diálogo aberto durante a obra.",
              },
              {
                title: "Alto padrão é no detalhe",
                text: "Ferragem, divisória interna, iluminação, alinhamento de portas. É onde a diferença aparece todo dia, muito depois da instalação.",
              },
            ].map((p) => (
              <li key={p.title} data-reveal="fade" className="border-t border-line pt-6">
                <h3 className="text-[1.2rem] font-medium tracking-[-0.02em] text-ink">{p.title}</h3>
                <p className="mt-3 max-w-[46ch] leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* respiro: ambientes executados */}
      <section aria-label="Ambientes executados pela Boa Vista Brasília" className="bg-surface pt-20 sm:pt-28">
        <Container>
          <AmbienceStrip
            images={[
              projectBySlug("dormitorio")!.images[1],
              projectBySlug("home-office")!.images[1],
              projectBySlug("banheiro-e-lavabo")!.images[0],
            ]}
          />
        </Container>
      </section>

      {/* os três sócios, com o mesmo peso */}
      <PartnersSection withLink={false} />

      {/* CASACOR + conversa com o arquiteto */}
      <section aria-labelledby="casacor" className="bg-ink py-20 text-surface sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <SplitTitle id="casacor" text="A marcenaria da CASACOR Brasília 2026" className="display text-[2.1rem] text-surface sm:text-[3rem]" />
              <p data-reveal="fade" className="mt-7 max-w-[54ch] leading-relaxed text-surface/80">
                A Boa Vista executou a marcenaria do Espaço Deca na CASACOR Brasília 2026, no projeto do arquiteto Jorge Zardo. Uma mostra é o lugar
                onde o acabamento fica exposto de perto, com o visitante abrindo cada gaveta.
              </p>
              <p data-reveal="fade" className="mt-4 max-w-[54ch] leading-relaxed text-surface/80">
                No vídeo, o arquiteto conta como foi trabalhar com a equipe, do desenho à montagem no prazo da mostra.
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <YouTubeFacade {...siteConfig.videos.conversa} className="max-w-[420px] lg:ml-auto" />
              <p className="legenda legenda-on-dark mt-4 max-w-[38ch] lg:ml-auto">O vídeo abre no player do YouTube depois do seu toque.</p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-20 sm:py-28">
        <CtaBlock title="Quer conhecer a loja?" text="Agende uma visita ao showroom no SIA ou comece a conversa pelo WhatsApp. Se preferir, a gente vai até o seu imóvel para medir." />
      </Container>

      <LeadSection />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: absoluteUrl("/sobre"),
          name: `Sobre a ${siteConfig.name}`,
          description: siteConfig.description,
          about: { "@id": organizationId() },
          mainEntity: {
            "@type": "ItemList",
            name: `Sócios da ${siteConfig.name}`,
            itemListElement: a.partners.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: { "@type": "Person", name: p.name, jobTitle: p.role, description: p.does, worksFor: { "@id": organizationId() } },
            })),
          },
        }}
      />
    </>
  );
}
