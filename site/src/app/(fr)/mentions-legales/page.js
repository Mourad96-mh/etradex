import Legal from "@/views/Legal";
import { dict, pageMetadata } from "@/lib/seo";

const t = dict("fr").legal;

export const metadata = pageMetadata({ lang: "fr", key: "legal", title: t.metaTitle, description: t.metaDesc });

export default function Page() {
  return <Legal lang="fr" />;
}
