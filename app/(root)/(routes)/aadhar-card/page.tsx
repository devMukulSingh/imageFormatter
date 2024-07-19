import React from 'react'
import UploadAadhar from "./components/UploadAadhar";
import PreviewAadhar from './components/PreviewAadhar';

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
      <UploadAadhar />
      <PreviewAadhar />
    </div>
  );
}

export default page