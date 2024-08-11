import { HydrateClient } from "~/trpc/server";
import HomePage from "./_pages/hopePage";
import SessionWrapper from "./_components/sessionWrapper";

export default async function Home() {
  return (
    <HydrateClient>
      <SessionWrapper fallback={<p>Loading...</p>}>
        <HomePage />
      </SessionWrapper>
    </HydrateClient>
  );
}
