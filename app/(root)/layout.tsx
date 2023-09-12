import Navbar from "@/components/navbar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface SetupLayoutProps {
  children: React.ReactNode;
}

const SetupLayout: React.FC<SetupLayoutProps> = ({ children }) => {
  const { userId } = auth();

  if (userId) {
    redirect("/member/jobs-listing");
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[50vh]">{children}</div>
    </>
  );
};
export default SetupLayout;
