import { SITE } from "@/content/site";

export const dynamic = "force-static";

// Moteurs de recherche + assistants IA explicitement autorisés (citation dans ChatGPT, Claude, Perplexity…).
const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-Web", "anthropic-ai", "Google-Extended", "PerplexityBot", "Perplexity-User", "Applebot-Extended", "CCBot"];

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/contact.php"] },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
