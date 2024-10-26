"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Button } from "@/components/ui/button";
import { Iimages } from "@/lib/types";
import {  RotateCw, Save } from "lucide-react";
import React, { RefObject, useEffect, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { setEditedPan } from "@/redux/slices/panSlice";

type Props = {
  imgRef: RefObject<HTMLImageElement>;
  image: Iimages;
  cropperRef: RefObject<ReactCropperElement>;
  setOpenDialog: (openDialog: boolean) => void;
};

const CropComp = ({ imgRef, image, cropperRef, setOpenDialog }: Props) => {
  const {
    panSlice: { panCardImages,panInputRef },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    const canvas = cropperRef.current?.cropper.getCroppedCanvas();
    const croppedImage = canvas?.toDataURL();

    dispatch(
      setEditedPan({
        id: image.id,
        img: croppedImage,
      })
    );
    setOpenDialog(false);
  };
  const handleRotate = () => {
    cropperRef.current?.cropper.rotate(90);
  };
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
  return (
    <>
      <div
        id="cropper"
        className="flex flex-col size-[30rem] border-2 border-black items-center justify-center"
      >
        <Cropper
          autoCrop={false}
          center={false}
          allowFullScreen
          className="w-full h-full "
          src={image.img}
          style={{}}
          guides={false}
          ref={cropperRef}
        />
      </div>
      <div className="flex gap-10">
        <Button onClick={handleRotate} type="button" variant={"primary"}>
          Rotate
          <RotateCw className="ml-2" size={20} />
        </Button>
        <Button
          onClick={handleClick}
          type="button"
          variant={"outline"}
          className="text-black z-20 print:hidden "
        >
          Save
          <Save className="ml-2" size={20} />
        </Button>
      </div>
    </>
  );
};

export default CropComp;

