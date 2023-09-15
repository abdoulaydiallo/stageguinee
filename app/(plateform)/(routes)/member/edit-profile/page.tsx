import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

import ClientPage from "./components/client";

const Page = async () => {
  const user: User | null = await currentUser();
  return <ClientPage user={user} />;
};

export default Page;
