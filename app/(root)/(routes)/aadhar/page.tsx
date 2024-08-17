import AadharPreview from "./components/AadharPreview";
import UploadComp from "./components/UploadComp";

export default function Home() {
  return (
    <>
      <main
        className="
        print:bg-white 
        border-4
        border-blue-900
        flex
        flex-col
        print:items-start 
        print:max-h-screen
        lg:gap-8
        gap-5
        print:gap-0
        print:h-screen
        print:py-0
        py-5
        print:px-0
        min-h-[calc(100vh-5rem)]

        "
      >
        <UploadComp />
        <AadharPreview />
      </main>
    </>
  );
}
