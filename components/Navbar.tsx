import React from "react";
import Navlinks from "./Navlinks";

const Navbar = () => {
  return (
    <div className="print:hidden z-40 fixed flex  items-center shadow-lg justify-center  top-0 w-full bg-[#dff9fb] h-20 px-10">
        {/* <h1 className="font-medium whitespace-nowrap  text-2xl sm:text-3xl">
          Image Formatter
        </h1> */}
        <Navlinks />
    </div>
  );
};

export default Navbar;
