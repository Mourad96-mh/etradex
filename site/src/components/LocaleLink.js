import Link from "next/link";

// Export statique : pas de payload RSC à précharger → prefetch désactivé
// (sinon des 404 « __next…txt » en console font baisser Lighthouse).
export default function LocaleLink(props) {
  return <Link prefetch={false} {...props} />;
}
