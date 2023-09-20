import React from "react";
import { NavBar } from "./NavBar";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-100 min-h-screen font-sans">
      <NavBar />
      <div className="w-full mx-auto bg-white  rounded-xl">
        {props.children}
      </div>
    </div>
  );
}
