"use client";

import { useMemo, useSyncExternalStore } from "react";
import { propostaDoLink } from "@/lib/apn-proposta";

function assinar(aviso: () => void) {
  window.addEventListener("hashchange", aviso);
  return () => window.removeEventListener("hashchange", aviso);
}

/** Proposta do cliente que veio no link. Null na versão geral da apresentação. */
export function useProposta() {
  const hash = useSyncExternalStore(assinar, () => window.location.hash, () => "");
  return useMemo(() => propostaDoLink(hash), [hash]);
}
