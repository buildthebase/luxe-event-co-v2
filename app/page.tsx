import { HomePage } from "./components/home-page";
import { createPageMetadata } from "./metadata-config";

export const metadata = createPageMetadata("/");

export default function Home() {
  return <HomePage />;
}
