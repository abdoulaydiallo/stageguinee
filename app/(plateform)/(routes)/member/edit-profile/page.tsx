import { auth } from "@clerk/nextjs";

import ClientPage from "./components/client";
import prismadb from "@/lib/prismadb";

const Page = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const PrismaUser = await prismadb.user.findFirst({
    where: {
      clerkUserId: userId,
    },
    include: {
      profile: true,
      education: true,
      experiences: true,
      skills: true,
    },
  });

  return <ClientPage user={PrismaUser} />;
};

export default Page;
