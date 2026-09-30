import Services from "@/views/Services";
import { dict, pageMetadata } from "@/lib/seo";

const t = dict("es").servicesPage;

export const metadata = pageMetadata({ lang: "es", key: "services", title: t.metaTitle, description: t.metaDesc });

export default function Page() {
  return <Services lang="es" />;
}
