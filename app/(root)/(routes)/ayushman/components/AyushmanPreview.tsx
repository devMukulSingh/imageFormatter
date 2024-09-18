"use client";
import { useAppSelector } from "@/redux/hook";
import Buttons from "./Buttons";
import { useRef, useState } from "react";

import VerticalAyushmanPage from "./VerticalAyushmanPage";
import HorizontalAyushmanPage from "./HorizontalAyushmanPage";

type Props = {};

const AyushmanPreview = ({}: Props) => {
  const {
    persistedReducer: { ayushmanPdfs },
  } = useAppSelector((state) => state);

  const a4pageRef = useRef<HTMLDivElement | null>(null);
  const [currComp, setCurrComp] = useState<string>("horizontal");

  const renderComp = () => {
    switch (currComp) {
      case "horizontal":
        return <HorizontalAyushmanPage a4pageRef={a4pageRef} />;
      case "vertical":
        return <VerticalAyushmanPage a4pageRef={a4pageRef} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="
      flex 
      relative 
      flex-col
      print:w-screen
    bg-white 
      h-full 
      max-h-[calc(100vh-6.25rem)] 
      print:overflow-visible overflow-y-auto print:max-h-screen  overflow-x-auto 
      border-blue-400
      "
    >
      <Buttons
        currComp={currComp}
        setCurrComp={setCurrComp}
        disabled={ayushmanPdfs.length > 0 ? false : true}
      />
      {renderComp()}
    </div>
  );
};

export default AyushmanPreview;
