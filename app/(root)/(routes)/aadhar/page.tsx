import AadharPreview from "./components/AadharPreview";
import UploadComp from "./components/UploadComp";

export default function Home() {
  return (
    <>
      <main
        className="
        print:bg-white 
        flex
        flex-col 
        items-center
        lg:gap-8
        gap-5
        justify-center
        py-5
        print:h-screen
        print:p-0
        min-h-[calc(100vh-5rem)]

        "
      >
        <UploadComp />
        <AadharPreview />
      </main>
    </>
  );
}
