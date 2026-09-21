"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { GalleryCategory, GalleryItem } from "@/content/ambientes";
import { ArrowIcon } from "./icons";
import { Lightbox } from "./Lightbox";

/**
 * Galeria em faixa: as fotos ficam lado a lado na horizontal, com a mesma altura e
 * larguras diferentes (cada foto mantém a proporção dela). Arraste no celular, setas
 * no computador, e o filtro é uma linha de texto, não um monte de botões.
 */
export function Gallery({ items, categories }: { items: GalleryItem[]; categories: readonly GalleryCategory[] }) {
  const [filter, setFilter] = useState<GalleryCategory | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const strip = useRef<HTMLUListElement>(null);

  const visible = useMemo(() => (filter ? items.filter((i) => i.category === filter) : items), [filter, items]);

  function slide(dir: 1 | -1) {
    const el = strip.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 760), behavior: "smooth" });
  }

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-6 border-t border-white/20 pt-6">
        <div role="group" aria-label="Filtrar fotos por ambiente" className="snap-row -mx-4 flex gap-x-6 gap-y-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {[null, ...categories].map((c) => {
            const active = filter === c;
            return (
              <button
                key={c ?? "todos"}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setFilter(c);
                  strip.current?.scrollTo({ left: 0 });
                }}
                className={`min-h-11 shrink-0 cursor-pointer text-[0.98rem] underline-offset-[6px] transition-colors duration-300 ${
                  active ? "text-surface underline decoration-surface" : "text-surface/55 hover:text-surface"
                }`}
              >
                {c ?? "Todos"}
              </button>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => slide(-1)}
            aria-label="Ver fotos anteriores"
            className="grid size-12 cursor-pointer place-items-center rounded-full border border-white/25 text-surface transition-colors duration-300 hover:bg-surface hover:text-ink"
          >
            <ArrowIcon width={20} height={20} className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => slide(1)}
            aria-label="Ver próximas fotos"
            className="grid size-12 cursor-pointer place-items-center rounded-full border border-white/25 text-surface transition-colors duration-300 hover:bg-surface hover:text-ink"
          >
            <ArrowIcon width={20} height={20} />
          </button>
        </div>
      </div>

      <ul
        ref={strip}
        data-lenis-prevent
        className="snap-row -mx-4 mt-10 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:gap-4 sm:px-6 lg:-mx-8 lg:px-8"
      >
        {visible.map((img, i) => (
          <li
            key={`${filter ?? "todos"}-${img.src}`}
            className="h-[62vw] max-h-[560px] min-h-[300px] shrink-0 animate-[gallery-in_0.7s_ease_both] sm:h-[460px] lg:h-[560px]"
            style={{ animationDelay: `${Math.min(i, 8) * 45}ms`, aspectRatio: `${img.width} / ${img.height}` }}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="zoom-media group relative block size-full cursor-zoom-in overflow-hidden bg-white/5"
              aria-label={`Ampliar: ${img.alt}`}
            >
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 50vw, 85vw" className="object-cover" />
              <span aria-hidden className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgb(32_30_30/0.8),transparent)] px-5 pb-4 pt-12 text-left text-[0.95rem] text-surface opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                {img.project.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-surface/55 sm:hidden">Arraste para o lado para ver mais fotos.</p>

      <Lightbox items={visible} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
    </>
  );
}
