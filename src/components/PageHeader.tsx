import Image, { getImageProps } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Container } from "./Container";
import { SplitTitle } from "./SplitTitle";

/** Foto padrão do topo das páginas internas (ex.: blog). */
const DEFAULT_IMAGE = {
  src: "/fotos/topo-blog.jpg",
  alt: "Sala ampla com marcenaria clara, divisória vazada de madeira e cozinha integrada ao fundo",
};

/**
 * Topo das páginas internas: foto real em tela cheia, trilha, h1 animado e texto de apoio.
 * O cabeçalho do site fica transparente por cima (ver SiteNav).
 *
 * Com `mobile`, a página usa direção de arte: a foto deitada no computador e outra, em pé,
 * no celular — cada aparelho baixa só a sua. É o que evita cortar gente do enquadramento.
 */
export function PageHeader({
  title,
  intro,
  crumbs,
  children,
  image = DEFAULT_IMAGE,
  mobile,
  position = "50% 50%",
  mobilePosition = "50% 50%",
}: {
  title: string;
  intro?: string;
  crumbs: Crumb[];
  children?: ReactNode;
  image?: { src: string; alt: string; width?: number; height?: number };
  /** Versão em pé, usada no celular e no tablet (mesma cena, outro enquadramento). */
  mobile?: { src: string; width: number; height: number };
  /** object-position da foto no computador. */
  position?: string;
  /** object-position da foto no celular e no tablet. */
  mobilePosition?: string;
}) {
  return (
    <header data-hero className="relative isolate flex min-h-[68svh] items-end overflow-hidden bg-ink text-surface sm:min-h-[74svh]">
      <div className="hero-media absolute inset-0 -z-20">
        {mobile && image.width && image.height ? (
          <ArtDirectedImage
            desktop={{ src: image.src, width: image.width, height: image.height }}
            mobile={mobile}
            alt={image.alt}
            position={position}
            mobilePosition={mobilePosition}
          />
        ) : (
          <Image src={image.src} alt={image.alt} fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
        )}
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(32_30_30/0.9),rgb(32_30_30/0.35)_55%,rgb(32_30_30/0.5))]" />
      <Container className="pb-12 pt-36 sm:pb-16 lg:pb-20">
        <div data-reveal="fade">
          <Breadcrumbs items={crumbs} light />
        </div>
        <SplitTitle as="h1" text={title} className="display mt-6 max-w-4xl text-[2.5rem] text-surface sm:text-6xl lg:text-7xl" />
        {intro ? (
          <p data-reveal="fade" style={{ "--d": "250ms" } as CSSProperties} className="mt-6 max-w-2xl text-lg leading-relaxed text-surface/85">
            {intro}
          </p>
        ) : null}
        {children}
      </Container>
    </header>
  );
}

type Src = { src: string; width: number; height: number };

/** Mesma foto em dois enquadramentos; o navegador baixa só o que vai mostrar. */
function ArtDirectedImage({
  desktop,
  mobile,
  alt,
  position,
  mobilePosition,
}: {
  desktop: Src;
  mobile: Src;
  alt: string;
  position: string;
  mobilePosition: string;
}) {
  const common = { alt, sizes: "100vw", quality: 75, loading: "eager" as const, fetchPriority: "high" as const };
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, ...desktop });
  const {
    props: { srcSet: mobileSet, alt: imgAlt, ...rest },
  } = getImageProps({ ...common, ...mobile });
  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktopSet} />
      <source media="(max-width: 1023px)" srcSet={mobileSet} />
      {/* a posição do recorte muda entre celular e computador; a classe cuida disso */}
      <img
        alt={imgAlt}
        {...rest}
        className="absolute inset-0 size-full object-cover"
        style={{ "--pos": position, "--pos-mobile": mobilePosition, objectPosition: "var(--pos-active)" } as CSSProperties}
        data-art-directed
      />
    </picture>
  );
}
