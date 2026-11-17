import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "DropTraQ: Bringing Intelligence to Every Drop";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const icon = await readFile(join(process.cwd(), "public/images/brand/droptraq-icon-256.png"));
  const src = `data:image/png;base64,${icon.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: 72, background: "linear-gradient(135deg,#ffffff 0%,#f3f7fa 55%,#e2eef4 100%)", color: "#0b1d2b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img src={src} width={64} height={64} alt="" />
          <div style={{ fontSize: 40, fontWeight: 700, display: "flex" }}>Drop<span style={{ color: "#169df7" }}>TraQ</span></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2 }}>Bringing Intelligence</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2, color: "#0a8394" }}>to Every Drop.</div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#475a69" }}>IoT monitoring for water distribution networks · Kigali, Rwanda</div>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 20, color: "#66798a" }}>
          <span>FLOW SENSORS</span><span>·</span><span>EMBEDDED SYSTEMS</span><span>·</span><span>MQTT TELEMETRY</span><span>·</span><span>DASHBOARDS</span>
        </div>
      </div>
    ),
    size,
  );
}
