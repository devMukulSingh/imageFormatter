"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  setBase64Pan,
  setPanInputRef,
} from "@/redux/slices/panSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getBase64Image } from "@/lib/hooks";
import { setLoading } from "@/redux/slices/nonPersistReducer";

const UploadPan = () => {
  const dispatch = useAppDispatch();
  const {
    panSlice: { panCardImages },
    nonPersistedReducer: { loading },
  } = useAppSelector((state) => state);
  const panInputRef = useRef<HTMLInputElement | null>(null);

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
          filters: {
            brightness: 100,
            contrast: 100,
            saturation: 100,
            rotation: 0,
          },
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
  useEffect(() => {
    dispatch(setPanInputRef(panInputRef.current));
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
        w-[18rem]
        gap-10 
        shadow-2xl 
        hover:scale-105
        transition 
        border 
        px-8
        py-10
        rounded-lg 
        bg-purple-400"
      >
        <Label className="text-lg text-white font-semibold" htmlFor="picture">
          Upload Image
        </Label>
        <Input
          ref={panInputRef}
          multiple
          onChange={handleChange}
          className="bg-slate-200 cursor-pointer  h-28 "
          type="file"
          disabled={loading}
        />
        <div className="flex gap-5">

        </div>
      </div>
    </>
  );
};

export default UploadPan;
