import { notFound } from "next/navigation";
import Service from "@/views/Service";
import { SERVICES, serviceBySlug } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug.en }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = serviceBySlug("en", slug);
  if (!s) return {};
  return pageMetadata({ lang: "en", key: `service:${s.id}`, title: s.en.metaTitle, description: s.en.metaDesc });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const s = serviceBySlug("en", slug);
  if (!s) notFound();
  return <Service lang="en" service={s} />;
}
