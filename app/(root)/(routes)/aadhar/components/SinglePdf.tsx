"use client";
import { Button } from "@/components/ui/button";
import { IaadharPdfs } from "@/lib/types";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";


type Props = {
  pdf: IaadharPdfs;
};

const SinglPdf = ({ pdf }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [numPages, setNumPages] = useState<number>();
  const [file, setFile] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(true);

  //1190 1684
  //743 1052

  const a = async () => {
    const pixelRatio =
      typeof window !== "undefined" ? window.devicePixelRatio : 1;

    const croppedCanvas = document.createElement("canvas");

    if (croppedCanvas && canvasRef.current) {
      const { width, height } = canvasRef.current;

      croppedCanvas.height = pixelRatio * 300;
      croppedCanvas.width = pixelRatio * width;

      const ctx = croppedCanvas.getContext("2d");

      if (ctx) {
        ctx.save();
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(
          canvasRef.current,
          0,
          910,
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

      setFile(imgUrl);
    }
  };
  const onDocumentSuccess = async ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  useEffect(() => {
    // pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      {/* {openDialog && (
        <EditDialog
          image={image}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      )} */}
      <div
        className="    
                        flex
                        text-black
                        flex-col
                        print:border-none
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
            scale={1.3}
            className={"hidden print:hidden"}
            renderTextLayer={false}
            canvasRef={canvasRef}
            pageNumber={numPages}
          ></Page>
        </Document>

        {file && (
          <img
            ref={imgRef}
            src={file}
            alt="fileImage"
            className="object-contain object-top"
          />
        )}
        {!file && (
          <Button className="print:hidden" onClick={a}>
            Crop
          </Button>
        )}
      </div>
    </>
  );
};

export default SinglPdf;
