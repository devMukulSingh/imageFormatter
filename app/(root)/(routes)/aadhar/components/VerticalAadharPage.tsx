import { useAppSelector } from "@/redux/hook";
import React, { RefObject, useEffect, useState } from "react";
import VerticalPdf from "./VerticalPdf";
import EndOfPage from "./HorizontalEOF";
import VerticalEOF from "./VerticalEOF";

type Props = {
  a4pageRef: RefObject<HTMLDivElement>;
};

const VerticalAadharPage = ({ a4pageRef }: Props) => {
  const {
    persistedReducer: { aadharPdfs },
  } = useAppSelector((state) => state);
  const [a4PageHeight, setA4PageHeight] = useState(0);
  useEffect(() => {
    if (a4pageRef?.current) setA4PageHeight(a4pageRef.current?.scrollHeight);
    console.log(a4pageRef.current?.scrollHeight);
  }, [aadharPdfs]);
  return (
    <div
      ref={a4pageRef}
      className="
              w-[95vw]
              min-h-[793px]
            bg-white 
              print:mt-0
              py-[12px]
              px-4
              flex
              flex-col
                "
    >
      {aadharPdfs.map((pdf, index) => {
        // if (a4PageHeight > 805 && index % 1 === 0 && index !== 0)
        //   return (
        //     <>
        //       <EndOfPage />
        //       <div className="h-fit ">
        //         <VerticalPdf  pdf={pdf} key={index} />
        //       </div>
        //     </>
        //   );
        return (
          <div key={index}>
            <VerticalPdf pdf={pdf} key={index} />
            <VerticalEOF />
          </div>
        );
      })}
    </div>
  );
};

export default VerticalAadharPage;
