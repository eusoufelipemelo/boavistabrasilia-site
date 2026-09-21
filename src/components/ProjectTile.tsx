import Image from "next/image";
import Link from "next/link";
import { coverOf, heroOf, type Project } from "@/content/ambientes";
import { ArrowIcon } from "./icons";

/**
 * Card de ambiente: a foto fica limpa, sem texto nem véu por cima, e o nome vem
 * abaixo dela, em tipografia grande. A lista do que o ambiente costuma incluir
 * aparece ao passar o mouse (e sempre no celular, onde não existe hover).
 */
export function ProjectTile({
  project,
  className = "",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw",
  wide = false,
  headingLevel: H = "h3",
}: {
  project: Project;
  className?: string;
  sizes?: string;
  /** Usa a foto horizontal do ambiente (cards largos). */
  wide?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const img = wide ? heroOf(project) : coverOf(project);
  return (
    <article className="group">
      <Link href={`/projetos/${project.slug}`} className="block">
        <span data-reveal="image" className={`zoom-media relative block overflow-hidden bg-surface-alt ${className}`}>
          <Image src={img.src} alt={img.alt} fill sizes={sizes} className="object-cover" />
        </span>
        <span className="mt-5 flex items-start justify-between gap-6">
          <span>
            <H className="display text-[1.6rem] text-ink sm:text-[1.9rem]">{project.title}</H>
            <span className="mt-2 block max-w-[38ch] text-[0.95rem] leading-relaxed text-muted">{project.rooms.slice(0, 3).join(", ")}</span>
          </span>
          <ArrowIcon
            width={22}
            height={22}
            className="mt-2 shrink-0 text-muted transition-transform duration-500 group-hover:translate-x-1.5 group-hover:text-ink"
          />
        </span>
      </Link>
    </article>
  );
}
