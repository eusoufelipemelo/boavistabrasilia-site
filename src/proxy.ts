import { NextResponse, type NextRequest } from "next/server";

const ROTA = "/apn-boavistabrasilia";

/**
 * Qualquer variação do endereço da apresentação mostra a mesma página, com a mesma prévia
 * de compartilhamento: "í" nas diferentes codificações que Mac e aplicativos usam, ou o link
 * cortado no acento por um aplicativo de mensagem. Rota estática com acento dá 404 no Next,
 * por isso o desvio.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === ROTA || pathname.startsWith(`${ROTA}/`)) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = ROTA;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/apn-boavista:resto(.*)"],
};
