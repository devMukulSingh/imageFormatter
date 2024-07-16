import Link from "next/link";
import React from "react";

const Navbar = () => {
  const navLinks = [
    {
      title:'Collage',
      link:'/'
    },
    {
      title:'Passport photo',
      link:'/passport-photo'
    },
  ]
  return (
    <div className="print:hidden z-40 fixed flex  items-center shadow-lg justify-between  top-0 w-screen bg-[#dff9fb] h-20 px-10">
      <div className="flex  items-center justify-between sm:w-1/2 w-full">
        <h1 className="font-medium  text-4xl">Image Formatter</h1>
        <div className="flex gap-5">
          {navLinks.map((link, index) => (
            <Link className="font-semibold" href={link.link} key={index}>
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
