"use client";

import { useEffect } from "react";
import { whatsappUrl } from "@/lib/format";
import { formatarReais, saudacao, totalProposta } from "@/lib/apn-proposta";
import { siteConfig } from "@/site.config";
import { WhatsAppIcon } from "../icons";
import { useProposta } from "./useProposta";

const AMBIENTES = ["Dormitório de visitas", "Dormitório infantil", "Suíte", "Closet", "Hall", "Escritório", "Sala de estar", "Cozinha", "Área gourmet", "Área de serviço e lavanderia", "Circulação", "Lavabo", "Banheiro da suíte", "Banheiro social"];

/** Boas-vindas: com o nome do cliente no link pessoal, ou a versão geral. */
export function ApnBoasVindas() {
  const p = useProposta();
  const s = p ? saudacao[p.tratamento] : null;
  // Já sabemos se o link é válido: libera a saudação mesmo que ele esteja corrompido.
  useEffect(() => document.documentElement.classList.remove("apn-pessoal"), []);
  return (
    <div data-apn-boasvindas data-pronta={p ? "" : undefined}>
      <p className="text-[1.25rem] font-medium tracking-[-0.02em] text-surface/80 sm:text-[1.6rem]">{s ? s.titulo : "Boas-vindas à"}</p>
      <h1 className="display mt-3 max-w-[14ch] text-[3rem] text-surface sm:text-[4.6rem] lg:text-[5.6rem]">{p ? `${p.cliente}!` : "Boa Vista Brasília"}</h1>
      <p className="mt-6 max-w-[34ch] text-[1.15rem] leading-relaxed text-surface/85 sm:text-[1.35rem]">{s ? s.texto : "É um prazer receber você para a apresentação do seu projeto!"}</p>
    </div>
  );
}

/** Título "Proposta", com o nome do cliente quando há. */
export function ApnPropostaCapa() {
  const p = useProposta();
  return (
    <>
      <h2 className="display text-[4rem] text-ink sm:text-[7rem] lg:text-[10rem]">Proposta</h2>
      {p ? <p className="mt-4 text-[1.3rem] font-medium tracking-[-0.02em] text-muted sm:text-[1.7rem]">para {p.cliente}</p> : null}
    </>
  );
}

/** Tabela de ambientes: com valores no link pessoal; sem valores na versão geral. */
export function ApnPropostaTabela() {
  const p = useProposta();
  const c = siteConfig.contact;

  if (!p) {
    return (
      <div className="flex h-full flex-col">
        <h2 className="display text-[2.2rem] text-ink sm:text-[3.4rem]">Ambientes da sua proposta</h2>
        <p className="mt-3 max-w-[56ch] leading-relaxed text-muted">Cada ambiente é detalhado e orçado separadamente. Os valores saem do seu projeto.</p>
        <ul className="mt-5 grid grid-cols-2 gap-x-5 border-t border-line text-ink sm:gap-x-10">
          {AMBIENTES.map((a) => (
            <li key={a} className="flex items-center border-b border-line py-2 text-[0.95rem] leading-snug sm:text-[1rem]">
              {a}
            </li>
          ))}
        </ul>
        <a href={whatsappUrl(c.whatsapp, "Olá! Vi a apresentação da Boa Vista Brasília e quero receber o orçamento do meu projeto.") ?? "#"} target="_blank" rel="noopener" className="btn btn-primary mt-6 self-start">
          <WhatsAppIcon />
          Pedir meu orçamento
        </a>
      </div>
    );
  }

  const comNome = p.linhas.some((l) => l.nome);
  return (
    <div className="flex h-full flex-col">
      <h2 className="display text-[2.2rem] text-ink sm:text-[3.4rem]">Ambientes da sua proposta</h2>
      <div data-rolagem-interna className="apn-rolagem mt-5 min-h-0 flex-1">
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0 bg-surface text-sm text-muted">
            <tr className="border-b border-ink">
              <th scope="col" className="py-2 pr-4 font-normal">Ambiente</th>
              {comNome ? <th scope="col" className="hidden py-2 pr-4 font-normal sm:table-cell">Descrição</th> : null}
              <th scope="col" className="py-2 text-right font-normal">Valor</th>
            </tr>
          </thead>
          <tbody>
            {p.linhas.map((l, i) => (
              <tr key={i} className="border-b border-line text-ink">
                <th scope="row" className="py-2.5 pr-4 text-[1rem] font-medium leading-snug">
                  {l.ambiente}
                  {l.nome ? <span className="block text-[0.9rem] font-normal text-muted sm:hidden">{l.nome}</span> : null}
                </th>
                {comNome ? <td className="hidden py-2.5 pr-4 text-muted sm:table-cell">{l.nome}</td> : null}
                <td className="whitespace-nowrap py-2.5 text-right tabular-nums">{formatarReais(l.centavos)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 flex items-baseline justify-between gap-4 border-t-2 border-ink pt-3 text-ink">
        <span className="text-[1rem] font-medium">Total dos ambientes</span>
        <span className="display whitespace-nowrap text-[1.8rem] tabular-nums sm:text-[2.6rem]">{formatarReais(totalProposta(p))}</span>
      </p>
    </div>
  );
}

/** Convite final: a mensagem do WhatsApp cita o cliente quando há link pessoal. */
export function ApnContatoFinal() {
  const p = useProposta();
  const msg = p ? `Olá! Aqui é ${p.cliente}. Vi a apresentação e a proposta e gostaria de conversar.` : "Olá! Vi a apresentação da Boa Vista Brasília e gostaria de conversar sobre um projeto.";
  return (
    <a href={whatsappUrl(siteConfig.contact.whatsapp, msg) ?? "#"} target="_blank" rel="noopener" className="btn btn-inverse">
      <WhatsAppIcon />
      Conversar no WhatsApp
    </a>
  );
}
