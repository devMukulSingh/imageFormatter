"use client";
import { useEffect } from "react";
import AadharPreview from "./components/AadharPreview";
import UploadComp from "./components/UploadComp";

export default function Home() {
  return (
    <>
      <main
        className="
        print:bg-white 
        lg:flex-row
        flex
        flex-col 
        items-center
        lg:gap-8
        gap-5
        justify-center
        py-5
        print:h-screen
        print:p-0
        md:h-[calc(100vh-5rem)]
        min-h-[calc(100vh-5rem)]

        "
      >
        <UploadComp />
        <AadharPreview />
      </main>
    </>
  );
}
