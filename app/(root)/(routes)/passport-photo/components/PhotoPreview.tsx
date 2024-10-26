"use client";
import { useAppSelector } from "@/redux/hook";
import Buttons from "./Buttons";
import { useEffect, useRef, useState } from "react";
import HorizontalPhoto from "./HorizontalPhoto";
import VerticalPhoto from "./VerticalPhoto";
import SingleVerticalPhoto from "./SingleVerticalPhoto";

type Props = {};

const PhotoPreview = ({}: Props) => {
  const [a4PageHeight, setA4PageHeight] = useState(0);
  const [currentComp, setCurrentComp] = useState("horizontal");
  const {
    passportPhotoSlice: { passportSizePhotos },
  } = useAppSelector((state) => state);
  const a4pageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (a4pageRef.current) setA4PageHeight(a4pageRef.current?.scrollHeight);
    console.log(a4pageRef.current?.scrollHeight);
  }, [passportSizePhotos]);
  const renderComponent = () => {
    switch (currentComp) {
      case "vertical":
        return (
          <VerticalPhoto a4PageHeight={a4PageHeight} a4pageRef={a4pageRef} />
        );
      case "horizontal":
        return (
          <HorizontalPhoto a4PageHeight={a4PageHeight} a4pageRef={a4pageRef} />
        );
      case "singleVertical":
        return (
          <SingleVerticalPhoto
            a4PageHeight={a4PageHeight}
            a4pageRef={a4pageRef}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="flex relative flex-col gap-5 print:h-min print:w-fit bg-white h-[calc(100vh-6.25rem)]  border-red-400 print:overflow-visible  overflow-y-auto">
      <Buttons
        currentComp={currentComp}
        setCurrentComp={setCurrentComp}
        disabled={passportSizePhotos.length > 0 ? false : true}
      />
      {renderComponent()}
    </div>
  );
};
export default PhotoPreview;
