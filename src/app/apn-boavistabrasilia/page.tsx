import type { Metadata, Viewport } from "next";
import { ApnPresentation } from "@/components/apn/ApnPresentation";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Apresentação de negócios",
    description: "Conheça a história, a fábrica, o processo e os projetos da Boa Vista Brasília: móveis planejados de alto padrão, do projeto à montagem.",
    path: "/apn-boavistabrasilia",
    image: "/og/apn.jpg",
  }),
  // apresentação comercial, enviada por link: fora dos resultados de busca
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: siteConfig.theme.ink, width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function ApnPage() {
  return <ApnPresentation />;
}
