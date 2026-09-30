import Home from "@/views/Home";
import { dict, pageMetadata } from "@/lib/seo";

const t = dict("fr").home;

export const metadata = pageMetadata({ lang: "fr", key: "home", title: t.metaTitle, description: t.metaDesc });

export default function Page() {
  return <Home lang="fr" />;
}
