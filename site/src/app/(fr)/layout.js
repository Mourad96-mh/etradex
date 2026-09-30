import "../globals.css";
import SiteShell from "@/components/SiteShell";
import { sans, serif } from "@/lib/fonts";
import { SITE } from "@/content/site";

export const metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  formatDetection: { telephone: false },
};

export const viewport = { themeColor: "#1f2326", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <SiteShell lang="fr">{children}</SiteShell>
      </body>
    </html>
  );
}
