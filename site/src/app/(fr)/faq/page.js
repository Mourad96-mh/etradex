import FaqPage from "@/views/FaqPage";
import { dict, pageMetadata } from "@/lib/seo";

const t = dict("fr").faqPage;

export const metadata = pageMetadata({ lang: "fr", key: "faq", title: t.metaTitle, description: t.metaDesc });

export default function Page() {
  return <FaqPage lang="fr" />;
}
