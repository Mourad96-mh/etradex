import Icon from "@/components/Icon";
import { waLink } from "@/content/site";

export default function WhatsAppFab({ label, message }) {
  return (
    <a className="wa-fab" href={waLink(message)} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
      <Icon name="whatsapp" size={30} />
    </a>
  );
}
