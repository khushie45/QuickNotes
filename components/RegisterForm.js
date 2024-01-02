import Link from "next/link";

const RegisterForm = () => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-x; font-bold my-4">Register</h1>
        <form className="flex flex-col gap-3">
          {/* <label htmlFor="fullName">Full Name</label>  */}
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Full Name"
          />
          {/* <label htmlFor="email">Email</label> */}
          <input type="email" name="email" id="email" placeholder="Email" />

          {/* <label htmlFor="password">Password</label>  */}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />

          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>

          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            Error Message
          </div>

          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;