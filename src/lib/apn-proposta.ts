/**
 * Proposta personalizada da apresentação de negócios.
 *
 * Os dados do cliente viajam só no link, depois do "#": o navegador não envia essa parte
 * ao servidor, então nada fica guardado no site nem nos registros de acesso.
 */

export type Tratamento = "a" | "o" | "os";
export type LinhaProposta = { ambiente: string; nome: string; centavos: number };
export type Proposta = { cliente: string; tratamento: Tratamento; linhas: LinhaProposta[] };

const MAX_LINHAS = 60;
const MAX_TEXTO = 80;

export function codificarProposta(p: Proposta): string {
  const compacta = { n: p.cliente, t: p.tratamento, r: p.linhas.map((l) => [l.ambiente, l.nome, l.centavos]) };
  const bytes = new TextEncoder().encode(JSON.stringify(compacta));
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodificarProposta(codigo: string): Proposta | null {
  try {
    const b64 = codigo.replace(/-/g, "+").replace(/_/g, "/");
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const d = JSON.parse(new TextDecoder().decode(bytes));
    if (typeof d?.n !== "string" || !Array.isArray(d?.r) || d.r.length > MAX_LINHAS) return null;
    const tratamento: Tratamento = d.t === "a" || d.t === "o" || d.t === "os" ? d.t : "os";
    const linhas: LinhaProposta[] = [];
    for (const l of d.r) {
      if (!Array.isArray(l) || typeof l[0] !== "string" || typeof l[1] !== "string" || !Number.isSafeInteger(l[2]) || l[2] < 0) return null;
      linhas.push({ ambiente: l[0].slice(0, MAX_TEXTO), nome: l[1].slice(0, MAX_TEXTO), centavos: l[2] });
    }
    return { cliente: d.n.slice(0, MAX_TEXTO), tratamento, linhas };
  } catch {
    return null;
  }
}

/** Lê a proposta de um link inteiro ou só do trecho depois do "#". */
export function propostaDoLink(texto: string): Proposta | null {
  const i = texto.indexOf("#p=");
  return i === -1 ? null : decodificarProposta(texto.slice(i + 3).trim());
}

export const totalProposta = (p: Proposta) => p.linhas.reduce((s, l) => s + l.centavos, 0);

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
export const formatarReais = (centavos: number) => brl.format(centavos / 100);

export const saudacao: Record<Tratamento, { titulo: string; texto: string }> = {
  a: { titulo: "Seja bem-vinda", texto: "É um prazer recebê-la para a apresentação do seu projeto!" },
  o: { titulo: "Seja bem-vindo", texto: "É um prazer recebê-lo para a apresentação do seu projeto!" },
  os: { titulo: "Sejam bem-vindos", texto: "É um prazer recebê-los para a apresentação do seu projeto!" },
};
