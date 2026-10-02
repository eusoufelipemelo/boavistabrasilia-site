import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { LeadSection } from "@/components/LeadSection";
import { PageHeader } from "@/components/PageHeader";
import { ProjectGallery } from "@/components/ProjectGallery";
import { JsonLd } from "@/components/JsonLd";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { heroOf, projectBySlug, projects } from "@/content/ambientes";
import { absoluteUrl } from "@/lib/env";
import { truncate, whatsappUrl } from "@/lib/format";
import { organizationId } from "@/lib/jsonld";
import { siteConfig } from "@/site.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return { title: "Ambiente não encontrado", robots: { index: false } };
  const title = `${project.title} planejado em Brasília`;
  const description = truncate(project.summary, 158);
  const path = `/projetos/${project.slug}`;
  const og = absoluteUrl(`/og/projetos/${project.slug}.jpg`);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: og, width: 1200, height: 630, alt: project.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const heroImg = heroOf(project);
  const c = siteConfig.contact;
  const wa = whatsappUrl(c.whatsapp, `Olá! Quero conversar sobre um projeto de ${project.title.toLowerCase()} com a Boa Vista Brasília.`);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${project.title} planejado`,
          description: project.summary,
          url: absoluteUrl(`/projetos/${project.slug}`),
          provider: { "@id": organizationId() },
          areaServed: c.areaServed,
          serviceType: `Móveis planejados: ${project.title.toLowerCase()}`,
        }}
      />

      <PageHeader
        title={project.title}
        intro={project.summary}
        image={{ src: heroImg.src, alt: heroImg.alt }}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Ambientes", path: "/projetos" },
          { name: project.title, path: `/projetos/${project.slug}` },
        ]}
      />

      <section aria-label={`Sobre o ambiente ${project.title}`} className="bg-surface py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 className="display text-[1.8rem] text-ink sm:text-[2.4rem]">O que resolvemos aqui</h2>
            <ul className="mt-8 border-t border-line">
              {project.details.map((d) => (
                <li key={d.title} data-reveal="fade" className="border-b border-line py-6">
                  <h3 className="text-[1.15rem] font-medium tracking-[-0.02em] text-ink">{d.title}</h3>
                  <p className="mt-2 max-w-[58ch] leading-relaxed text-muted">{d.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="fade" className="lg:col-span-4 lg:col-start-9">
            <h2 className="text-sm font-semibold text-ink">Costuma incluir</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.rooms.map((r) => (
                <li key={r} className="rounded-full border border-line px-3.5 py-1.5 text-[0.95rem] text-ink">
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{project.place}.</p>
            {wa ? (
              <a href={wa} target="_blank" rel="noopener" className="btn btn-primary mt-7 w-full">
                <WhatsAppIcon />
                Quero um projeto assim
              </a>
            ) : null}
          </div>
        </Container>
      </section>

      <section aria-label={`Fotos de ${project.title.toLowerCase()}`} className="bg-surface">
        <Container>
          <ProjectGallery images={project.images} />
          <p className="legenda mt-8 max-w-[64ch]">Ambientes executados com móveis planejados Boa Vista.</p>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <Link href={`/projetos/${next.slug}`} className="group flex items-center justify-between gap-6 border-y border-line py-8">
          <span>
            <span className="block text-sm text-muted">Próximo ambiente</span>
            <span className="display mt-1 block text-[1.9rem] text-ink underline-offset-[8px] group-hover:underline sm:text-[2.4rem]">{next.title}</span>
          </span>
          <ArrowIcon width={30} height={30} className="shrink-0 text-ink transition-transform duration-500 group-hover:translate-x-1.5" />
        </Link>
      </Container>

      <LeadSection />
    </>
  );
}
