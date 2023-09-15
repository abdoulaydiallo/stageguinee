import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { auth, currentUser, useUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface PlateformLayoutProps {
  children: React.ReactNode;
}

const PlateformLayout: React.FC<PlateformLayoutProps> = async ({
  children,
}) => {
  const { userId } = auth();

  const user: User | null = await currentUser();

  if (!userId) {
    redirect("/");
  }

  return (
    <>
      <Navbar user={user} userId={userId} />
      <div className="min-h-[50vh]">{children}</div>
      <Footer />
    </>
  );
};
export default PlateformLayout;
