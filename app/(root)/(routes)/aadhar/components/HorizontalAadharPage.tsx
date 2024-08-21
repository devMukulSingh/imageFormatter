import { useAppSelector } from "@/redux/hook";
import React, { RefObject, useEffect, useState } from "react";
import EndOfPage from "./HorizontalEOF";
import dynamic from "next/dynamic";
const HorizontalPdf = dynamic(() => import("./HorizontalPdf"), {
  ssr: false,
});
type Props = {
  a4pageRef: RefObject<HTMLDivElement>;
};

const HorizontalAadharPage = ({ a4pageRef }: Props) => {
  const {
    persistedReducer: { aadharPdfs },
  } = useAppSelector((state) => state);
  const [a4PageHeight, setA4PageHeight] = useState(0);
  useEffect(() => {
    if (a4pageRef?.current) setA4PageHeight(a4pageRef.current?.scrollHeight);
  }, [aadharPdfs]);
  return (
    <div
      ref={a4pageRef}
      className="
              w-[95vw]
              min-h-[1055px]
            bg-white 
              print:mt-0
              py-[14px]
              px-4
              grid
              grid-cols-1
              auto-rows-min
                "
    >
      {aadharPdfs.map((pdf, index) => {
        if (a4PageHeight > 1120 && index % 5 === 0 && index !== 0)
          return (
            <>
              <EndOfPage />
              <div className="h-fit ">
                <HorizontalPdf pdf={pdf} key={index} />
              </div>
            </>
          );
        return <HorizontalPdf pdf={pdf} key={index} />;
      })}
    </div>
  );
};

export default HorizontalAadharPage;
