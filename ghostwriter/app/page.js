export const dynamic = "force-dynamic";
import HomeClient from "./HomeClient";

export default function AppPage({ searchParams }) {
  const redirectedFrom = searchParams?.redirectedFrom ?? null;
  return <HomeClient redirectedFrom={redirectedFrom} />;
}
