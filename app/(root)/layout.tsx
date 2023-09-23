import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { auth, currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface SetupLayoutProps {
  children: React.ReactNode;
}

const SetupLayout: React.FC<SetupLayoutProps> = async ({ children }) => {
  const { userId } = auth();

  if (userId) {
    redirect("/member/jobs-listing");
  }

  const user: User | null = await currentUser();

  return (
    <>
      <Navbar />
      <div className="min-h-[50vh]">{children}</div>
      <Footer />
    </>
  );
};
export default SetupLayout;
