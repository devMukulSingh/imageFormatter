"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";
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
  pushAadharPdfs,
  pushBase64Images,
  setBase64Images,
  setCollageFiles,
} from "@/app/redux/reducers/persistReducer";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { base64Images, IaadharPdfs } from "@/lib/types";
import { getBase64Image } from "@/lib/hooks";
import {
  setCollageInputRef,
  setLoading,
} from "@/app/redux/reducers/nonPersistReducer";

type Props = {
  // fileRef: RefObject<HTMLInputElement>;
};

const UploadComp = ({}: Props) => {
  const collageInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const {
    nonPersistedReducer: { loading },
    persistedReducer: { base64Images: images },
  } = useAppSelector((state) => state);


  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      let aadharPdfs: IaadharPdfs[] | null = [];
      const files = e?.target?.files;
      if (files) {
        dispatch(setLoading(true));
        for (let i = 0; i < files?.length; i++) {
          // const base64Pdf = await getBase64Image(files[i]);
          // if (files[i].type.slice(0, 5) !== "image") {
          //   toast.error("Only images allowed");
          //   break;
          // }
          const imgUrl = URL.createObjectURL(files[i]);

          const pdfId = Math.floor(Math.random() * 100000);
          aadharPdfs.push({
            id: pdfId,
            file: imgUrl,
          });
        
        dispatch(pushAadharPdfs(aadharPdfs));
      }
    }
    } catch (e) {
      toast.error("Something went wrong. Please try again");
      console.log(`Error in handleChange`);
    } finally {
      dispatch(setLoading(false));
    }
  };


  useEffect(() => {
    // dispatch(setCollageInputRef(collageInputRef.current));
  }, []);
  return (
    <div
      className="
        print:hidden
        flex
        items-center
        h-fit 
        w-[18rem]
        flex-col 
        gap-8
        shadow-2xl 
        hover:scale-105
        transition 
        border 
        px-8 
        py-10
        rounded-lg 
        bg-purple-400"
    >
      <Label className="text-lg text-white" htmlFor="picture">
        Upload aadhar
      </Label>
      <Input
        ref={collageInputRef}
        onChange={handleChange}
        className="bg-slate-200 cursor-pointer h-28 "
        type="file"
        multiple
        disabled={loading}
      />
      {/* <div className="flex gap-5">
        <Button disabled={loading} onClick={handleDownload}>
          <Download size={20} className="mr-2" />
          Download DOCX
        </Button>
      </div> */}
    </div>
  );
};

export default UploadComp;
