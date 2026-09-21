import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { PageHeader } from "@/components/PageHeader";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { SplitTitle } from "@/components/SplitTitle";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { absoluteUrl } from "@/lib/env";
import { whatsappUrl } from "@/lib/format";
import { organizationId } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const intro = "Conte qual ambiente você quer resolver e em que região de Brasília ele fica. O atendimento continua pelo WhatsApp, no seu tempo.";

export const metadata: Metadata = pageMetadata({
  title: "Contato",
  description:
    "Fale com a Boa Vista Brasília pelo WhatsApp (61) 99669-4747, visite o showroom no SIA ou peça um orçamento de móveis planejados de alto padrão.",
  path: "/contato",
  image: "/og/contato.jpg",
});

export default function ContactPage() {
  const c = siteConfig.contact;
  const a = c.address;
  const wa = whatsappUrl(c.whatsapp, c.whatsappMessage);
  const instagram = siteConfig.social.find((s) => s.label === "Instagram");
  const row = "flex gap-4 border-b border-line py-5";
  const icon = "mt-0.5 shrink-0 text-muted";
  const label = "block text-sm text-muted";
  const value = "block text-[1.05rem] font-medium tracking-[-0.01em] text-ink";

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", url: absoluteUrl("/contato"), about: { "@id": organizationId() } }} />

      <PageHeader
        title="Vamos conversar sobre o seu ambiente"
        intro={intro}
        image={{ src: "/fotos/vista-brasilia.jpg", alt: "Sócio da Boa Vista Brasília sentado à mesa, com o horizonte de Brasília ao fundo" }}
        position="50% 55%"
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Contato", path: "/contato" },
        ]}
      />

      <section aria-labelledby="formulario" className="bg-surface py-20 sm:py-28">
        <Container className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SplitTitle id="formulario" text="Peça seu projeto" className="display text-[2.3rem] text-ink sm:text-[3.2rem]" />
            <p data-reveal="fade" className="mt-5 max-w-xl leading-relaxed text-muted">
              O formulário monta a mensagem e abre o WhatsApp no seu aparelho. Nenhum dado fica guardado neste site.
            </p>
            <div data-reveal="fade" className="mt-10">
              <LeadForm whatsapp={c.whatsapp} regions={c.regions} />
            </div>
          </div>

          <aside aria-labelledby="canais" className="lg:col-span-4 lg:col-start-9">
            <div className="bg-surface-alt p-7 sm:p-9 lg:sticky lg:top-28">
              <h2 id="canais" className="display text-[1.8rem] text-ink">
                Canais de atendimento
              </h2>
              <ul className="mt-5 border-t border-line">
                {wa ? (
                  <li className={row}>
                    <WhatsAppIcon className={icon} />
                    <span>
                      <span className={label}>WhatsApp</span>
                      <a href={wa} target="_blank" rel="noopener" className={`${value} link`}>
                        {c.phone}
                      </a>
                    </span>
                  </li>
                ) : null}
                {c.phone ? (
                  <li className={row}>
                    <PhoneIcon className={icon} />
                    <span>
                      <span className={label}>Telefone</span>
                      <a href={`tel:${c.phoneHref}`} className={`${value} link`}>
                        {c.phone}
                      </a>
                    </span>
                  </li>
                ) : null}
                {c.email ? (
                  <li className={row}>
                    <MailIcon className={icon} />
                    <span className="min-w-0">
                      <span className={label}>E-mail</span>
                      <a href={`mailto:${c.email}`} className={`${value} link break-all`}>
                        {c.email}
                      </a>
                    </span>
                  </li>
                ) : null}
                {instagram ? (
                  <li className={row}>
                    <svg aria-hidden width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={icon}>
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                    </svg>
                    <span className="min-w-0">
                      <span className={label}>Instagram</span>
                      <a href={instagram.href} target="_blank" rel="noopener me" className={`${value} link break-words`}>
                        @boavistabrasilia
                      </a>
                    </span>
                  </li>
                ) : null}
                <li className={row}>
                  <PinIcon className={icon} />
                  <span>
                    <span className={label}>Showroom</span>
                    <a href={c.mapsUrl} target="_blank" rel="noopener" className={`${value} link`}>
                      {a.street}
                    </a>
                    <span className="mt-1 block text-[0.95rem] text-muted">
                      {a.city} — {a.state}, {a.postalCode}
                    </span>
                  </span>
                </li>
                <li className="flex gap-4 py-5">
                  <ClockIcon className={icon} />
                  <span>
                    <span className={label}>Atendimento</span>
                    <span className={value}>{c.hours}</span>
                    <span className="mt-1 block text-[0.95rem] text-muted">{c.hoursNote}</span>
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="regioes" className="bg-surface-alt py-20 sm:py-28">
        <Container>
          <SplitTitle id="regioes" text="Onde atendemos" className="display text-[2.3rem] text-ink sm:text-[3.2rem]" />
          <p data-reveal="fade" className="mt-5 max-w-xl leading-relaxed text-muted">
            {c.areaServed}. Escolha a sua região no mapa para começar a conversa já dizendo onde você mora.
          </p>
          <div className="mt-12">
            <ServiceAreaMap regions={c.regionPoints} whatsapp={c.whatsapp} />
          </div>
        </Container>
      </section>
    </>
  );
}
