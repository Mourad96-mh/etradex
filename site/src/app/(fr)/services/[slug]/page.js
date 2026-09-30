import { notFound } from "next/navigation";
import Service from "@/views/Service";
import { SERVICES, serviceBySlug } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug.fr }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = serviceBySlug("fr", slug);
  if (!s) return {};
  return pageMetadata({ lang: "fr", key: `service:${s.id}`, title: s.fr.metaTitle, description: s.fr.metaDesc });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const s = serviceBySlug("fr", slug);
  if (!s) notFound();
  return <Service lang="fr" service={s} />;
}
