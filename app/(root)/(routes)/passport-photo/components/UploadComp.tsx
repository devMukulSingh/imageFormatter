"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChangeEvent,
  Fragment,
  useEffect,
  useRef,
} from "react";
import toast from "react-hot-toast";
import {
  pushPassportSizeImages,setPassportInputRef
} from "@/redux/slices/passportPhotosSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  setLoading,
} from "@/redux/slices/nonPersistReducer";

const UploadComp = () => {
  const passportInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const {
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
        dispatch(pushPassportSizeImages(base64PassportSizeImages));
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
    <Fragment>
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

      </div>
    </Fragment>
  );
};

export default UploadComp;
