import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";

const page = async () => {
  await connectToDatabase();
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return (
    <main>
      <LoginForm />
    </main>
  );
};

export default page;
