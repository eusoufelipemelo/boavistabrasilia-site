import { ClockIcon, MailIcon, PinIcon, WhatsAppIcon } from "./icons";
import { whatsappUrl } from "@/lib/format";
import { siteConfig } from "@/site.config";
import { Container } from "./Container";
import { LeadForm } from "./LeadForm";
import { SplitTitle } from "./SplitTitle";

/**
 * Seção de contato em grafite: o formulário ocupa a maior parte e, ao lado, ficam os
 * canais diretos (WhatsApp, e-mail, showroom, horário) para quem não quer preencher nada.
 */
export function LeadSection({ id = "solicite" }: { id?: string }) {
  const c = siteConfig.contact;
  const a = c.address;
  const wa = whatsappUrl(c.whatsapp, c.whatsappMessage);
  const row = "flex gap-4 border-t border-white/15 py-5";
  const icon = "mt-0.5 shrink-0 text-surface/45";

  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="on-dark scroll-mt-20 bg-ink py-20 text-surface sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SplitTitle id={`${id}-titulo`} text="Conte qual ambiente você quer resolver" className="display max-w-[16ch] text-[2.2rem] text-surface sm:text-[3rem]" />
            <p data-reveal="fade" className="mt-6 max-w-[54ch] leading-relaxed text-surface/75">
              Você preenche, o site monta a mensagem e abre o WhatsApp {c.phone} com tudo escrito. Nenhum dado fica guardado aqui.
            </p>
            <div data-reveal="fade" className="mt-10">
              <LeadForm whatsapp={c.whatsapp} regions={c.regions} tone="dark" />
            </div>
          </div>

          <aside aria-labelledby={`${id}-canais`} className="lg:col-span-4 lg:col-start-9">
            <h3 id={`${id}-canais`} className="text-[1.05rem] font-medium tracking-[-0.02em] text-surface">
              Prefere falar direto?
            </h3>
            <ul className="mt-5">
              {wa ? (
                <li className={row}>
                  <WhatsAppIcon className={icon} />
                  <span>
                    <span className="block text-sm text-surface/55">WhatsApp</span>
                    <a href={wa} target="_blank" rel="noopener" className="block text-[1.05rem] text-surface underline-offset-4 hover:underline">
                      {c.phone}
                    </a>
                  </span>
                </li>
              ) : null}
              {c.email ? (
                <li className={row}>
                  <MailIcon className={icon} />
                  <span className="min-w-0">
                    <span className="block text-sm text-surface/55">E-mail</span>
                    <a href={`mailto:${c.email}`} className="block break-all text-[1.05rem] text-surface underline-offset-4 hover:underline">
                      {c.email}
                    </a>
                  </span>
                </li>
              ) : null}
              <li className={row}>
                <PinIcon className={icon} />
                <span>
                  <span className="block text-sm text-surface/55">Showroom</span>
                  <a href={c.mapsUrl} target="_blank" rel="noopener" className="block text-[1.05rem] leading-snug text-surface underline-offset-4 hover:underline">
                    {a.street}
                  </a>
                  <span className="mt-1 block text-[0.95rem] text-surface/60">
                    {a.city} — {a.state}
                  </span>
                </span>
              </li>
              <li className={`${row} border-b border-white/15`}>
                <ClockIcon className={icon} />
                <span>
                  <span className="block text-sm text-surface/55">Atendimento</span>
                  <span className="block text-[1.05rem] leading-snug text-surface">{c.hours}</span>
                  <span className="mt-1 block text-[0.95rem] text-surface/60">{c.hoursNote}</span>
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </Container>
    </section>
  );
}
