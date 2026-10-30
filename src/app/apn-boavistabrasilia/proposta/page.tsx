import type { Metadata, Viewport } from "next";
import { ApnEditor } from "@/components/apn/ApnEditor";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Montar proposta",
  description: "Tela interna para gerar o link da apresentação com o nome e os valores de cada cliente.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: siteConfig.theme.surface, width: "device-width", initialScale: 1 };

export default function PropostaPage() {
  return <ApnEditor />;
}
