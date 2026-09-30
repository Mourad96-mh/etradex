import About from "@/views/About";
import { dict, pageMetadata } from "@/lib/seo";

const t = dict("es").about;

export const metadata = pageMetadata({ lang: "es", key: "about", title: t.metaTitle, description: t.metaDesc });

export default function Page() {
  return <About lang="es" />;
}
