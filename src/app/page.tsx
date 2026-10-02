import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Container } from "@/components/Container";
import { Faq } from "@/components/Faq";
import { Gallery } from "@/components/Gallery";
import { HeroPicture } from "@/components/HeroPicture";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { LeadSection } from "@/components/LeadSection";
import { PostCard } from "@/components/PostCard";
import { AmbienceStrip } from "@/components/AmbienceStrip";
import { PartnersSection } from "@/components/PartnersSection";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ProjectTile } from "@/components/ProjectTile";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { SplitTitle } from "@/components/SplitTitle";
import { VideoPlayer } from "@/components/VideoPlayer";
import { galleryCategories, galleryItems, projectBySlug, projects } from "@/content/ambientes";
import { absoluteUrl } from "@/lib/env";
import { whatsappUrl } from "@/lib/format";
import { getPosts } from "@/lib/outbox";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const revalidate = 300;

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Móveis planejados de alto padrão em Brasília",
    description: siteConfig.description,
    path: "/",
  }),
  title: undefined, // a Home usa o title padrão do layout
};

/** Cabeçalho de seção: linha cheia, título à esquerda e o texto de apoio à direita. */
function SectionHead({
  title,
  text,
  id,
  action,
  dark = false,
}: {
  title: string;
  text?: string;
  id?: string;
  action?: { label: string; href: string };
  dark?: boolean;
}) {
  return (
    <div className={`border-t pt-8 sm:pt-10 ${dark ? "border-white/20" : "border-line"}`}>
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
        <SplitTitle
          id={id}
          text={title}
          className={`display text-[2.1rem] sm:text-[3rem] lg:col-span-6 lg:text-[3.4rem] ${dark ? "text-surface" : "text-ink"}`}
        />
        <div className="lg:col-span-5 lg:col-start-8 lg:pt-3">
          {text ? (
            <p data-reveal="fade" className={`max-w-[46ch] leading-relaxed ${dark ? "text-surface/75" : "text-muted"}`}>
              {text}
            </p>
          ) : null}
          {action ? (
            <Link
              href={action.href}
              data-reveal="fade"
              className={`link mt-5 inline-flex min-h-11 items-center gap-2 font-medium ${dark ? "text-surface" : "text-ink"}`}
            >
              {action.label}
              <ArrowIcon width={18} height={18} aria-hidden />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default async function HomePage() {
  const { posts } = await getPosts({ perPage: 3 });
  const c = siteConfig.contact;
  const h = siteConfig.home;
  const wa = whatsappUrl(c.whatsapp, c.whatsappMessage);

  return (
    <>
      {/* ---------------------------------------------------------------- topo */}
      <section data-hero className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-ink text-surface">
        <div className="hero-media absolute inset-0 -z-20">
          <HeroPicture
            desktop={{ src: "/fotos/hero-desktop-a.jpg", width: 2560, height: 1440 }}
            mobile={{ src: "/fotos/hero-mobile-a.jpg", width: 1050, height: 1400 }}
            alt="Gaveta de madeira aberta com a marca Boa Vista gravada na lateral, em um armário preto"
            high
          />
          {/* mesmo ângulo, foco no painel de madeira: entra uma vez depois que a página carrega */}
          <div className="hero-focus absolute inset-0">
            <HeroPicture
              desktop={{ src: "/fotos/hero-desktop-b.jpg", width: 2560, height: 1440 }}
              mobile={{ src: "/fotos/hero-mobile-b.jpg", width: 1050, height: 1400 }}
              alt=""
              eager={false}
            />
          </div>
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(32_30_30/0.92),rgb(32_30_30/0.25)_60%,rgb(32_30_30/0.5))]" />

        <Container className="pb-14 pt-36 sm:pb-20 lg:pb-24">
          <p data-reveal="fade" className="text-[0.95rem] text-surface/70">
            {h.heroSubtitle}
          </p>
          <SplitTitle as="h1" text={h.heroTitle} className="display mt-5 max-w-[15ch] text-[2.7rem] text-surface sm:text-[4.2rem] lg:text-[5.4rem]" delay={120} />
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <p data-reveal="fade" style={{ "--d": "260ms" } as CSSProperties} className="max-w-[52ch] leading-relaxed text-surface/85 lg:col-span-6">
              {h.heroText}
            </p>
            <div data-reveal="fade" style={{ "--d": "360ms" } as CSSProperties} className="flex flex-wrap gap-3 lg:col-span-5 lg:col-start-8">
              {wa ? (
                <a href={wa} target="_blank" rel="noopener" className="btn btn-inverse">
                  <WhatsAppIcon />
                  {h.primaryCta}
                </a>
              ) : null}
              <Link href="/projetos" className="btn btn-ghost-light">
                {h.secondaryCta}
              </Link>
            </div>
          </div>
        </Container>

        <span aria-hidden className="scroll-cue absolute bottom-0 left-4 h-16 w-px bg-surface/50 sm:left-6 lg:left-8" />
      </section>

      {/* ---------------------------------------------------- manifesto + vídeo */}
      <section aria-labelledby="manifesto" className="bg-ink pb-20 pt-16 text-surface sm:pb-28 sm:pt-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SplitTitle id="manifesto" text={h.manifestoTitle} className="display text-[2.2rem] text-surface sm:text-[3.2rem]" />
              <div className="mt-8 space-y-5">
                {h.manifestoText.map((p, i) => (
                  <p key={i} data-reveal="fade" style={{ "--d": `${i * 120}ms` } as CSSProperties} className="max-w-[58ch] leading-relaxed text-surface/80">
                    {p}
                  </p>
                ))}
              </div>

              <dl className="mt-12 grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-3">
                {siteConfig.facts.map((f) => (
                  <div key={f.value} data-reveal="fade" className="bg-ink p-6">
                    <dt className="display text-[1.5rem] text-surface">{f.value}</dt>
                    <dd className="mt-2 text-[0.95rem] leading-snug text-surface/65">{f.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <VideoPlayer
                {...siteConfig.videos.casacor}
                caption="Espaço Deca na CASACOR Brasília 2026, no projeto do arquiteto Jorge Zardo, com execução da Boa Vista Brasília."
                className="max-w-[420px] lg:ml-auto"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ serviços */}
      <section aria-labelledby="servicos" className="bg-surface py-20 sm:py-28">
        <Container>
          <SectionHead
            id="servicos"
            title="O que a gente faz"
            text="Quatro formas de trabalhar com a Boa Vista Brasília — do projeto feito na loja ao acompanhamento depois que o móvel já está montado."
            action={{ label: "Ver todos os serviços", href: "/servicos" }}
          />
          <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {siteConfig.services.map((s) => (
              <li key={s.title} className="flex flex-col">
                <div data-reveal="image" className="relative aspect-[4/3] overflow-hidden bg-surface-alt">
                  <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 640px) 45vw, 92vw" className="object-cover" />
                </div>
                <p data-reveal="fade" className="mt-6 text-[0.95rem] text-muted">
                  {s.scope}
                </p>
                <h3 data-reveal="fade" className="display mt-1.5 text-[1.7rem] text-ink sm:text-[2rem]">
                  {s.title}
                </h3>
                <p data-reveal="fade" className="mt-4 max-w-[52ch] leading-relaxed text-muted">
                  {s.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {s.includes.map((i) => (
                    <li key={i} data-reveal="fade" className="flex gap-3 text-[0.95rem] text-ink">
                      <CheckIcon width={18} height={18} className="mt-1 shrink-0 text-muted" />
                      {i}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------ ambientes */}
      <section aria-labelledby="ambientes" className="bg-surface-alt py-20 sm:py-28">
        <Container>
          <SectionHead
            id="ambientes"
            title="Ambientes que projetamos"
            text="Cada ambiente tem uma exigência diferente: a cozinha pede divisão interna, o banheiro pede material que aguente umidade, o closet começa pela sua roupa."
            action={{ label: "Ver todos os ambientes", href: "/projetos" }}
          />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {projects.map((p, i) => (
              <li key={p.slug} className={i === 0 ? "sm:col-span-2 sm:row-span-1" : ""}>
                <ProjectTile project={p} wide={i === 0} className={i === 0 ? "aspect-[16/10]" : "aspect-[4/5]"} sizes={i === 0 ? "(min-width: 640px) 66vw, 92vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* -------------------------------------------------------------- galeria */}
      <section aria-labelledby="galeria" className="bg-ink py-20 text-surface sm:py-28">
        <Container>
          <SectionHead
            id="galeria"
            dark
            title="Galeria"
            text="Ambientes executados com móveis Boa Vista, de cozinha a lavabo. Toque em uma foto para ver de perto."
          />
          <div className="mt-12">
            <Gallery items={galleryItems} categories={galleryCategories} />
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------- os sócios */}
      <PartnersSection />

      {/* ---------------------------------------------------------- atendimento */}
      <section aria-labelledby="etapas" className="bg-surface-alt py-20 sm:py-28">
        <Container>
          <SectionHead
            id="etapas"
            title="Como o projeto acontece"
            text="Seis etapas, na ordem em que você vai viver cada uma. Em todas elas existe alguém responsável por avisar o que vem depois."
          />
          <ProcessSteps steps={siteConfig.process} />
        </Container>
      </section>

      {/* respiro: marcenaria entre dois blocos de leitura */}
      <section aria-label="Ambientes executados pela Boa Vista Brasília" className="bg-surface-alt pb-20 sm:pb-28">
        <Container>
          <AmbienceStrip
            images={[
              projectBySlug("closet")!.images[2],
              projectBySlug("sala-e-home-theater")!.images[3],
              projectBySlug("cozinha")!.images[2],
            ]}
          />
        </Container>
      </section>

      {/* ----------------------------------------------------------- onde atende */}
      <section aria-labelledby="regioes" className="bg-surface py-20 sm:py-28">
        <Container>
          <SectionHead
            id="regioes"
            title="Onde atendemos"
            text="Atendemos clientes em todo o Brasil. São duas lojas: a de Brasília, no SIA, e a de Luís Eduardo Magalhães, na Bahia. O projeto começa pelo WhatsApp, de onde você estiver."
          />
          <div className="mt-14">
            <ServiceAreaMap stores={c.stores} whatsapp={c.whatsapp} regions={c.regions} />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ faq */}
      <section aria-labelledby="faq" className="bg-surface pb-20 sm:pb-28">
        <Container>
          <SectionHead id="faq" title="Perguntas frequentes" text="O que as pessoas perguntam antes de começar um projeto. Se a sua dúvida não estiver aqui, mande no WhatsApp." />
          <div className="mt-12">
            <Faq />
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------------- blog */}
      {posts.length ? (
        <section aria-labelledby="blog" className="bg-surface-alt py-20 sm:py-28">
          <Container>
            <SectionHead id="blog" title="No blog" text={siteConfig.blog.description} action={{ label: "Ver todos os artigos", href: "/blog" }} />
            <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.id}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {/* -------------------------------------------------------------- contato */}
      <LeadSection />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Ambientes projetados pela Boa Vista Brasília",
          itemListElement: projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.title,
            url: absoluteUrl(`/projetos/${p.slug}`),
          })),
        }}
      />
    </>
  );
}
