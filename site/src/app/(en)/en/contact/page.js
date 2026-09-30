import Contact from "@/views/Contact";
import { dict, pageMetadata } from "@/lib/seo";

const t = dict("en").contact;

export const metadata = pageMetadata({ lang: "en", key: "contact", title: t.metaTitle, description: t.metaDesc });

export default function Page() {
  return <Contact lang="en" />;
}
