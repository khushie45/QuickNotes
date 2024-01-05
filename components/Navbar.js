"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const pathName = usePathname();
  const { data: session } = useSession();
  return (
    <>
      {(pathName === "/" || pathName === "/register") && (
        <nav className="flex justify-end items-center gap-4 p-4 bg-green-600 text-white font-bold">
          <Link href={"/register"}>Register</Link>
          <Link href={"/"}>Login In</Link>
          <Link href={"/dashboard"}>Dashboard</Link>
        </nav>
      )}

      {pathName === "/dashboard" && (
        <nav className="flex justify-between items-center gap-4 p-4 bg-green-600 text-white font-bold">
          <p>Welcome {session?.user?.name}</p>
          <button onClick={() => signOut()}>Log Out</button>
        </nav>
      )}
    </>
  );
};

export default Navbar;
