import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-end items-center gap-4 p-4 bg-green-600 text-white font-bold">
      <div>
        <Link href={"/register"}>Register</Link>
      </div>
      <div>
        <Link href={"/"}>Login In</Link>
      </div>
      <div>
        <Link href={"/dashboard"}>Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
