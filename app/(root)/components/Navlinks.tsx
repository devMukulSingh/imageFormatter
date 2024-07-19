"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlinks = () => {
  const pathName = usePathname();
  const navLinks = [
    {
      title: "Collage",
      link: "/",
      isActive: pathName.endsWith("/"),
    },
    {
      title: "Passport photo",
      link: "/passport-photo",
      isActive: pathName.endsWith("/passport-photo"),
    },
    // {
    //   title: "Aadhar card",
    //   link: "/aadhar-card",
    //   isActive: pathName.endsWith("/aadhar-card"),
    // },
  ];
  return (
    <div className="flex gap-5">
      {navLinks.map((link, index) => (
        <Link
          className={`transition-all ${link.isActive ? "text-lg font-bold underline underline-offset-8 text-neutral-900" : "font-semibold text-neutral-500"} `}
          href={link.link}
          key={index}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default Navlinks;
