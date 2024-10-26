"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Button } from "@/components/ui/button";
import {  RotateCw, Save } from "lucide-react";
import React, {
  RefObject,
  useEffect,

} from "react";
import "../../../../../node_modules/cropperjs/dist/cropper.min.css";
import "cropperjs/dist/cropper.css";
import Cropper, { ReactCropperElement } from "react-cropper";
import { setLoading } from "@/redux/slices/nonPersistReducer";
import { setCroppedImg } from "@/redux/slices/collageSlice";
import { Iimages } from "@/lib/types";

type Props = {
  imgRef: RefObject<HTMLImageElement>;
  image: Iimages;
  setOpenDialog: (openDialog: boolean) => void;
  cropperRef: RefObject<ReactCropperElement>;
};

const CropComp = ({ imgRef, image, setOpenDialog, cropperRef }: Props) => {
  useEffect(() => {
    cropperRef.current?.cropper.setCropBoxData({
      height: 380,
      width: 380,
    });
    const clearCropper = (e: MouseEvent) => {
      const id = (e?.target as HTMLElement).id;
      if (id === "radix-:r0:") {
        cropperRef.current?.cropper.clear();
      }
    };
    document.addEventListener("click", (e) => clearCropper(e));
    () => {
      document.removeEventListener("click", (e) => clearCropper(e));
    };
  }, []);

  const { rotation } = image.filters;
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.nonPersistedReducer);
  const handleClick = () => {
    dispatch(setLoading(true));
    const canvas = cropperRef.current?.cropper.getCroppedCanvas();
    const croppedImage = canvas?.toDataURL();
    dispatch(
      setCroppedImg({
        id: image.id,
        img: croppedImage,
      })
    );
    dispatch(setLoading(false));
    setOpenDialog(false);
  };

  const handleRotate = () => {
    cropperRef.current?.cropper.rotate(90);
  };

  return (
    <>
      <div
        id="cropper"
        className="flex flex-col size-[30rem] border-2 border-black items-center justify-center"
      >
        <Cropper
          // autoCropArea={1}
          autoCrop={false}
          center={false}
          allowFullScreen
          className="w-full h-full "
          src={image.img}
          style={{}}
          // Cropper.js options
          guides={false}
          ref={cropperRef}
        />
      </div>
      <div className="flex gap-10">
        <Button
          disabled={loading}
          onClick={handleRotate}
          type="button"
          variant={"primary"}
        >
          Rotate
          <RotateCw className="ml-2" size={20} />
        </Button>
        <Button
          disabled={loading}
          onClick={handleClick}
          type="button"
          variant={"outline"}
          className=" "
        >
          Save
          <Save className="ml-2" size={20} />
        </Button>
      </div>
    </>
  );
};

export default CropComp;
