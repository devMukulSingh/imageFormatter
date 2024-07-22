"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { removeAadharPdf, removePassportSizeImage } from "@/app/redux/slice";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import Buttons from "./Buttons";

type Props = {};

const PreviewAadhar = ({}: Props) => {
  const dispatch = useAppDispatch();
  const { aadharPdfs, loading } = useAppSelector((state) => state);

  return (
    <div className="flex relative flex-col bg-white gap-5 print:max-h-screen max-h-[calc(100vh-6.25rem)] print:overflow-visible overflow-y-auto">
  <Buttons disabled={aadharPdfs.length < 0 }/>

      <div
        className="
        mt-[3rem]
        gap-x-[6px]
        gap-y-2
        min-h-[1122.5px]
        w-[793.7px]
        bg-white 
        print:m-0
        py-5
        px-5
        
        "
      >
        {aadharPdfs.map((pdf, index) => (
          <div
            draggable
            key={index}
            className="
              flex
              flex-col
            "
          >
            <Button
              size={"icon"}
              variant={"outline"}
              className="self-center z-20 text-black rounded-full size-6 mt-1 print:hidden"
            >
              <X
                onClick={() => dispatch(removeAadharPdf(pdf.id))}
                className=""
                size={15}
              />
            </Button>
            <iframe src={pdf.file} style={{ width: 718, height: 700 }} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default PreviewAadhar;
