"use client";
import { useAppSelector } from "@/redux/hook";
import Buttons from "./Buttons";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import EndOfPage from "./HorizontalEOF";
import HorizontalAadharPage from "./HorizontalAadharPage";
import VerticalAadharPage from "./VerticalAadharPage";

type Props = {};

const AadharPreview = ({}: Props) => {
  const {
    persistedReducer: { aadharPdfs },
  } = useAppSelector((state) => state);

  const a4pageRef = useRef<HTMLDivElement | null>(null);
  const [currComp, setCurrComp] = useState<string>("horizontal");

  const renderComp = () => {
    switch (currComp) {
      case "horizontal":
        return <HorizontalAadharPage a4pageRef={a4pageRef} />;
      case "vertical":
        return <VerticalAadharPage a4pageRef={a4pageRef} />;
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
      print:overflow-visible overflow-y-auto print:max-h-screen  overflow-x-auto items-center"
    >
      <Buttons
        currComp={currComp}
        setCurrComp={setCurrComp}
        disabled={aadharPdfs.length > 0 ? false : true}
      />
      {renderComp()}
    </div>
  );
};

export default AadharPreview;
