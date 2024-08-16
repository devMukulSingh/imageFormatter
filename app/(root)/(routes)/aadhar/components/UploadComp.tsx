"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { pushAadharPdfs } from "@/redux/reducers/persistReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IaadharPdfs } from "@/lib/types";
import {
  setAadharInputRef,
  setLoading,
} from "@/redux/reducers/nonPersistReducer";

type Props = {
  // fileRef: RefObject<HTMLInputElement>;
};

const UploadComp = ({}: Props) => {
  const aadharInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const {
    nonPersistedReducer: { loading },
    persistedReducer: { base64Images: images },
  } = useAppSelector((state) => state);
  const push = async ({ pdfId, imgUrl }: { pdfId: number; imgUrl: string }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("inside timeout");
        dispatch(
          pushAadharPdfs({
            id: pdfId,
            file: imgUrl,
          }),
        );
        resolve("");
      }, 1500);
    });
  };
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      let aadharPdfs: IaadharPdfs[] | null = [];
      const files = e?.target?.files;

      if (files) {
        if (files?.length > 10) {
          toast.error("Maximum 10 files allowed at a time");
          if (aadharInputRef.current) aadharInputRef.current.value = "";
          return;
        }
        dispatch(setLoading(true));
        for (let i = 0; i < files?.length; i++) {
          const imgUrl = URL.createObjectURL(files[i]);
          const pdfId = Math.floor(Math.random() * 100000);
          await push({ pdfId, imgUrl });
        }
        console.log("hello");

        // dispatch(pushAadharPdfs(aadharPdfs));
        if (aadharInputRef.current) aadharInputRef.current.value = "";
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again");
      console.log(`Error in handleChange`);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setAadharInputRef(aadharInputRef.current));
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
        ref={aadharInputRef}
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
