import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs/app-beta";

const Home= () => {
  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <div className="text-center">
      <div className="text-lg font-light text-[#0d1872] mb-4">Bienvenue</div>
      <div className='text-5xl font-bold text-[#0d1872]'>Stage Guinée</div>
      <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}

export default Home;
