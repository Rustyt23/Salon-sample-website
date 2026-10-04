import Link from "next/link";
import { PageIntro } from "@/components/ui";

export default function NotFound() {
  return <><PageIntro eyebrow="A LITTLE DETOUR · 404" title={<>Let’s get you<br /><em>back to good.</em></>} description="We couldn’t find that page. Your next look is waiting back at the salon." /><div className="container not-found-action"><Link href="/" className="button button-dark">Back to home</Link></div></>;
}
