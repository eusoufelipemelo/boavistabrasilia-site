import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { LeadSection } from "@/components/LeadSection";
import { PageHeader } from "@/components/PageHeader";
import { ProjectTile } from "@/components/ProjectTile";
import { projects } from "@/content/ambientes";
import { absoluteUrl } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";

const intro =
  "Cozinha, closet, dormitório, home office, sala e banheiro. Cada ambiente com a exigência que ele tem: divisão interna, material, iluminação e medida conferida na obra.";

export const metadata: Metadata = pageMetadata({
  title: "Ambientes planejados em Brasília",
  description:
    "Cozinhas, closets, dormitórios, home offices, salas e banheiros planejados sob medida em Brasília, com projeto 100% editável e 10 anos de garantia.",
  path: "/projetos",
  image: "/og/projetos.jpg",
});

/** Grade alinhada: duas linhas de três, com alturas iguais dentro de cada linha. */
const layout = ["lg:h-[560px]", "lg:h-[560px]", "lg:h-[560px]", "lg:h-[480px]", "lg:h-[480px]", "lg:h-[480px]"];

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Ambientes"
        intro={intro}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Ambientes", path: "/projetos" },
        ]}
        image={{ src: "/fotos/cozinha-madeira.jpg", alt: "Cozinha com marcenaria amadeirada, bancada preta e torneira escura" }}
        position="50% 40%"
      />

      <div className="bg-surface py-20 sm:py-28">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <ProjectTile
                  project={p}
                  headingLevel="h2"
                  className={`aspect-[4/5] ${layout[i] ?? "lg:h-[480px]"} lg:aspect-auto`}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
                />
              </li>
            ))}
          </ul>

          <p className="legenda mt-12 max-w-[60ch]">
            As fotos de ambiente são ilustrativas, de banco de imagens, e mostram o tipo de solução que a Boa Vista Brasília projeta. As fotos dos
            projetos entregues entram aqui assim que a loja fizer o registro deles.
          </p>
        </Container>
      </div>

      <LeadSection />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          url: absoluteUrl("/projetos"),
          name: "Ambientes planejados pela Boa Vista Brasília",
          itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/projetos/${p.slug}`), name: p.title })),
        }}
      />
    </>
  );
}
