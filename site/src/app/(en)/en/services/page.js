import Services from "@/views/Services";
import { dict, pageMetadata } from "@/lib/seo";

const t = dict("en").servicesPage;

export const metadata = pageMetadata({ lang: "en", key: "services", title: t.metaTitle, description: t.metaDesc });

export default function Page() {
  return <Services lang="en" />;
}
