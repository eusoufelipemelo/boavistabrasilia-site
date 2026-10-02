import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { ArrowIcon } from "./icons";
import { SplitTitle } from "./SplitTitle";
import { siteConfig } from "@/site.config";

/**
 * Os três sócios, com o mesmo peso.
 *
 * Os retratos entram como uma faixa de fotos, sem legenda individual: o cliente ainda
 * não confirmou quem é quem nas imagens, então nome nenhum é colado a um rosto.
 * Quem faz o quê aparece logo abaixo, em linhas de leitura, sem ligação com a ordem das fotos.
 */
export function PartnersSection({ withLink = true }: { withLink?: boolean }) {
  const a = siteConfig.about;

  return (
    <section aria-labelledby="socios" className="bg-surface py-20 sm:py-28">
      <Container>
        <div className="border-t border-line pt-8 sm:pt-10">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
            <SplitTitle
              id="socios"
              text="Uma loja conduzida pelos donos"
              className="display text-[2.1rem] text-ink sm:text-[3rem] lg:col-span-6 lg:text-[3.4rem]"
            />
            <div className="lg:col-span-5 lg:col-start-8 lg:pt-3">
              <p data-reveal="fade" className="max-w-[46ch] leading-relaxed text-muted">
                Giovanna, Maikel e Thais assumiram a loja juntos e continuam no atendimento. Cada área tem um sócio responsável — e é com ele que você
                fala, do orçamento à montagem.
              </p>
            </div>
          </div>
        </div>

        {/* faixa discreta: os três trabalhando e os três retratos, sem legenda individual */}
        <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-6">
          <div data-reveal="image" className="relative col-span-3 h-[200px] overflow-hidden bg-surface-alt sm:h-[280px] lg:h-[240px]">
            <Image
              src="/fotos/socios-projeto.jpg"
              alt="Os três sócios da Boa Vista Brasília analisando um projeto juntos, com o horizonte de Brasília ao fundo"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 38%" }}
            />
          </div>
          {a.portraits.map((src) => (
            <div key={src} data-reveal="image" className="relative h-[150px] overflow-hidden bg-surface-alt sm:h-[220px] lg:h-[240px]">
              <Image src={src} alt="Sócio da Boa Vista Brasília no showroom" fill sizes="(min-width: 1024px) 16vw, 31vw" className="object-cover" />
            </div>
          ))}
        </div>
        <p className="legenda mt-4 max-w-[64ch]">Os três sócios da Boa Vista Brasília. As fotos não estão identificadas uma a uma.</p>

        {/* quem faz o quê: linhas de leitura, sem relação com a ordem das fotos */}
        <ul className="mt-14 border-t border-line">
          {a.partners.map((p) => (
            <li key={p.name} data-reveal="fade" className="grid gap-2 border-b border-line py-7 sm:grid-cols-12 sm:gap-8">
              <p className="display text-[1.6rem] text-ink sm:col-span-3 sm:text-[1.9rem]">{p.name}</p>
              <p className="text-[0.95rem] leading-snug text-muted sm:col-span-3 sm:pt-2">{p.role}</p>
              <p className="max-w-[52ch] leading-relaxed text-ink sm:col-span-6 sm:pt-1">{p.does}</p>
            </li>
          ))}
        </ul>

        {withLink ? (
          <Link href="/sobre" data-reveal="fade" className="link mt-10 inline-flex min-h-11 items-center gap-2 font-medium text-ink">
            Conhecer a história da loja
            <ArrowIcon width={18} height={18} aria-hidden />
          </Link>
        ) : null}
      </Container>
    </section>
  );
}
