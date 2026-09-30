// Géométrie partagée des cartes d'embarquement : trajectoire en courbe de
// Bézier quadratique dans un viewBox 0 0 200 60, et silhouette d'avion (nez vers +x).

export const P0 = [8, 50];
export const P1 = [100, -14];
export const P2 = [192, 50];
export const ROUTE = `M${P0} Q${P1} ${P2}`;

export const PLANE =
  "M10 0C10-1 9-1.4 8-1.4H3L-2.5-8.5H-5L-1.8-1.4H-6.4L-8.6-4.4H-10.4L-9.2-1V1L-10.4 4.4H-8.6L-6.4 1.4H-1.8L-5 8.5H-2.5L3 1.4H8C9 1.4 10 1 10 0Z";

// Position et cap de l'avion à t ∈ [0, 1] le long de la trajectoire.
export function planeAt(t) {
  const u = 1 - t;
  const x = u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0];
  const y = u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1];
  const dx = 2 * u * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]);
  const dy = 2 * u * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]);
  const a = (Math.atan2(dy, dx) * 180) / Math.PI;
  return `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${a.toFixed(1)})`;
}
