import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface PlateformLayoutProps {
  children: React.ReactNode;
}

const PlateformLayout: React.FC<PlateformLayoutProps> = ({ children }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <>
      <Navbar userId={userId} />
      <div className="min-h-[50vh]">{children}</div>
    </>
  );
};
export default PlateformLayout;
