import { ImageResponse } from "next/og";
import { siteConfig } from "@/site.config";

// Favicon gerado com a inicial do nome e a cor principal. Para usar um arquivo, apague este e crie app/icon.png.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: siteConfig.theme.brand, color: siteConfig.theme.brandContrast, borderRadius: 14, fontSize: 42, fontWeight: 700 }}>
        {siteConfig.name.trim().charAt(0).toUpperCase()}
      </div>
    ),
    size,
  );
}
