"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { codificarProposta, formatarReais, propostaDoLink, type LinhaProposta, type Proposta, type Tratamento } from "@/lib/apn-proposta";
import { siteConfig } from "@/site.config";
import { CheckIcon, CloseIcon, PlusIcon, WhatsAppIcon } from "../icons";

const SUGESTOES = ["Cozinha", "Área gourmet", "Sala de estar", "Suíte", "Closet", "Dormitório", "Dormitório infantil", "Escritório", "Hall", "Lavabo", "Banheiro da suíte", "Banheiro social", "Área de serviço e lavanderia", "Circulação"];
const TRATAMENTOS: { valor: Tratamento; rotulo: string; exemplo: string }[] = [
  { valor: "os", rotulo: "Casal ou grupo", exemplo: "Sejam bem-vindos" },
  { valor: "a", rotulo: "Uma mulher", exemplo: "Seja bem-vinda" },
  { valor: "o", rotulo: "Um homem", exemplo: "Seja bem-vindo" },
];

type Linha = LinhaProposta & { id: number };
let proximoId = 1;
const novaLinha = (ambiente = "", nome = "", centavos = 0): Linha => ({ id: proximoId++, ambiente, nome, centavos });

const campo = "w-full min-h-12 rounded-[2px] border border-line bg-white px-3.5 py-2.5 text-[1rem] text-ink outline-none transition-colors duration-200 placeholder:text-muted/70 focus:border-ink";

/**
 * Monta o link da apresentação para um cliente. Nada é salvo: nome e valores ficam só no
 * link gerado. Para alterar uma proposta depois, basta colar o link dela aqui.
 */
export function ApnEditor() {
  const [cliente, setCliente] = useState("");
  const [tratamento, setTratamento] = useState<Tratamento>("os");
  const [linhas, setLinhas] = useState<Linha[]>(() => [novaLinha()]);
  const [linkAntigo, setLinkAntigo] = useState("");
  const [avisoAntigo, setAvisoAntigo] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);
  const [gerado, setGerado] = useState<string | null>(null);

  const total = useMemo(() => linhas.reduce((s, l) => s + l.centavos, 0), [linhas]);

  function mudar(id: number, parte: Partial<LinhaProposta>) {
    setGerado(null);
    setLinhas((ls) => ls.map((l) => (l.id === id ? { ...l, ...parte } : l)));
  }

  function adicionar(ambiente = "") {
    setGerado(null);
    setLinhas((ls) => {
      const vazia = ambiente ? ls.find((l) => !l.ambiente) : null;
      return vazia ? ls.map((l) => (l.id === vazia.id ? { ...l, ambiente } : l)) : [...ls, novaLinha(ambiente)];
    });
  }

  function abrirAntiga() {
    const p = propostaDoLink(linkAntigo);
    if (!p) {
      setAvisoAntigo("Esse link não tem uma proposta. Cole o link completo gerado por esta tela.");
      return;
    }
    setCliente(p.cliente);
    setTratamento(p.tratamento);
    setLinhas(p.linhas.map((l) => novaLinha(l.ambiente, l.nome, l.centavos)));
    setAvisoAntigo("Proposta carregada. Altere o que precisar e gere o link novo.");
    setGerado(null);
  }

  function gerar() {
    setCopiado(false);
    const validas = linhas.filter((l) => l.ambiente.trim() || l.centavos > 0);
    if (!cliente.trim()) return setErro("Informe o nome do cliente.");
    if (!validas.length) return setErro("Adicione ao menos um ambiente com valor.");
    if (validas.some((l) => !l.ambiente.trim())) return setErro("Há um valor sem nome de ambiente. Preencha o ambiente ou apague a linha.");
    setErro(null);
    const p: Proposta = { cliente: cliente.trim(), tratamento, linhas: validas.map((l) => ({ ambiente: l.ambiente.trim(), nome: l.nome.trim(), centavos: l.centavos })) };
    setGerado(`${window.location.origin}/apn-boavistabrasilia#p=${codificarProposta(p)}`);
  }

  async function copiar() {
    if (!gerado) return;
    try {
      await navigator.clipboard.writeText(gerado);
      setCopiado(true);
    } catch {
      setErro("O navegador bloqueou a cópia. Selecione o link e copie manualmente.");
    }
  }

  return (
    <div data-apn-editor className="min-h-svh bg-surface text-ink">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <Image src={siteConfig.logo.src} alt="Boa Vista Brasília" width={siteConfig.logo.width} height={siteConfig.logo.height} unoptimized className="h-10 w-auto" />
        <h1 className="display mt-8 text-[2.3rem] sm:text-[3.2rem]">Montar proposta do cliente</h1>
        <p className="mt-3 max-w-[58ch] leading-relaxed text-muted">Preencha os dados e gere um link só deste cliente. A apresentação abre com o nome dele nas boas-vindas e os valores na tela de proposta. Nada fica salvo no site: os dados ficam dentro do link.</p>

        <details className="mt-6 border-y border-line py-3">
          <summary className="min-h-8 cursor-pointer font-medium">Alterar uma proposta já enviada</summary>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <label className="flex-1">
              <span className="sr-only">Link da proposta</span>
              <input value={linkAntigo} onChange={(e) => setLinkAntigo(e.target.value)} className={campo} placeholder="Cole aqui o link da proposta" />
            </label>
            <button type="button" onClick={abrirAntiga} className="btn btn-secondary">Carregar</button>
          </div>
          {avisoAntigo ? <p role="status" className="mt-2 text-[0.95rem] text-muted">{avisoAntigo}</p> : null}
        </details>

        <div className="mt-8 grid gap-5">
          <label className="block">
            <span className="block font-medium">Nome do cliente</span>
            <input value={cliente} onChange={(e) => { setCliente(e.target.value); setGerado(null); }} maxLength={80} className={`${campo} mt-2`} placeholder="Ex.: Ana e Pedro" />
          </label>

          <fieldset>
            <legend className="font-medium">Como cumprimentar</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {TRATAMENTOS.map((t) => (
                <label key={t.valor} className={`flex min-h-14 cursor-pointer flex-col justify-center rounded-[2px] border px-3.5 py-2 transition-colors duration-200 ${tratamento === t.valor ? "border-ink bg-ink text-surface" : "border-line bg-white hover:border-ink"}`}>
                  <input type="radio" name="tratamento" checked={tratamento === t.valor} onChange={() => { setTratamento(t.valor); setGerado(null); }} className="sr-only" />
                  <span className="font-medium leading-tight">{t.rotulo}</span>
                  <span className={`text-[0.9rem] ${tratamento === t.valor ? "text-surface/75" : "text-muted"}`}>{t.exemplo}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <h2 className="display mt-10 text-[1.7rem]">Ambientes e valores</h2>
        <ul className="mt-4 grid gap-4">
          {linhas.map((l, i) => (
            <li key={l.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 border-b border-line pb-4 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_9.5rem_auto]">
              <label className="col-start-1">
                <span className="text-[0.9rem] text-muted">Ambiente {i + 1}</span>
                <input value={l.ambiente} onChange={(e) => mudar(l.id, { ambiente: e.target.value })} maxLength={80} className={`${campo} mt-1`} placeholder="Ex.: Cozinha" />
              </label>
              <label className="col-start-1 sm:col-start-2 sm:row-start-1">
                <span className="text-[0.9rem] text-muted">Descrição (opcional)</span>
                <input value={l.nome} onChange={(e) => mudar(l.id, { nome: e.target.value })} maxLength={80} className={`${campo} mt-1`} placeholder="Ex.: Quarto do casal" />
              </label>
              <label className="col-start-1 sm:col-start-3 sm:row-start-1">
                <span className="text-[0.9rem] text-muted">Valor</span>
                <input inputMode="numeric" value={l.centavos ? formatarReais(l.centavos) : ""} onChange={(e) => mudar(l.id, { centavos: Math.min(Number(e.target.value.replace(/\D/g, "") || 0), 99999999999) })} className={`${campo} mt-1 text-right tabular-nums`} placeholder="R$ 0,00" />
              </label>
              <button type="button" onClick={() => { setGerado(null); setLinhas((ls) => (ls.length > 1 ? ls.filter((x) => x.id !== l.id) : [novaLinha()])); }} aria-label={`Apagar ambiente ${i + 1}`} className="col-start-2 row-start-1 mt-6 grid size-12 cursor-pointer place-items-center rounded-full text-muted hover:bg-surface-alt hover:text-ink sm:col-start-4">
                <CloseIcon width={20} height={20} />
              </button>
            </li>
          ))}
        </ul>

        <button type="button" onClick={() => adicionar()} className="btn btn-secondary mt-4">
          <PlusIcon />
          Adicionar ambiente
        </button>

        <div className="mt-5">
          <p className="text-[0.95rem] text-muted">Atalhos</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SUGESTOES.map((s) => (
              <button key={s} type="button" onClick={() => adicionar(s)} className="min-h-11 cursor-pointer rounded-[2px] border border-line bg-white px-3 text-[0.95rem] transition-colors duration-200 hover:border-ink">
                {s}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 flex items-baseline justify-between gap-4 border-t-2 border-ink pt-3">
          <span className="font-medium">Total dos ambientes</span>
          <span className="display text-[2rem] tabular-nums">{formatarReais(total)}</span>
        </p>

        {erro ? <p role="alert" className="mt-4 font-medium text-[#9A3B2E]">{erro}</p> : null}

        <button type="button" onClick={gerar} className="btn btn-primary mt-6 w-full sm:w-auto">Gerar link do cliente</button>

        {gerado ? (
          <div role="status" className="mt-6 bg-surface-alt p-5">
            <p className="font-medium">Link pronto</p>
            <label className="mt-2 block">
              <span className="sr-only">Link da proposta</span>
              <input readOnly value={gerado} onFocus={(e) => e.target.select()} className={campo} />
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={copiar} className="btn btn-primary">
                {copiado ? <CheckIcon /> : null}
                {copiado ? "Link copiado" : "Copiar link"}
              </button>
              <a href={gerado} target="_blank" rel="noopener" className="btn btn-secondary">Abrir apresentação</a>
              <a href={`https://wa.me/?text=${encodeURIComponent(gerado)}`} target="_blank" rel="noopener" className="btn btn-secondary">
                <WhatsAppIcon />
                Enviar no WhatsApp
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
