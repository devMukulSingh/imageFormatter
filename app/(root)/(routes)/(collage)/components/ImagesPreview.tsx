"use client";
import { useAppSelector } from "@/redux/hook";
import Buttons from "./Buttons";
import SingleImage from "./SingleImage";
import { useEffect, useRef, useState } from "react";
import CollageEOP from "./CollageEOP";

type Props = {};

const ImagesPreview = ({}: Props) => {
  const [a4PageHeight, setA4PageHeight] = useState(0);
  const a4pageRef = useRef<HTMLDivElement | null>(null);
const { collageSlice:{collageImages}   } = useAppSelector(state =>state)
  useEffect(() => {
    if (a4pageRef?.current) setA4PageHeight(a4pageRef.current?.scrollHeight);
  }, [collageImages]);

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
      justify-start
      "
    >
      <Buttons disabled={collageImages.length > 0 ? false : true} />
      <div
        ref={a4pageRef}
        className="
        border-red-200
                md:mt-[3rem]
                grid
                grid-cols-2
                gap-4
                min-h-[1122.5px]
                w-[793.7px]
                auto-rows-min
                bg-white 
                print:mt-0
                items-center
                print:items-start
                py-5
                px-8"
      >
        {collageImages.map((image, index) => {
          if (a4PageHeight > 1120 && index % 6 === 0 && index !== 0)
            return (
              <>
                <CollageEOP />
                <div className=" size-[352px] ">
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
