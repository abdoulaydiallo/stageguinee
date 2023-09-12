import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const Avatar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div>
      <Image
        alt="Avatar"
        src={user?.imageUrl}
        width={35}
        height={35}
        className="rounded-full cursor-pointer"
      />
    </div>
  );
};

export default Avatar;
