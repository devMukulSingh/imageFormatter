"use client";
import { useAppSelector } from "@/redux/hook";
import Buttons from "./Buttons";
import {  useRef, useState } from "react";


import VerticalAadharPage from "./VerticalAadharPage";
import HorizontalAadharPage from "./HorizontalAadharPage";

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
