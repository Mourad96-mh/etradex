import Home from "@/views/Home";
import { dict, pageMetadata } from "@/lib/seo";

const t = dict("en").home;

export const metadata = pageMetadata({ lang: "en", key: "home", title: t.metaTitle, description: t.metaDesc });

export default function Page() {
  return <Home lang="en" />;
}
