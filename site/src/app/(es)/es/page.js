import Home from "@/views/Home";
import { dict, pageMetadata } from "@/lib/seo";

const t = dict("es").home;

export const metadata = pageMetadata({ lang: "es", key: "home", title: t.metaTitle, description: t.metaDesc });

export default function Page() {
  return <Home lang="es" />;
}
