import { Newsreader, Public_Sans } from "next/font/google";

// Auto-hébergées au build par next/font : aucune requête vers Google au runtime.
// Titres : Newsreader (serif éditoriale) — texte : Public Sans (sobre, très lisible).
export const serif = Newsreader({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const sans = Public_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});
