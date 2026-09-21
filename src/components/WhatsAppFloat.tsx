import { whatsappUrl } from "@/lib/format";
import { siteConfig } from "@/site.config";
import { WhatsAppIcon } from "./icons";

/** Botão fixo de WhatsApp (canto inferior direito), em grafite da marca. Some quando o número está vazio. */
export function WhatsAppFloat() {
  const href = whatsappUrl(siteConfig.contact.whatsapp, siteConfig.contact.whatsappMessage);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="Conversar no WhatsApp"
      className="fixed bottom-4 right-4 z-30 grid size-14 place-items-center rounded-full bg-ink text-surface shadow-[0_10px_30px_-8px_rgb(32_30_30/0.55)] transition-colors duration-300 hover:bg-muted sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon width={28} height={28} />
    </a>
  );
}
