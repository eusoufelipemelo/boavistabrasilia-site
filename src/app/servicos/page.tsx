import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { CtaBlock } from "@/components/CtaBlock";
import { Faq } from "@/components/Faq";
import { CheckIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { LeadSection } from "@/components/LeadSection";
import { PageHeader } from "@/components/PageHeader";
import { SplitTitle } from "@/components/SplitTitle";
import { VideoPlayer } from "@/components/VideoPlayer";
import { absoluteUrl } from "@/lib/env";
import { organizationId } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const intro =
  "Da primeira conversa ao ajuste depois da montagem. Você contrata a Boa Vista Brasília para desenhar o ambiente, para executar o projeto do seu arquiteto ou para atender um empreendimento inteiro.";

export const metadata: Metadata = pageMetadata({
  title: "Serviços: móveis planejados, projeto e montagem em Brasília",
  description:
    "Projeto e móveis planejados sob medida, execução do projeto do seu arquiteto, atendimento a construtoras e pós-entrega com 10 anos de garantia, em Brasília.",
  path: "/servicos",
  image: "/og/servicos.jpg",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Serviços"
        intro={intro}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
        ]}
        image={{ src: "/fotos/gaveta-mao.jpg", alt: "Mão fechando uma gaveta com interior de madeira em um armário preto" }}
        position="50% 45%"
      />

      <div className="bg-surface py-20 sm:py-28">
        <Container>
          <ul className="space-y-24 sm:space-y-32">
            {siteConfig.services.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={s.title} id={`servico-${i + 1}`} className="grid scroll-mt-28 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
                  <div data-reveal="image" className={`relative aspect-[4/3] overflow-hidden bg-surface-alt lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
                    <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1024px) 48vw, 92vw" className="object-cover" />
                  </div>
                  <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                    <p data-reveal="fade" className="text-[0.95rem] text-muted">
                      {s.scope}
                    </p>
                    <SplitTitle text={s.title} as="h2" className="display mt-2 text-[2rem] text-ink sm:text-[2.6rem]" />
                    <p data-reveal="fade" className="mt-6 max-w-[54ch] leading-relaxed text-muted">
                      {s.description}
                    </p>
                    <p data-reveal="fade" className="mt-4 max-w-[54ch] leading-relaxed text-ink">
                      {s.forWhom}
                    </p>
                    <ul className="mt-8 border-t border-line">
                      {s.includes.map((item) => (
                        <li key={item} data-reveal="fade" className="flex gap-3 border-b border-line py-4 text-[0.98rem] text-ink">
                          <CheckIcon width={18} height={18} className="mt-1 shrink-0 text-muted" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </div>

      {/* Vídeo dos detalhes: o segundo vídeo do cliente, junto do assunto "o que vai por dentro". */}
      <section aria-labelledby="detalhes" className="bg-ink py-20 text-surface sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <SplitTitle id="detalhes" text="O que ninguém vê é o que você usa todo dia" className="display text-[2.1rem] text-surface sm:text-[3rem]" />
              <p data-reveal="fade" className="mt-7 max-w-[54ch] leading-relaxed text-surface/80">
                Divisória de talheres, porta-temperos, adega, gaveta com freio, iluminação que acende ao abrir. É a parte do móvel que aparece pouco na
                foto e que decide se a cozinha funciona.
              </p>
              <p data-reveal="fade" className="mt-4 max-w-[54ch] leading-relaxed text-surface/80">
                No vídeo ao lado, gravado na CASACOR Brasília 2026, cada gaveta é aberta uma a uma.
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <VideoPlayer {...siteConfig.videos.detalhes} caption="Gravado no espaço da Boa Vista Brasília na CASACOR Brasília 2026." className="max-w-[420px] lg:ml-auto" />
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="faq-servicos" className="bg-surface py-20 sm:py-28">
        <Container>
          <SplitTitle id="faq-servicos" text="Perguntas frequentes" className="display text-[2.1rem] text-ink sm:text-[3rem]" />
          <div className="mt-12">
            <Faq />
          </div>
        </Container>
      </section>

      <Container className="pb-20 sm:pb-28">
        <CtaBlock />
      </Container>

      <LeadSection />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          url: absoluteUrl("/servicos"),
          name: "Serviços da Boa Vista Brasília",
          itemListElement: siteConfig.services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.title,
              description: s.description,
              areaServed: siteConfig.contact.areaServed,
              provider: { "@id": organizationId() },
            },
          })),
        }}
      />
    </>
  );
}
