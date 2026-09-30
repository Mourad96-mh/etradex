import About from "@/views/About";
import { dict, pageMetadata } from "@/lib/seo";

const t = dict("fr").about;

export const metadata = pageMetadata({ lang: "fr", key: "about", title: t.metaTitle, description: t.metaDesc });

export default function Page() {
  return <About lang="fr" />;
}
