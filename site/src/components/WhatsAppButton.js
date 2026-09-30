import Icon from "@/components/Icon";
import { waLink } from "@/content/site";

export default function WhatsAppButton({ label, message, variant = "wa", className = "" }) {
  return (
    <a className={`btn btn--${variant} ${className}`} href={waLink(message)} target="_blank" rel="noopener noreferrer">
      <Icon name="whatsapp" size={20} />
      <span>{label}</span>
    </a>
  );
}
