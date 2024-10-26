"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent,  useEffect, useRef,  } from "react";
import toast from "react-hot-toast";
import {
  pushcollageImages,
  setCollageInputRef,
} from "@/redux/slices/collageSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Iimages } from "@/lib/types";
import {
  setLoading,
} from "@/redux/slices/nonPersistReducer";

type Props = {
  // fileRef: RefObject<HTMLInputElement>;
};

const UploadComp = ({}: Props) => {
  const collageInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const {
    nonPersistedReducer: { loading },
    collageSlice:{collageImages},
  } = useAppSelector((state) => state);


  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      let base64Images: Iimages[] | null = [];
      const files = e?.target?.files;
      if (files) {
        dispatch(setLoading(true));
        for (let i = 0; i < files?.length; i++) {
          if (files[i].type.slice(0, 5) !== "image") {
            toast.error("Only images allowed");
            break;
          }
          // const base64Image = await getBase64Image(files[i]);
          const imgUrl = URL.createObjectURL(files[i]);

          const imageId = Math.floor(Math.random() * 100000);
          base64Images.push({
            id: imageId,
            img: imgUrl,
            filters: {
              brightness: 100,
              contrast: 100,
              rotation: 0,
              saturation: 100,
            },
          });
        }
        dispatch(pushcollageImages(base64Images));
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again");
      console.log(`Error in handleChange`);
    } finally {
      dispatch(setLoading(false));
    }
  };


  useEffect(() => {
    dispatch(setCollageInputRef(collageInputRef.current));
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
        Upload Images
      </Label>
      <Input
        ref={collageInputRef}
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
