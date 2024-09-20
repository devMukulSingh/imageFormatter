"use client";
import { Button } from "@/components/ui/button";
import { IaadharPdfs } from "@/lib/types";
import { useAppDispatch } from "@/redux/hook";
import {
  removeAyushmanPdf,
  setAadharImgUrl,
} from "@/redux/reducers/persistReducer";
import { Loader, Loader2Icon, X } from "lucide-react";
import { log } from "node:console";
import React, { useEffect, useRef, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";

type Props = {
  pdf: IaadharPdfs;
};

const VerticalPdf = ({ pdf }: Props) => {
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
      console.log(canvasRef.current, croppedCanvas);

      if (croppedCanvas && canvasRef.current) {
        const { width, height } = canvasRef.current;

        croppedCanvas.height = pixelRatio * 780;
        croppedCanvas.width = pixelRatio * width;

        const ctx = croppedCanvas.getContext("2d");

        if (ctx) {
          ctx.save();
          ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(
            canvasRef.current,
            0,
            2400,
            width,
            height,
            0,
            0,
            width,
            height,
          );
          ctx.restore();
        }
        const imgUrl = croppedCanvas.toDataURL("image/jpg");
        dispatch(setAadharImgUrl({ id: pdf.id, imgUrl }));
        setFile(imgUrl);
      }
    } catch (e) {
      console.log(`Error in Crop aadhar function`, e);
    }
  };
  const onDocumentSuccess = async ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setTimeout(() => {
      a();
    }, 1000);
  };
  // const handleOnPassword = (password:string,reason) => {
  //   console.log(password, reason);

  // }
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      <div
        className="    print:h-[793px]
                        w-full
                        flex
                      text-black
                        flex-col
                        relative
                       border-red-400
       "
      >
        {/* {isOpen && ( */}
        <Document
          className={"hidden print:hidden"}
          file={pdf.file}
          onLoadSuccess={onDocumentSuccess}
        >
          <Page
            scale={3.4}
            className={"hidden print:hidden"}
            renderTextLayer={false}
            canvasRef={canvasRef}
            pageNumber={numPages}
          ></Page>
        </Document>

        {file && (
          <div className="flex flex-col justify-center items-center min-h-[793px]  ">
            <div className="flex print:hidden gap-5 ">
              <Button
                className=" print:hidden rounded-full z-40 self-center "
                onClick={() => dispatch(removeAyushmanPdf(pdf.id))}
                size={"icon"}
              >
                <X size={20} />
              </Button>
              {/* <Button
                className=" print:hidden rounded-full z-40"
                onClick={handleRotate}
              >
                { === 0 ? "Rotate" : "Normal"}
              </Button> */}
            </div>

            <img
              height={745}
              width={745}
              ref={imgRef}
              src={pdf.imgUrl}
              alt="fileImage"
              className="object-contain object-top contrast-[1.15] saturate-[1.2] rotate-90"
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

export default VerticalPdf;
// print:h-[200px] print:w-[650px]
// 90 , 180
