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
        print:gap-0
        print:justify-normal
        gap-5
        justify-center
        py-5
        print:px-0
        print:py-0
        md:h-[calc(100vh-5rem)]
        min-h-[calc(100vh-5rem)]
      border-black
        "
      >
        <UploadComp />
        <ImagesPreview />
      </main>
    </>
  );
}
