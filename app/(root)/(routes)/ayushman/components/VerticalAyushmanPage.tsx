import { useAppSelector } from "@/redux/hook";
import React, { Fragment, RefObject, useEffect, useState } from "react";
import EndOfPage from "./HorizontalEOF";
import VerticalEOF from "./VerticalEOF";
import dynamic from "next/dynamic";
const VerticalPdf = dynamic(() => import("./VerticalPdf"), {
  ssr: false,
});
type Props = {
  a4pageRef: RefObject<HTMLDivElement>;
};

const VerticalAyushmanPage = ({ a4pageRef }: Props) => {
  const {
    persistedReducer: { ayushmanPdfs },
  } = useAppSelector((state) => state);
  const [a4PageHeight, setA4PageHeight] = useState(0);
  useEffect(() => {
    if (a4pageRef?.current) setA4PageHeight(a4pageRef.current?.scrollHeight);
    console.log(a4pageRef.current?.scrollHeight);
  }, [ayushmanPdfs]);
  return (
    <div
      ref={a4pageRef}
      className="
              w-[95vw]
              h-[793px]
            bg-white 
              print:mt-0
              py-[12px]
              px-4
              flex
              print:py-0
              flex-col

                "
    >
      {ayushmanPdfs.map((pdf, index) => {
        if (index === 0) {
          return <VerticalPdf pdf={pdf} key={index} />;
        }

        return (
          <div key={index}>
            <VerticalEOF />
            <VerticalPdf pdf={pdf} key={index} />
          </div>
        );
      })}
    </div>
  );
};

export default VerticalAyushmanPage;
