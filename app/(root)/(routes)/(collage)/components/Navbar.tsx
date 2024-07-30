import React from "react";
import Navlinks from "./Navlinks";

const Navbar = () => {
  return (
    <div className="print:hidden z-40 fixed flex  items-center shadow-lg justify-between  top-0 w-screen bg-[#dff9fb] h-20 px-10">
      <div className="flex  items-center justify-between sm:w-1/2 w-full">
        <h1 className="font-medium  text-4xl">Image Formatter</h1>
        <Navlinks />
      </div>
    </div>
  );
};

export default Navbar;
