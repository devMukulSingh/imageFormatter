"use client";
import { useAppSelector } from "@/redux/hook";
import Buttons from "./Buttons";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import EndOfPage from "./EndOfPage";

const SinglePdf = dynamic(() => import("./SinglePdf"), {
  ssr: false,
});

type Props = {};

const AadharPreview = ({}: Props) => {
  const {
    persistedReducer: { aadharPdfs },
  } = useAppSelector((state) => state);
  console.log(aadharPdfs);

  const [a4PageHeight, setA4PageHeight] = useState(0);
  const a4pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (a4pageRef?.current) setA4PageHeight(a4pageRef.current?.scrollHeight);
    console.log(a4pageRef.current?.scrollHeight);
  }, [aadharPdfs]);

  return (
    <div
      className="flex relative flex-col
       bg-white gap- print:max-h-screen max-h-[calc(100vh-6.25rem)] print:overflow-visible overflow-y-auto  overflow-x-auto items-center"
    >
      <Buttons disabled={aadharPdfs.length > 0 ? false : true} />
      <div
        ref={a4pageRef}
        className="
                md:mt-[3rem]
                w-[95vw]
                min-h-[1122.5px]
              bg-white 
                print:mt-0
                py-4
                px-4"
      >
        {aadharPdfs.map((pdf, index) => {
          if (a4PageHeight > 1120 && index % 5 === 0 && index !== 0)
            return (
              <>
                <EndOfPage />
                <div className="h-fit ">
                  <SinglePdf pdf={pdf} key={index} />
                </div>
              </>
            );
          return <SinglePdf pdf={pdf} key={index} />;
        })}
      </div>
    </div>
  );
};

export default AadharPreview;
