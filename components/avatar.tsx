"use client";

import { useUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";

interface AvatarProps {
  height?: number;
  width?: number;
  user?: User;
}
const Avatar: React.FC<AvatarProps> = ({ height, width }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div>
      <Image
        alt="Avatar"
        src={user.hasImage ? user.imageUrl : "/images/placeholder.jpg"}
        width={width ? width : 35}
        height={height ? height : 35}
        className="rounded-full cursor-pointer"
      />
    </div>
  );
};

export default Avatar;
