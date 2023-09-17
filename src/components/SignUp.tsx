import React, { useState } from "react";
import { Link, navigate } from "raviger";
import { login, signup } from "../utils/apiUtils";

const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signup(username, email, password1, password2);
      const data = await login(username, password1);
      if (data) {
        localStorage.setItem("token", data.token);
        window.location.reload();
        navigate("/");
        
      } else {
        console.log("signup failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="bg-slate-300 rounded-xl p-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                User Name
              </label>
              <div className="mt-2">
                <input
                   required
                   type="text"
                   id="username"
                   name="username"
                   value={username}
                   placeholder="Username"
                   autoComplete="username"
                   onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                   required
                   type="text"
                   id="email"
                   name="email"
                   value={email}
                   placeholder="email"
                   autoComplete="email"
                   onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password1"
                  name="password1"
                  type="password"
                  value={password1}
                  placeholder="Password"
                  onChange={(e) => setPassword1(e.target.value)}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  value={password2}
                  placeholder="Confirm Password"
                  onChange={(e) => setPassword2(e.target.value)}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                Sign up
              </button>
            </div> 
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an acccount?
            <Link
              href="/signin"
              className="font-semibold leading-6 p-1 text-slate-900 hover:text-slate-800"
            >
              Log in
            </Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
