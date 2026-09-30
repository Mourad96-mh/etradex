import FaqPage from "@/views/FaqPage";
import { dict, pageMetadata } from "@/lib/seo";

const t = dict("en").faqPage;

export const metadata = pageMetadata({ lang: "en", key: "faq", title: t.metaTitle, description: t.metaDesc });

export default function Page() {
  return <FaqPage lang="en" />;
}
