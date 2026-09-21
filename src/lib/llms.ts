import "server-only";
import { absoluteUrl } from "@/lib/env";
import { projects } from "@/content/ambientes";
import type { PostSummary } from "@/lib/outbox";
import { siteConfig } from "@/site.config";

/** llms.txt de reserva (quando o CMS não responde), montado com o site.config.ts. */
export function fallbackLlms(posts: PostSummary[], full: boolean): string {
  const c = siteConfig.contact;
  const a = c.address;
  const lines: string[] = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    siteConfig.tagline,
    "",
    "## Contato",
    "",
    c.phone ? `- Telefone: ${c.phone}` : "",
    c.whatsapp ? `- WhatsApp: https://wa.me/${c.whatsapp.replace(/\D/g, "")}` : "",
    c.email ? `- E-mail: ${c.email}` : "",
    a.street ? `- Endereço: ${a.street}, ${a.neighborhood ? `${a.neighborhood}, ` : ""}${a.city}/${a.state}` : "",
    c.hours ? `- Horário: ${c.hours}` : "",
    c.areaServed ? `- Região atendida: ${c.areaServed}` : "",
    "",
    "## Páginas",
    "",
    `- [Início](${absoluteUrl("/")}): ${siteConfig.tagline}`,
    `- [Serviços](${absoluteUrl("/servicos")}): ${siteConfig.services.map((s) => s.title).join(", ")}`,
    `- [Sobre](${absoluteUrl("/sobre")}): ${siteConfig.about.headline}`,
    `- [Contato](${absoluteUrl("/contato")}): canais de atendimento`,
    `- [Ambientes](${absoluteUrl("/projetos")}): ${projects.map((p) => p.title).join(", ")}`,
    `- [Blog](${absoluteUrl("/blog")}): ${siteConfig.blog.description}`,
    ...projects.map((p) => `- [${p.title}](${absoluteUrl(`/projetos/${p.slug}`)}): ${p.summary}`),
    "",
    "## Regiões atendidas",
    "",
    ...c.regions.map((r) => `- ${r}`),
    "",
    "## Perguntas frequentes",
    "",
    ...siteConfig.faq.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  ];
  if (full) {
    lines.push("", "## Serviços", "");
    for (const s of siteConfig.services) lines.push(`### ${s.title}`, "", s.description, "");
    lines.push("## Sobre", "", ...siteConfig.about.paragraphs.flatMap((p) => [p, ""]));
    lines.push("## Como o projeto acontece", "");
    for (const s of siteConfig.process) lines.push(`### ${s.title}`, "", s.text, "");
  }
  if (posts.length) {
    lines.push("", "## Artigos", "");
    for (const p of posts) {
      const summary = (full ? (p.answerSummary ?? p.excerpt) : p.excerpt).replace(/\s+/g, " ").trim();
      lines.push(`- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)})${summary ? `: ${summary}` : ""}`);
    }
  }
  return `${lines.filter((l, i, arr) => !(l === "" && arr[i - 1] === "")).join("\n").trim()}\n`;
}
