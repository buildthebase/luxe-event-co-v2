import { permanentRedirect } from "next/navigation";

export default function InquiryRedirectPage() {
  permanentRedirect("/contact");
}
