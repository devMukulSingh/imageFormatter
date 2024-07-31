import React from "react";
import UploadPan from "./components/UploadPan";
import PanPreview from "./components/PanPreview";

const page = () => {
  return (
    <div
      className="print:bg-white 
        lg:gap-8
          lg:flex-row
        flex
        flex-col 
        items-center
        gap-10
        justify-center
        py-5
        print:h-screen
        print:p-0
              lg:h-[calc(100vh-5rem)]
        min-h-[calc(100vh-5rem)]
        "
    >
      <UploadPan />
      <PanPreview />
    </div>
  );
};

export default page;
