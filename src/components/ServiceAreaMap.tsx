"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import type { Map as MapLibreMap, Marker, Popup } from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import { whatsappUrl } from "@/lib/format";

export type Store = { name: string; address: string; lat: number; lng: number };

/**
 * Mapa das lojas (MapLibre + mapa base OpenFreeMap, sem chave de API).
 * Carrega só quando a seção chega perto da tela. A lista ao lado leva o mapa até cada loja.
 */
export function ServiceAreaMap({ stores, whatsapp, regions }: { stores: Store[]; whatsapp: string; regions?: string[] }) {
  const box = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markers = useRef<{ marker: Marker; popup: Popup; el: HTMLElement }[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const maplibregl = await import("maplibre-gl");
        if (cancelled || !box.current) return;
        maplibregl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
        const map = new maplibregl.Map({
          container: box.current,
          style: "https://tiles.openfreemap.org/styles/positron",
          center: [-47.0, -14.2],
          zoom: 4.6,
          minZoom: 3,
          maxZoom: 15,
          scrollZoom: false,
          cooperativeGestures: window.matchMedia("(pointer: coarse)").matches,
          attributionControl: { compact: true },
        });
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
        mapRef.current = map;
        markers.current = stores.map((s, i) => {
          const dot = document.createElement("button");
          dot.type = "button";
          dot.setAttribute("aria-label", `Loja de ${s.name}`);
          dot.className = "region-dot";
          const popupEl = document.createElement("div");
          const title = document.createElement("p");
          title.className = "region-popup-title";
          title.textContent = `Loja de ${s.name}`;
          const link = document.createElement("a");
          link.href = whatsappUrl(whatsapp, `Olá! Gostaria de falar com a loja de ${s.name} sobre um projeto de móveis planejados.`) ?? "#";
          link.target = "_blank";
          link.rel = "noopener";
          link.className = "region-popup-link";
          link.textContent = "Falar com esta loja";
          popupEl.append(title, link);
          const popup = new maplibregl.Popup({ offset: 18, closeButton: false }).setDOMContent(popupEl);
          const marker = new maplibregl.Marker({ element: dot }).setLngLat([s.lng, s.lat]).setPopup(popup).addTo(map);
          dot.addEventListener("click", () => setActive(i));
          return { marker, popup, el: dot };
        });
        // "load" pode já ter acontecido antes deste ponto; "idle" garante o aviso saindo da tela.
        map.once("idle", () => setReady(true));
        map.on("load", () => {
          setReady(true);
          const bounds = new maplibregl.LngLatBounds();
          stores.forEach((s) => bounds.extend([s.lng, s.lat]));
          map.fitBounds(bounds, { padding: 110, duration: 0, maxZoom: 7 });
        });
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [stores, whatsapp]);

  useEffect(() => {
    markers.current.forEach((m, i) => m.el.classList.toggle("is-active", i === active));
  }, [active]);

  function focus(i: number) {
    setActive(i);
    const map = mapRef.current;
    const m = markers.current[i];
    if (!map || !m) return;
    markers.current.forEach((o) => o.popup.isOpen() && o.popup.remove());
    map.flyTo({ center: [stores[i].lng, stores[i].lat], zoom: 11, speed: 0.9, curve: 1.4, essential: true });
    m.marker.togglePopup();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
      <div className="order-2 self-start lg:order-1">
        <ul className="border-t border-line">
          {stores.map((s, i) => (
            <li key={s.name} className="border-b border-line">
              <button
                type="button"
                onClick={() => focus(i)}
                onMouseEnter={() => setActive(i)}
                aria-pressed={active === i}
                className={`group flex w-full cursor-pointer items-start justify-between gap-3 py-5 text-left transition-colors duration-300 ${
                  active === i ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span>
                  <span className="block text-[1.2rem] font-medium tracking-[-0.02em] sm:text-[1.35rem]">{s.name}</span>
                  {s.address ? <span className="mt-1 block max-w-[32ch] text-[0.95rem] leading-snug text-muted">{s.address}</span> : null}
                </span>
                <span aria-hidden className={`mt-2 size-2 shrink-0 rounded-full transition-all duration-300 ${active === i ? "scale-100 bg-ink" : "scale-0 bg-ink group-hover:scale-100"}`} />
              </button>
            </li>
          ))}
        </ul>

        {regions?.length ? (
          <p className="mt-6 max-w-[42ch] text-[0.95rem] leading-relaxed text-muted">
            Em Brasília, atendemos com mais frequência {regions.slice(0, -1).join(", ")} e {regions[regions.length - 1]} — e vamos até o seu endereço
            para medir.
          </p>
        ) : null}
      </div>

      <div className="relative order-1 lg:order-2">
        <div
          ref={box}
          data-lenis-prevent
          className="map-canvas h-[380px] w-full overflow-hidden bg-surface-alt sm:h-[480px] lg:h-[560px]"
          aria-label="Mapa com as lojas da Boa Vista em Brasília e em Luís Eduardo Magalhães"
          role="region"
        />
        {!ready ? <p className="pointer-events-none absolute inset-0 grid place-items-center text-sm text-muted">Carregando o mapa…</p> : null}
      </div>
    </div>
  );
}
