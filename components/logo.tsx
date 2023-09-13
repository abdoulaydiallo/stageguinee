import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        alt="logo"
        src="/images/logo-slim-02.svg"
        width={190}
        height={75}
        className="cursor-pointer"
      />
    </Link>
  );
};
export default Logo;
