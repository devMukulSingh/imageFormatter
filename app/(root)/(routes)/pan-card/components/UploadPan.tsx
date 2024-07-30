"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
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
  setBase64Images,
  setBase64Pan,
  setLoading,
  setPassportSizeBase64Image,
} from "@/app/redux/slice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { base64Images } from "@/lib/types";
import { getBase64Image } from "@/lib/hooks";

const UploadPan = () => {
  const dispatch = useAppDispatch();
  const { base64Pan, loading } = useAppSelector((state) => state);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let panArray = [];
    try {
      const file = e?.target?.files?.[0];
      if (file) {
        if (file.type.slice(0, 5) !== "image") {
          toast.error("Only images allowed");
          return;
        }
        // const base64Image = await getBase64Image(file);
        const imgUrl = URL.createObjectURL(file);
        const id = Math.floor(Math.random() * 1000);
        panArray.push({
          id,
          img: imgUrl,
        });
        dispatch(setBase64Pan(panArray));
        dispatch(setLoading(true));
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again");
      console.log(`Error in handleChange`);
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
          Upload Image
        </Label>
        <Input
          onChange={handleChange}
          className="bg-slate-200 cursor-pointer  h-20 "
          type="file"
          disabled={loading}
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

export default UploadPan;
// const sectionProperties = {
//   page: {
//     margin: {
//       left: 400,
//       right: 400,
//       top: 500,
//       bottom: 500,
//     },
//   },
//   column: {
//     space: 10,
//     count: 2,
//     equalWidth: true,
//     children: [
//       new Column({
//         width: 720 * 10,
//         space: 10,
//       }),
//       new Column({
//         width: 720 * 10,
//         space: 10,
//       }),
//     ],
//   },
// };
