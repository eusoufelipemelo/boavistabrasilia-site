import Image from "next/image";
import type { ProjectImage } from "@/content/ambientes";

/**
 * Respiro visual: três fotos de ambiente em alturas diferentes, sem texto por cima.
 * Serve para o site mostrar marcenaria entre um bloco de leitura e outro.
 */
export function AmbienceStrip({ images }: { images: ProjectImage[] }) {
  return (
    <div aria-hidden={false} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
      {images.slice(0, 3).map((img, i) => (
        <figure
          key={img.src}
          data-reveal="image"
          className={`relative overflow-hidden bg-surface-alt ${
            i === 0
              ? "col-span-2 h-[240px] sm:h-[340px] lg:col-span-5 lg:h-[420px]"
              : i === 1
                ? "h-[180px] sm:h-[260px] lg:col-span-4 lg:mt-10 lg:h-[420px]"
                : "h-[180px] sm:h-[260px] lg:col-span-3 lg:mt-20 lg:h-[420px]"
          }`}
        >
          <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 35vw, 50vw" className="object-cover" />
        </figure>
      ))}
    </div>
  );
}
