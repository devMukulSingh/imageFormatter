import React from "react";
import UploadComp from "./components/UploadComp";
import PhotoPreview from "./components/PhotoPreview";

const page = () => {
  return (
    <div
      className="print:bg-white 
        flex 
        items-center
        gap-10
        justify-center
        py-5
        print:h-screen
        print:p-0
        h-[calc(100vh-5rem)]"
    >
      <UploadComp />
      <PhotoPreview />
    </div>
  );
};

export default page;
