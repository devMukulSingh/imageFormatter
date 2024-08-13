"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { removeImage } from "@/app/redux/reducers/persistReducer";
import { Button } from "@/components/ui/button";
import { base64Images, IaadharPdfs } from "@/lib/types";
import { X } from "lucide-react";
import React, {
  MutableRefObject,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import "react-image-crop/dist/ReactCrop.css";
import EditDialog from "./EditDialog";
import Image from "next/image";
import { PDFDocument } from "pdf-lib";
import FileSaver from "file-saver";
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from "pdfjs-dist";
import { fromPath, fromBase64 } from "pdf2pic";
// import * as PDFJS from "../../pdfjs-dist/types/src/pdf";
// import * as pdfjs from "../../../../../node_modules/pdfjs-dist/build/pdf.min.mjs";
// await import("pdfjs-dist/build/pdf.worker.min.mjs");
// import * as pdfjsLib from "pdfjs-dist/webpack";
import axios from "axios";
// import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.min.mjs`;
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;

type Props = {
  pdf: IaadharPdfs;
};

const SinglPdf = ({ pdf }: Props) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [numPages, setNumPages] = useState<number>();
  const [file, setFile] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(true);

  //1190 1684
  //743 1052

  useEffect(() => {
    // a();
  }, [numPages]);
  const a = async () => {
    const pixelRatio = window.devicePixelRatio;

    const croppedCanvas = document.createElement("canvas");

    if (croppedCanvas && canvasRef.current) {

      console.log(
        canvasRef.current.clientHeight,
        canvasRef.current.offsetHeight
      );

      const { width, height } = canvasRef.current;

      croppedCanvas.height = pixelRatio * 460;
      croppedCanvas.width = pixelRatio * width;

      const ctx = croppedCanvas.getContext("2d");

      if (ctx) {
        ctx.save();
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(
          canvasRef.current,
          0,
          1480,
          width,
          height,
          0,
          0,
          width,
          height
        );
        ctx.restore();
      }
      console.log(croppedCanvas);

      const imgUrl = croppedCanvas.toDataURL("image/jpg");

      setFile(imgUrl);

      // setIsOpen(false);
    }
  };
  const onDocumentSuccess = async ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

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
        className="     h-full
                        w-full
                        flex
                        text-black
                        flex-col
                        print:border-none
                        relative
       "
      >
        {/* {isOpen && ( */}
        <Document
          className={"hidden"}
          file={pdf.file}
          onLoadSuccess={onDocumentSuccess}
        >
          <Page
            scale={1.3}
            className={"hidden"}
            renderTextLayer={false}
            canvasRef={canvasRef}
            pageNumber={numPages}
          ></Page>
        </Document>
        {/* )} */}
        {/* <canvas ref={croppedCanvas}></canvas> */}

        {file && (
          // <div className="w-[800px] h-[300px] relative">
          <img
            ref={imgRef}
            src={file}
            alt="fileImage"
            className="object-contain object-top"
          />
          // </div>
        )}
        <Button className="print:hidden" onClick={a}>
          Crop
        </Button>
      </div>
    </>
  );
};

export default SinglPdf;
