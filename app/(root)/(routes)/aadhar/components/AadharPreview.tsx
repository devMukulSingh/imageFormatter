"use client";
import { useAppSelector } from "@/app/redux/hook";
import Buttons from "./Buttons";
import SinglePdf from "./SinglePdf";
import { useEffect, useRef, useState } from "react";
import EndOfPage from "@/components/EndOfPage";
import { PDFDocument } from "pdf-lib";

type Props = {};

const AadharPreview = ({}: Props) => {
  const {
    persistedReducer: { aadharPdfs },
    nonPersistedReducer: { loading },
  } = useAppSelector((state) => state);

  const [a4PageHeight, setA4PageHeight] = useState(0);
  const a4pageRef = useRef<HTMLDivElement | null>(null);
  // useEffect(() => {
  //   if (a4pageRef?.current) setA4PageHeight(a4pageRef.current?.scrollHeight);
  // }, [aadharPdfs]);

  return (
    <div
      className="flex relative flex-col
       bg-white gap-5 print:max-h-screen max-h-[calc(100vh-6.25rem)] print:overflow-visible overflow-y-auto  overflow-x-auto items-center"
    >
      <Buttons disabled={aadharPdfs.length > 0 ? false : true} />
      <div
        ref={a4pageRef}
        className="
                md:mt-[3rem]
                gap-4
                min-h-[1122.5px]
                w-[793.7px]
              bg-white 
                print:mt-0
                py-5
                px-8"
      >
        {aadharPdfs.map((pdf, index) => {
          if (a4PageHeight > 1120 && index % 6 === 0 && index !== 0)
            return (
              <>
                {/* <div className=""> */}
                  <SinglePdf pdf={pdf} key={index} />;
                {/* </div> */}
              </>
            );
          return <SinglePdf pdf={pdf} key={index} />;
        })}
      </div>
    </div>
  );
};

export default AadharPreview;
// const handleOnDragEnd = (result: DropResult) => {
//   const { source, destination } = result;
//   if (!destination) return;
//   if (
//     destination?.droppableId === source.droppableId &&
//     destination.index === source.index
//   )
//     return;

//   let add, active;
// };
