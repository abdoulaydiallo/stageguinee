import Client from "./components/client";

const Page = async ({ params }: { params: { userId: string } }) => {
  console.log(params.userId);
  return <Client userId={params.userId} />;
};

export default Page;
