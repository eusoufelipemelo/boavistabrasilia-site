"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { whatsappUrl } from "@/lib/format";
import { WhatsAppIcon } from "./icons";

const ROOMS = ["Cozinha", "Closet", "Dormitório", "Banheiro ou lavabo", "Área gourmet", "Sala", "Lavanderia", "Home office", "Casa inteira"];
const SERVICES = ["Projeto e móveis planejados", "Executar o projeto do meu arquiteto", "Atendimento a construtora ou incorporadora", "Ainda não sei"];
const PLACES = ["Casa", "Apartamento", "Espaço comercial"];

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/**
 * Cadastro de lead: monta uma mensagem organizada e abre o WhatsApp da Boa Vista Brasília.
 * Os dados não ficam guardados no site (ver Política de Privacidade).
 * `tone` adapta os campos ao fundo: grafite (dark) ou claro (light).
 */
export function LeadForm({ whatsapp, regions, tone = "dark" }: { whatsapp: string; regions: string[]; tone?: "dark" | "light" }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const dark = tone === "dark";

  // Campos em caixa, com a linha fina da marca. Nada de campo só com risco embaixo.
  const field = `w-full min-h-[3.4rem] rounded-[2px] border px-4 py-3 text-[1rem] transition-colors duration-200 outline-none ${
    dark
      ? "border-white/25 bg-white/[0.04] text-surface placeholder:text-surface/40 focus:border-surface focus:bg-white/[0.08]"
      : "border-line bg-white text-ink placeholder:text-muted/70 focus:border-ink"
  }`;
  const selectField = `${field} appearance-none bg-[length:14px] bg-[right_0.9rem_center] bg-no-repeat pr-10 ${dark ? "bg-[url('/ui/chevron-claro.svg')]" : "bg-[url('/ui/chevron-escuro.svg')]"}`;
  const label = `block text-[0.95rem] font-medium ${dark ? "text-surface" : "text-ink"}`;
  const help = dark ? "text-surface/70" : "text-muted";

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("nome") ?? "").trim();
    const digits = phone.replace(/\D/g, "");
    if (!name) return setError("Informe seu nome.");
    if (digits.length < 10) return setError("Informe um WhatsApp com DDD, por exemplo (61) 99999-9999.");
    if (!f.get("consentimento")) return setError("Para enviar, confirme que leu a Política de Privacidade.");
    setError(null);
    const rooms = f.getAll("ambientes").map(String);
    const lines = [
      "Olá! Quero solicitar um projeto de móveis planejados com a Boa Vista Brasília.",
      "",
      `*Nome:* ${name}`,
      `*WhatsApp:* ${phone}`,
      f.get("regiao") ? `*Região:* ${f.get("regiao")}` : "",
      f.get("imovel") ? `*Imóvel:* ${f.get("imovel")}` : "",
      rooms.length ? `*Ambientes:* ${rooms.join(", ")}` : "",
      f.get("servico") ? `*Serviço:* ${f.get("servico")}` : "",
      String(f.get("mensagem") ?? "").trim() ? `*Sobre o projeto:* ${String(f.get("mensagem")).trim()}` : "",
    ].filter((l, i) => l !== "" || i === 1);
    const url = whatsappUrl(whatsapp, lines.join("\n"));
    if (!url) return;
    window.open(url, "_blank", "noopener");
    setSentUrl(url);
  }

  if (sentUrl) {
    return (
      <div role="status" className="py-10">
        <p className={`display text-[2rem] ${dark ? "text-surface" : "text-ink"}`}>Pronto, sua mensagem está no WhatsApp.</p>
        <p className={`mt-4 max-w-md leading-relaxed ${help}`}>
          Confira os dados e toque em enviar na conversa com a Boa Vista Brasília. Se o WhatsApp não abriu,{" "}
          <a href={sentUrl} target="_blank" rel="noopener" className={`underline underline-offset-4 ${dark ? "text-surface" : "text-ink"}`}>
            abra a conversa por aqui
          </a>
          .
        </p>
        <button type="button" onClick={() => setSentUrl(null)} className={`mt-6 cursor-pointer text-[0.95rem] underline underline-offset-4 ${help}`}>
          Preencher de novo
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
      <label className="block">
        <span className={label}>Nome *</span>
        <input name="nome" required autoComplete="name" className={`${field} mt-2`} placeholder="Seu nome" />
      </label>
      <label className="block">
        <span className={label}>WhatsApp *</span>
        <input
          name="whatsapp"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={phone}
          onChange={(e) => setPhone(maskPhone(e.target.value))}
          className={`${field} mt-2`}
          placeholder="(61) 99999-9999"
        />
      </label>
      <label className="block">
        <span className={label}>Região</span>
        <select name="regiao" className={`${selectField} mt-2`} defaultValue="">
          <option value="" disabled>
            Onde fica o imóvel
          </option>
          {regions.map((r) => (
            <option key={r}>{r}</option>
          ))}
          <option>Outra região do DF ou entorno</option>
        </select>
      </label>
      <label className="block">
        <span className={label}>Tipo de imóvel</span>
        <select name="imovel" className={`${selectField} mt-2`} defaultValue="">
          <option value="" disabled>
            Casa, apartamento ou comercial
          </option>
          {PLACES.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>

      <fieldset className="sm:col-span-2">
        <legend className={label}>Ambientes</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {ROOMS.map((r) => (
            <label key={r} className="cursor-pointer">
              <input type="checkbox" name="ambientes" value={r} className={`chip-input sr-only ${dark ? "chip-on-dark" : ""}`} />
              <span
                className={`inline-flex min-h-11 items-center rounded-[2px] border px-4 text-[0.95rem] transition-colors duration-200 ${
                  dark ? "border-white/25 text-surface/85 hover:border-surface" : "border-line text-ink hover:border-ink"
                }`}
              >
                {r}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block sm:col-span-2">
        <span className={label}>Serviço de interesse</span>
        <select name="servico" className={`${selectField} mt-2`} defaultValue="">
          <option value="" disabled>
            Escolha uma opção
          </option>
          {SERVICES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>

      <label className="block sm:col-span-2">
        <span className={label}>Conte um pouco do seu projeto</span>
        <textarea
          name="mensagem"
          rows={4}
          className={`${field} mt-2 resize-none`}
          placeholder="O ambiente, o prazo que você tem em mente, o que não funciona hoje..."
        />
      </label>

      <label className={`flex gap-3 text-[0.95rem] leading-relaxed sm:col-span-2 ${help}`}>
        <input type="checkbox" name="consentimento" className={`mt-1 size-5 shrink-0 cursor-pointer ${dark ? "accent-white" : "accent-[var(--ink)]"}`} />
        <span>
          Li a{" "}
          <Link href="/politica-de-privacidade" className={`underline underline-offset-4 ${dark ? "text-surface" : "text-ink"}`}>
            Política de Privacidade
          </Link>{" "}
          e concordo em enviar esses dados à Boa Vista Brasília pelo WhatsApp para receber o atendimento.
        </span>
      </label>

      {error ? (
        <p role="alert" className={`text-[0.95rem] font-medium sm:col-span-2 ${dark ? "text-[#F0B9AE]" : "text-[#9A3B2E]"}`}>
          {error}
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <button type="submit" className={`btn w-full cursor-pointer sm:w-auto ${dark ? "btn-inverse" : "btn-primary"}`}>
          <WhatsAppIcon />
          Enviar pelo WhatsApp
        </button>
      </div>
    </form>
  );
}
