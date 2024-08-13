import { ReactNode } from "react";
import Navbar from "../../components/Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div
        className="mt-20 print:mt-0 bg-gradient-to-r 
        from-indigo-500 
        via-purple-500 min-h-[calc(100vh-5rem)] text-white"
      >
        {children}
      </div>
    </>
  );
}
