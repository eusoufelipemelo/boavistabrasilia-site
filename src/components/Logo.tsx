import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/site.config";

/**
 * Logo original do cliente (arquivo da marca em /public/marca, sem redesenho).
 * Duas versões: grafite para fundo claro e branca para foto e rodapé. As duas ficam
 * sobrepostas e trocam com transição, para o cabeçalho passar de transparente a sólido.
 */
export function Logo({ light = false, className = "h-8 w-auto sm:h-9" }: { light?: boolean; className?: string }) {
  const { name, logo, logoLight } = siteConfig;
  return (
    <Link href="/" className="relative inline-flex shrink-0 items-center rounded-sm" aria-label={`${name}, página inicial`}>
      <Image
        src={logo.src}
        alt=""
        width={logo.width}
        height={logo.height}
        unoptimized
        loading="eager"
        className={`${className} transition-opacity duration-500 ${light ? "opacity-0" : "opacity-100"}`}
      />
      <Image
        src={logoLight.src}
        alt=""
        width={logoLight.width}
        height={logoLight.height}
        unoptimized
        loading="eager"
        className={`absolute inset-0 ${className} transition-opacity duration-500 ${light ? "opacity-100" : "opacity-0"}`}
      />
    </Link>
  );
}

/** Logo branco fixo (rodapé e outras áreas escuras). */
export function LogoLight({ className = "h-9 w-auto sm:h-10" }: { className?: string }) {
  const { name, logoLight } = siteConfig;
  return (
    <Link href="/" className="inline-flex shrink-0 items-center rounded-sm" aria-label={`${name}, página inicial`}>
      <Image src={logoLight.src} alt="" width={logoLight.width} height={logoLight.height} unoptimized className={className} />
    </Link>
  );
}
