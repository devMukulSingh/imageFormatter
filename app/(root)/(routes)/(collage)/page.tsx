"use client";
import ImagesPreview from "./components/ImagesPreview";
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
        <ImagesPreview />
      </main>
    </>
  );
}
