"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { PlayIcon } from "./icons";

/**
 * Vídeo vertical do cliente, hospedado no próprio site. Começa como foto (o quadro do vídeo),
 * e só carrega o arquivo quando a pessoa toca em assistir — com som, porque o vídeo tem fala.
 */
export function VideoPlayer({
  src,
  poster,
  title,
  alt,
  caption,
  className = "",
}: {
  src: string;
  poster: string;
  title: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  return (
    <figure className={className}>
      <div className="relative aspect-[9/16] overflow-hidden bg-ink">
        {playing ? (
          <video ref={video} src={src} poster={poster} controls autoPlay playsInline controlsList="nodownload" className="size-full object-cover" aria-label={title}>
            Seu navegador não abre vídeo. <a href={src}>Baixe o arquivo</a> para assistir.
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="zoom-media group absolute inset-0 block w-full cursor-pointer"
            aria-label={`Assistir: ${title}`}
          >
            <Image src={poster} alt={alt} fill sizes="(min-width: 1024px) 420px, 80vw" className="object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
            <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgb(32_30_30/0.75),transparent_55%)]" />
            <span aria-hidden className="absolute inset-x-0 bottom-0 flex items-center gap-4 p-5 text-left sm:p-6">
              <span className="grid size-14 shrink-0 place-items-center rounded-full border border-white/50 text-white transition-colors duration-500 group-hover:border-white group-hover:bg-white group-hover:text-ink">
                <PlayIcon width={20} height={20} />
              </span>
              <span className="text-[1.05rem] font-medium leading-snug tracking-[-0.02em] text-white">{title}</span>
            </span>
          </button>
        )}
      </div>
      {caption ? <figcaption className="legenda legenda-on-dark mt-4">{caption}</figcaption> : null}
    </figure>
  );
}

/**
 * Vídeo do YouTube que só carrega o player (e os cookies do YouTube) depois do toque.
 * Até lá, é uma foto nossa com o botão de assistir.
 */
export function YouTubeFacade({
  youtubeId,
  poster,
  title,
  alt,
  caption,
  className = "",
}: {
  youtubeId: string;
  poster: string;
  title: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className={className}>
      <div className="relative aspect-[9/16] overflow-hidden bg-ink">
        {loaded ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <button type="button" onClick={() => setLoaded(true)} className="zoom-media group absolute inset-0 block w-full cursor-pointer" aria-label={`Assistir no YouTube: ${title}`}>
            <Image src={poster} alt={alt} fill sizes="(min-width: 1024px) 420px, 80vw" className="object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
            <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgb(32_30_30/0.75),transparent_55%)]" />
            <span aria-hidden className="absolute inset-x-0 bottom-0 flex items-center gap-4 p-5 text-left sm:p-6">
              <span className="grid size-14 shrink-0 place-items-center rounded-full border border-white/50 text-white transition-colors duration-500 group-hover:border-white group-hover:bg-white group-hover:text-ink">
                <PlayIcon width={20} height={20} />
              </span>
              <span className="text-[1.05rem] font-medium leading-snug tracking-[-0.02em] text-white">{title}</span>
            </span>
          </button>
        )}
      </div>
      {caption ? <figcaption className="legenda mt-4">{caption}</figcaption> : null}
    </figure>
  );
}
