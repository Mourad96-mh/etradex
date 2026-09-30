import { notFound } from "next/navigation";
import Service from "@/views/Service";
import { SERVICES, serviceBySlug } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug.es }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = serviceBySlug("es", slug);
  if (!s) return {};
  return pageMetadata({ lang: "es", key: `service:${s.id}`, title: s.es.metaTitle, description: s.es.metaDesc });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const s = serviceBySlug("es", slug);
  if (!s) notFound();
  return <Service lang="es" service={s} />;
}
