"use client";

import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        alt="logo"
        src="/images/logo-sliim.png"
        width={190}
        height={75}
        className="cursor-pointer"
      />
    </Link>
  );
};
export default Logo;
