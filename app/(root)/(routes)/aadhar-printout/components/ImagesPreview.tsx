"use client";
import { useAppSelector } from "@/redux/hook";
import Buttons from "./Buttons";
import SingleImage from "./SingleImage";
import { useEffect, useRef, useState } from "react";
import EndOfPage from "@/components/EndOfPage";

type Props = {};

const ImagesPreview = ({}: Props) => {
  const [a4PageHeight, setA4PageHeight] = useState(0);
  const a4pageRef = useRef<HTMLDivElement | null>(null);
  const {
    persistedReducer: { aadharPrintoutImages },
  } = useAppSelector((state) => state);

  useEffect(() => {
    if (a4pageRef?.current) setA4PageHeight(a4pageRef.current?.scrollHeight);
  }, [aadharPrintoutImages]);

  return (
    <div
      className="flex 
      relative
      flex-col
      border-blue-400
     bg-white
      gap-5
      print:gap-0
      max-h-[calc(100vh-6.25rem)] 
      print:overflow-visible 
      overflow-y-auto  
      overflow-x-auto 
      items-center
      print:items-start
      "
    >
      <Buttons disabled={aadharPrintoutImages.length > 0 ? false : true} />
      <div
        ref={a4pageRef}
        className="
        border-red-200
                md:mt-[3rem]
                grid
                grid-cols-1
                items-center
                h-[1122.5px]
                auto-rows-min
                min-h-[1122.5px]
                w-[793.7px]
                bg-white 
                print:mt-0
                py-[8px]
                px-8"
      >
        {aadharPrintoutImages.map((image, index) => {
          if (a4PageHeight > 1120 && index % 2 === 0 && index !== 0)
            return (
              <>
                <EndOfPage />
                <div className="size-[352px] justify-self-center">
                  <SingleImage image={image} key={index} />;
                </div>
              </>
            );
          return <SingleImage image={image} key={index} />;
        })}
      </div>
    </div>
  );
};

export default ImagesPreview;
