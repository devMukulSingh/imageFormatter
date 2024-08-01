"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import FileSaver, { saveAs } from "file-saver";
import {
  Column,
  ColumnBreak,
  Document,
  ImageRun,
  Packer,
  PageBreak,
  Paragraph,
  Tab,
  TextRun,
} from "docx";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Download, Printer } from "lucide-react";
import {
  pushBase64Pdfs,
  setBase64Images,

  setPassportSizeBase64Image,
} from "@/app/redux/reducers/persistReducer";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { base64Images } from "@/lib/types";
import { getBase64Image } from "@/lib/hooks";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { setLoading } from "@/app/redux/reducers/nonPersistReducer";

const UploadAadhar = () => {
  const dispatch = useAppDispatch();
  // const {loading } = useAppSelector((state) => state);
  const sectionProperties = {
    page: {
      margin: {
        left: 400,
        right: 400,
        top: 500,
        bottom: 500,
      },
    },
    column: {
      space: 10,
      count: 2,
      equalWidth: true,
      children: [
        new Column({
          width: 720 * 10,
          space: 10,
        }),
        new Column({
          width: 720 * 10,
          space: 10,
        }),
      ],
    },
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      dispatch(setLoading(true));
      const file = e?.target?.files?.[0];
      console.log(file);
      if (file) {
        const base64Pdf = await getBase64Image(file);
        const pdfDoc = await PDFDocument.load(base64Pdf, {
          ignoreEncryption: true,
        });
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();
        firstPage.setHeight(300);
        firstPage.setWidth(600);
        const base64PdfEdited = await pdfDoc.saveAsBase64({ dataUri: true });
        console.log(base64PdfEdited);

        const id = Math.floor(Math.random() * 1000);
        dispatch(
          pushBase64Pdfs({
            id,
            file: base64PdfEdited,
          })
        );

        await pdfDoc.save();
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again");
      console.log(`Error in handleChange`, e);
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  return (
    <>
      <div
        className="
        print:hidden
        flex
        h-fit 
        flex-col
        items-center 
        gap-10 
        shadow-2xl 
        hover:scale-105
        transition 
        border 
        p-10 
        rounded-lg 
        bg-purple-400"
      >
        <Label className="text-lg text-white font-semibold" htmlFor="picture">
          Upload Images
        </Label>
        <Input
          onChange={handleChange}
          className="bg-slate-200 cursor-pointer"
          type="file"
          multiple
          // disabled={loading}
        />
        <div className="flex gap-5">
          {/* <Button disabled={loading} onClick={handleDownload}>
            <Download size={20} className="mr-2" />
            Download DOCX
          </Button> */}
        </div>
      </div>
    </>
  );
};

export default UploadAadhar;
