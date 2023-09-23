import { User } from "@clerk/nextjs/server";
import { auth, currentUser } from "@clerk/nextjs";

import Client from "./components/client";

const Page = async () => {
  const user: User | null = await currentUser();
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  return <Client currentUser={user} userId={userId} />;
};

export default Page;
