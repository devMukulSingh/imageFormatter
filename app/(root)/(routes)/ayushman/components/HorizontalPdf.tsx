"use client";
import { Button } from "@/components/ui/button";
import { IaadharPdfs } from "@/lib/types";
import { useAppDispatch } from "@/redux/hook";
import {
  removeAyushmanPdf,
  setAyushmanImgUrl,
} from "@/redux/reducers/persistReducer";
import { Loader, Loader2Icon, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";

type Props = {
  pdf: IaadharPdfs;
};

const HorizontalPdf = ({ pdf }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [numPages, setNumPages] = useState<number>();
  const [file, setFile] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useAppDispatch();
  //1190 1684
  //743 1052

  const a = async () => {
    try {
      const pixelRatio =
        typeof window !== "undefined" ? window.devicePixelRatio : 1;

      const croppedCanvas = document.createElement("canvas");

      if (croppedCanvas && canvasRef.current) {
        const { width, height } = canvasRef.current;

        croppedCanvas.height = pixelRatio * 1400;
        croppedCanvas.width = pixelRatio * width;

        const ctx = croppedCanvas.getContext("2d");

        if (ctx) {
          ctx.save();
          ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(
            canvasRef.current,
            0,
            550,
            width-400,
            height-500,
            0,
            0,
            width-400,
            height,
          );
          ctx.restore();
        }
        const imgUrl = croppedCanvas.toDataURL("image/jpg");
        dispatch(setAyushmanImgUrl({ id: pdf.id, imgUrl }));
        setFile(imgUrl);
      }
    } catch (e) {
      toast.error("Something went wrong");
      console.log(`Error in Crop aadhar function`, e);
    }
  };
  const onDocumentSuccess = async ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setTimeout(() => {
      a();
    }, 1000);
  };

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      <div
        className="    
        w-full    
        h-full
        border-black
                        flex
                      text-black
                        flex-col
                        relative
                       
       "
      >
        {/* {isOpen && ( */}
        <Document
          className={"hidden print:hidden"}
          file={pdf.file}
          onLoadSuccess={onDocumentSuccess}
        >
          <Page
            scale={5}
            className={"hidden print:hidden"}
            renderTextLayer={false}
            canvasRef={canvasRef}
            pageNumber={numPages}
          ></Page>
        </Document>

        {file && (
          <div className="flex flex-col  ">
            <Button
              className=" print:hidden absolute top-0 rounded-full z-40 self-center "
              onClick={() => dispatch(removeAyushmanPdf(pdf.id))}
              size={"icon"}
            >
              <X size={20} />
            </Button>
            {/* <Button
                className=" print:hidden rounded-full z-40"
                onClick={handleRotate}
              >
                {rotation === 0 ? "Rotate" : "Normal"}
              </Button> */}

            <img
              ref={imgRef}
              src={pdf.imgUrl}
              alt="fileImage"
              className="object-contain object-top contrast-[1.15] saturate-[1.2] "
            />
          </div>
        )}
        {!file && (
          <div className="flex justify-center print:hidden">
            <Loader2Icon size={25} className="animate-spin " />
          </div>
          // <Button className="print:hidden" onClick={a}>
          //   Crop
          // </Button>
        )}
      </div>
    </>
  );
};

export default HorizontalPdf;
// print:h-[200px] print:w-[650px]
// 90 , 180
