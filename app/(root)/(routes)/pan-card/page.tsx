import React from "react";
import UploadPan from "./components/UploadPan";
import PanPreview from "./components/PanPreview";

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
      <UploadPan />
      <PanPreview />
    </div>
  );
};

export default page;
