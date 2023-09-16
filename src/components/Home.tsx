import { Link } from "raviger";
import React from "react";
import { User } from "../types/UserTypes";

export default function Home({ currentUser }: { currentUser: User }) {
  return (
    <div className="flex flex-col items-center h-full text-gray-900 justify-center">
       <div className="flex">This is home page</div> 
      
      <button
        className="flex m-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        <span className="hidden sm:block">Sign out</span>
      </button>

    </div>
    
  );
}
