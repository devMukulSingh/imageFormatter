"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  pushDoubleSideAadharPdfs,
  setDoubleSideAadharInputRef,
} from "@/redux/slices/doubleSideAadharSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  setLoading,
} from "@/redux/slices/nonPersistReducer";

type Props = {
  // fileRef: RefObject<HTMLInputElement>;
};

const UploadComp = ({}: Props) => {
  const doubleSideAadharInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const {
    nonPersistedReducer: { loading },
  } = useAppSelector((state) => state);
  const push = async ({ pdfId, imgUrl }: { pdfId: number; imgUrl: string }) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          dispatch(
            pushDoubleSideAadharPdfs({
              id: pdfId,
              file: imgUrl,
            })
          );
          resolve("");
        }, 1500);
      } catch (e) {
        reject(e);
      }
    });
  };
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e?.target?.files;

      if (files) {
        if (files?.length > 10) {
          toast.error("Maximum 10 files allowed at a time");
          if (doubleSideAadharInputRef.current)
            doubleSideAadharInputRef.current.value = "";
          return;
        }
        dispatch(setLoading(true));
        for (let i = 0; i < files?.length; i++) {
          const imgUrl = URL.createObjectURL(files[i]);
          if (!files[i].type.includes("pdf")) {
            toast.error("Only pdf allowed");
            break;
          }
          const pdfId = Math.floor(Math.random() * 100000);
          await push({ pdfId, imgUrl });
        }
        if (doubleSideAadharInputRef.current)
          doubleSideAadharInputRef.current.value = "";
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again");
      console.log(`Error in handleChange`);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setDoubleSideAadharInputRef(doubleSideAadharInputRef.current));
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
        px-8 
        py-10
        rounded-lg 
        bg-purple-400"
    >
      <Label className="text-lg text-white" htmlFor="picture">
        Upload aadhar
      </Label>
      <Input
        ref={doubleSideAadharInputRef}
        onChange={handleChange}
        className="bg-slate-200 cursor-pointer h-28 "
        type="file"
        multiple
        disabled={loading}
      />
    </div>
  );
};

export default UploadComp;
