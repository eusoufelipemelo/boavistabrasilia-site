import type { Metadata, Viewport } from "next";
import { ApnPresentation } from "@/components/apn/ApnPresentation";
import { absoluteUrl } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const base = pageMetadata({
  title: "Apresentação de negócios",
  description: "Conheça a história, a fábrica, o processo e os projetos da Boa Vista Brasília: móveis planejados de alto padrão, do projeto à montagem.",
  path: "/apn-boavistabrasilia",
  image: "/og/apn.jpg",
});

export const metadata: Metadata = {
  ...base,
  openGraph: {
    ...base.openGraph,
    title: "Apresentação de negócios | Boa Vista Brasília",
    images: [{ url: absoluteUrl("/og/apn.jpg"), secureUrl: absoluteUrl("/og/apn.jpg"), type: "image/jpeg", width: 1200, height: 630, alt: "Apresentação de negócios da Boa Vista Brasília" }],
  },
  twitter: { ...base.twitter, title: "Apresentação de negócios | Boa Vista Brasília" },
  // apresentação comercial, enviada por link: fora dos resultados de busca
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: siteConfig.theme.ink, width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function ApnPage() {
  return <ApnPresentation />;
}
