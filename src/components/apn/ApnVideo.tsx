"use client";

import Image from "next/image";
import { useState } from "react";
import { PlayIcon } from "../icons";

/** Vídeo vertical: começa como foto e só baixa o arquivo quando a pessoa toca em assistir. */
export function ApnVideo({ src, poster, titulo, alt, className = "" }: { src: string; poster: string; titulo: string; alt: string; className?: string }) {
  const [tocando, setTocando] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      {tocando ? (
        <video src={src} poster={poster} controls autoPlay playsInline controlsList="nodownload" aria-label={titulo} className="absolute inset-0 size-full object-cover landscape:object-contain" />
      ) : (
        <button type="button" onClick={() => setTocando(true)} aria-label={`Assistir: ${titulo}`} className="group absolute inset-0 block w-full cursor-pointer">
          <Image src={poster} alt={alt} fill sizes="(orientation: portrait) 100vw, 40vw" className="object-cover" />
          <span aria-hidden className="absolute inset-0 grid place-items-center bg-ink/20 transition-colors duration-300 group-hover:bg-ink/5">
            <span className="grid size-20 place-items-center rounded-full bg-surface text-ink transition-transform duration-300 group-hover:scale-105">
              <PlayIcon width={28} height={28} />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
