'use client'
import ImagesPreview from "./components/ImagesPreview";
import UploadComp from "./components/UploadComp";

export default function Home() {

  return (
    <>
      <main
        className="
        print:bg-white 
        flex 
        items-center
        gap-10
        justify-center
        py-5
        print:h-screen
        print:p-0
        h-[calc(100vh-5rem)]
        "
      >
        <UploadComp  />
        <ImagesPreview/>
      </main>
    </>
  );
}
