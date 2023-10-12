import prismadb from "@/lib/prismadb";
import Client from "./components/client";

const Page = async ({ params }: { params: { userId: string } }) => {
  return <Client userId={params.userId} />;
};

export default Page;
