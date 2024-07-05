
import ImagesPage from "./components/ImagesPage";
import UploadComp from "./components/UploadComp";

export default function Home() {


  return (
    <>
      <main
        className="
        print:bg-white 
        bg-gradient-to-r 
        from-indigo-500 
        via-purple-500 
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
        <UploadComp />
        <ImagesPage />

      </main>
    </>
  );
}
