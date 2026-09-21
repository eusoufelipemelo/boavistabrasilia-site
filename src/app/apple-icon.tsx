import { ImageResponse } from "next/og";
import { siteConfig } from "@/site.config";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: siteConfig.theme.brand, color: siteConfig.theme.brandContrast, fontSize: 110, fontWeight: 700 }}>
        {siteConfig.name.trim().charAt(0).toUpperCase()}
      </div>
    ),
    size,
  );
}
