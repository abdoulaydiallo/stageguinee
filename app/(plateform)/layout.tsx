import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { auth, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface PlateformLayoutProps {
  children: React.ReactNode;
}

const PlateformLayout: React.FC<PlateformLayoutProps> = ({ children }) => {
  const { userId, user } = auth();

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
