import React from "react";
import UploadComp from "./components/UploadComp";
import PhotoPreview from "./components/PhotoPreview";

const page = () => {
  return (
    <div
      className="
        print:bg-white 
        lg:flex-row
        flex
        flex-col 
        gap-5
        lg:gap-8
        items-center
        justify-center
        py-5
        print:h-screen
        print:p-0
        lg:h-[calc(100vh-5rem)]
        min-h-[calc(100vh-5rem)]
        "
    >
      <UploadComp />
      <PhotoPreview />
    </div>
  );
};

export default page;
