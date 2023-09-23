import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface PlateformLayoutProps {
  children: React.ReactNode;
}
const PlateformLayout: React.FC<PlateformLayoutProps> = async ({
  children,
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }
  const PrismaUser = await prismadb.user.findFirst({
    where: {
      clerkUserId: userId,
    },
    include: {
      profile: true,
      education: true,
    },
  });

  return (
    <>
      <Navbar user={PrismaUser} userId={userId} />
      <div className="min-h-[50vh]">{children}</div>
      <Footer />
    </>
  );
};
export default PlateformLayout;
