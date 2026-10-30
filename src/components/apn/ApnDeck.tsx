"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ChevronIcon, CloseIcon, MenuIcon, WhatsAppIcon } from "../icons";

export type Capitulo = { titulo: string; inicio: number };

/**
 * Trilho da apresentação: as telas ficam lado a lado e a rolagem anda para o lado.
 * - computador: a roda do mouse e o trackpad movem o trilho, que se acomoda na tela mais próxima;
 * - celular e tablet: deslize nativo com encaixe de tela em tela;
 * - teclado: setas, espaço, Home e End.
 * A trena do rodapé mostra onde a pessoa está e leva a qualquer tela.
 */
export function ApnDeck({ total, capitulos, whatsappHref, children }: { total: number; capitulos: Capitulo[]; whatsappHref: string; children: ReactNode }) {
  const trilho = useRef<HTMLDivElement>(null);
  const trena = useRef<HTMLDivElement>(null);
  const indice = useRef<HTMLDialogElement>(null);
  const alvo = useRef(0);
  const quadro = useRef(0);
  const espera = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const origem = useRef<number | null>(null);
  const [atual, setAtual] = useState(0);

  const semMovimento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animar = useCallback(() => {
    const el = trilho.current;
    if (!el || quadro.current) return;
    const passo = () => {
      const falta = alvo.current - el.scrollLeft;
      if (Math.abs(falta) < 0.6) {
        el.scrollLeft = alvo.current;
        quadro.current = 0;
        return;
      }
      el.scrollLeft += falta * 0.11;
      quadro.current = requestAnimationFrame(passo);
    };
    quadro.current = requestAnimationFrame(passo);
  }, []);

  const irPara = useCallback(
    (i: number) => {
      const el = trilho.current;
      if (!el) return;
      const destino = Math.max(0, Math.min(total - 1, i)) * el.clientWidth;
      if (semMovimento()) {
        el.scrollLeft = destino;
        return;
      }
      if (window.matchMedia("(pointer: coarse)").matches) {
        el.scrollTo({ left: destino, behavior: "smooth" });
        return;
      }
      alvo.current = destino;
      animar();
    },
    [animar, total],
  );

  // Posição: atualiza a trena sem passar pelo React e marca a tela ativa.
  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    const telas = Array.from(el.querySelectorAll<HTMLElement>("[data-tela]"));
    let ultima = -1;
    const atualizar = () => {
      const pos = el.scrollLeft / Math.max(1, el.clientWidth);
      trena.current?.style.setProperty("--pos", String(pos));
      const i = Math.round(pos);
      if (i === ultima) return;
      ultima = i;
      setAtual(i);
      telas.forEach((t, n) => t.toggleAttribute("data-ativa", n === i));
      el.querySelectorAll("video").forEach((v) => {
        if (!telas[i]?.contains(v)) v.pause();
      });
    };
    atualizar();
    el.addEventListener("scroll", atualizar, { passive: true });
    const aoRedimensionar = () => {
      el.scrollLeft = ultima * el.clientWidth;
      alvo.current = el.scrollLeft;
    };
    window.addEventListener("resize", aoRedimensionar);
    return () => {
      el.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, []);

  // Roda do mouse e trackpad no computador.
  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    const aoRolar = (e: WheelEvent) => {
      if (window.matchMedia("(pointer: coarse)").matches || e.ctrlKey) return;
      const interno = (e.target as HTMLElement).closest<HTMLElement>("[data-rolagem-interna]");
      const vertical = Math.abs(e.deltaY) >= Math.abs(e.deltaX);
      if (interno && vertical && interno.scrollHeight > interno.clientHeight + 1) {
        const noLimite = e.deltaY > 0 ? interno.scrollTop + interno.clientHeight >= interno.scrollHeight - 1 : interno.scrollTop <= 0;
        if (!noLimite) return;
      }
      e.preventDefault();
      const maximo = el.scrollWidth - el.clientWidth;
      if (!quadro.current) alvo.current = el.scrollLeft;
      if (origem.current === null) origem.current = Math.round(el.scrollLeft / el.clientWidth);
      alvo.current = Math.max(0, Math.min(maximo, alvo.current + (vertical ? e.deltaY : e.deltaX) * (e.deltaMode === 1 ? 32 : 1)));
      if (semMovimento()) el.scrollLeft = alvo.current;
      else animar();
      clearTimeout(espera.current);
      // Ao parar de rolar: basta um gesto curto (10% da tela) para seguir na direção dele.
      espera.current = setTimeout(() => {
        const inicio = origem.current ?? 0;
        origem.current = null;
        const andou = alvo.current / el.clientWidth - inicio;
        irPara(Math.abs(andou) < 0.1 ? inicio : inicio + Math.sign(andou) * Math.max(1, Math.round(Math.abs(andou))));
      }, 170);
    };
    el.addEventListener("wheel", aoRolar, { passive: false });
    return () => el.removeEventListener("wheel", aoRolar);
  }, [animar, irPara]);

  // Teclado.
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (indice.current?.open || t.closest("video, a, button, input")) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        if (t.closest("video, input")) return;
      }
      const el = trilho.current;
      if (!el) return;
      const i = Math.round(el.scrollLeft / el.clientWidth);
      const destino: Record<string, number> = { ArrowRight: i + 1, ArrowDown: i + 1, PageDown: i + 1, " ": i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, PageUp: i - 1, Home: 0, End: total - 1 };
      if (!(e.key in destino)) return;
      e.preventDefault();
      irPara(destino[e.key]);
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [irPara, total]);

  // A rolagem suave do site não atua aqui.
  useEffect(() => {
    window.__lenis?.stop();
    return () => {
      window.__lenis?.start();
      cancelAnimationFrame(quadro.current);
      clearTimeout(espera.current);
    };
  }, []);

  const capitulo = capitulos.reduce((c, k) => (k.inicio <= atual ? k : c), capitulos[0]);

  return (
    <div data-apn className="apn fixed inset-0 z-40 flex flex-col bg-ink">
      <div ref={trilho} data-lenis-prevent className="apn-trilho min-h-0 flex-1" tabIndex={-1}>
        {children}
      </div>

      <nav aria-label="Navegação da apresentação" className="apn-barra">
        <button type="button" onClick={() => indice.current?.showModal()} className="apn-botao" aria-label="Abrir índice da apresentação">
          <MenuIcon width={22} height={22} />
        </button>
        <p className="apn-capitulo">{capitulo.titulo}</p>

        <div ref={trena} className="apn-trena" style={{ "--total": total } as CSSProperties}>
          <span aria-hidden className="apn-marca" />
          <div className="apn-fita">
            {Array.from({ length: total }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => irPara(i)}
                aria-label={`Ir para a tela ${i + 1} de ${total}`}
                aria-current={i === atual ? "true" : undefined}
                className="apn-numero"
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <p className="apn-contador" aria-live="polite">
          {atual + 1} de {total}
        </p>
        <button type="button" onClick={() => irPara(atual - 1)} disabled={atual === 0} className="apn-botao apn-seta" aria-label="Tela anterior">
          <ChevronIcon width={22} height={22} className="rotate-180" />
        </button>
        <button type="button" onClick={() => irPara(atual + 1)} disabled={atual === total - 1} className="apn-botao apn-seta" aria-label="Próxima tela">
          <ChevronIcon width={22} height={22} />
        </button>
      </nav>

      <dialog ref={indice} className="apn-indice" aria-label="Índice da apresentação" onClick={(e) => e.target === indice.current && indice.current?.close()}>
        <div className="flex items-center justify-between">
          <p className="display text-[1.7rem] text-ink">Índice</p>
          <button type="button" onClick={() => indice.current?.close()} className="grid size-11 cursor-pointer place-items-center rounded-full text-ink hover:bg-surface-alt" aria-label="Fechar índice">
            <CloseIcon width={24} height={24} />
          </button>
        </div>
        <ol className="mt-4 border-t border-line">
          {capitulos.map((c) => (
            <li key={c.titulo} className="border-b border-line">
              <button
                type="button"
                onClick={() => {
                  indice.current?.close();
                  irPara(c.inicio);
                }}
                aria-current={c === capitulo ? "true" : undefined}
                className="flex min-h-13 w-full cursor-pointer items-center justify-between gap-4 py-2 text-left text-[1.05rem] font-medium tracking-[-0.015em] text-ink aria-[current=true]:text-muted"
              >
                {c.titulo}
                <span className="text-sm font-normal tabular-nums text-muted">{c.inicio + 1}</span>
              </button>
            </li>
          ))}
        </ol>
        <a href={whatsappHref} target="_blank" rel="noopener" className="btn btn-primary mt-6 w-full">
          <WhatsAppIcon />
          Conversar no WhatsApp
        </a>
      </dialog>
    </div>
  );
}
