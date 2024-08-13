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
    {
      title: "Pan card",
      link: "/pan-card",
      isActive: pathName.endsWith("/pan-card"),
    },
    // {
    //   title: "Aadhar card",
    //   link: "/aadhar",
    //   isActive: pathName.endsWith("/aadhar"),
    // },
  ];
  return (
    <div className="flex gap-5">
      {navLinks.map((link, index) => (
        <Link
          prefetch={false}
          className={`transition-all whitespace-nowrap ${link.isActive ? "text-lg font-bold underline underline-offset-8 text-neutral-900" : "font-semibold text-neutral-500"} `}
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
