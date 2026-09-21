"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Step = { title: string; text: string; image: { src: string; alt: string } };

/**
 * Etapas do atendimento: no computador, a foto fica parada de um lado e troca conforme
 * a etapa entra na tela; do outro lado, as etapas se acendem uma a uma.
 * No celular, cada etapa aparece com a sua foto logo abaixo do texto.
 * Sem JavaScript, tudo aparece na ordem (a foto de cada etapa é a do celular).
 */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const items = list.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        // a etapa mais próxima do meio da tela é a que manda na foto
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        const closest = visible.reduce((a, b) =>
          Math.abs(a.boundingClientRect.top - window.innerHeight / 2) < Math.abs(b.boundingClientRect.top - window.innerHeight / 2) ? a : b,
        );
        setActive(Number((closest.target as HTMLElement).dataset.step));
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, [steps.length]);

  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
      {/* foto que acompanha a etapa (só no computador) */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-[4/5] overflow-hidden bg-surface-alt">
            {steps.map((s, i) => (
              <Image
                key={s.image.src + i}
                src={s.image.src}
                alt={s.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 0px"
                className={`object-cover transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          <p className="mt-4 flex items-baseline gap-3 text-sm text-muted">
            <span className="tabular-nums text-ink">
              {String(active + 1).padStart(2, "0")}
              <span className="text-muted">/{String(steps.length).padStart(2, "0")}</span>
            </span>
            <span className="h-px flex-1 bg-line" />
            <span>{steps[active]?.title}</span>
          </p>
        </div>
      </div>

      <ol ref={list} className="lg:col-span-6 lg:col-start-7">
        {steps.map((s, i) => (
          <li
            key={s.title}
            data-step={i}
            className={`border-t border-line py-10 transition-opacity duration-500 first:border-t-0 first:pt-0 sm:py-14 lg:py-16 ${
              i === active ? "opacity-100" : "lg:opacity-45"
            }`}
          >
            <p className="text-sm tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</p>
            <h3 data-reveal="fade" className="display mt-2 text-[1.9rem] text-ink sm:text-[2.6rem]">
              {s.title}
            </h3>
            <p data-reveal="fade" className="mt-4 max-w-[52ch] leading-relaxed text-muted">
              {s.text}
            </p>
            {/* no celular a foto vem junto da etapa */}
            <div data-reveal="image" className="relative mt-6 aspect-[3/2] overflow-hidden bg-surface-alt lg:hidden">
              <Image src={s.image.src} alt={s.image.alt} fill sizes="92vw" className="object-cover" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
