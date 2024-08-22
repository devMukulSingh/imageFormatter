"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
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
  pushPassportSizeBase64Images,
  setBase64Images,
  setPassportSizeBase64Image,
} from  "@/redux/reducers/persistReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { base64Images } from "@/lib/types";
import { getBase64Image } from "@/lib/hooks";
import {
  setLoading,
  setPassportInputRef,
} from "@/redux/reducers/nonPersistReducer";

const UploadComp = () => {
  const passportInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const {
    persistedReducer: { passportSizeBase64Images: images },
    nonPersistedReducer: { loading },
  } = useAppSelector((state) => state);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      dispatch(setLoading(true));
      const files = e?.target?.files;
      let base64PassportSizeImages = [];
      if (files) {
        for (let j = 0; j < files.length; j++) {
          if (files[j].type.slice(0, 5) !== "image") {
            toast.error("Only images allowed");
            return;
          }
          const imgUrl = URL.createObjectURL(files[j]);
          for (let i = 0; i < 6; i++) {
            const imageId = Math.floor(Math.random() * 1000);
            base64PassportSizeImages.push({
              id: imageId,
              img: imgUrl,
            });
          }
        }
        // const base64Image = await getBase64Image(file);
        dispatch(pushPassportSizeBase64Images(base64PassportSizeImages));
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again");
      console.log(`Error in handleChange`);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setPassportInputRef(passportInputRef.current));
  }, []);

  return (
    <>
      <div
        className="
        print:hidden
        flex
        h-fit 
        flex-col
        items-center 
        gap-8
        shadow-2xl 
        w-[18rem]
        px-8 
        py-10
        hover:scale-105
        transition 
        border 
        rounded-lg 
        bg-purple-400"
      >
        <Label className="text-lg text-white font-semibold" htmlFor="picture">
          Upload Images
        </Label>
        <Input
          ref={passportInputRef}
          onChange={handleChange}
          className="bg-slate-200 cursor-pointer  h-28 "
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
    </>
  );
};

export default UploadComp;
