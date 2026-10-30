import { NextResponse, type NextRequest } from "next/server";

/**
 * O endereço com acento da apresentação (/apn-boavistabrasília) mostra a mesma página de
 * /apn-boavistabrasilia, sem mudar a URL. Rota estática com acento dá 404 no Next, por isso o desvio.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/apn-boavistabrasilia";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/apn-boavistabras%C3%ADlia", "/apn-boavistabrasília"],
};
