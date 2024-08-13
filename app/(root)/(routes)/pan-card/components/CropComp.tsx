"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  setBase64Pan,
  setEditedPan,
} from "@/redux/reducers/persistReducer";
import { Button } from "@/components/ui/button";
import { base64Images } from "@/lib/types";
import { CropIcon, RotateCw, Save } from "lucide-react";
import React, { RefObject, useEffect, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";
import "cropperjs/dist/cropper.css";

type Props = {
  imgRef: RefObject<HTMLImageElement>;
  image: base64Images;
  cropperRef: RefObject<ReactCropperElement>;
  setOpenDialog: (openDialog: boolean) => void;
};

const CropComp = ({ imgRef, image, cropperRef, setOpenDialog }: Props) => {
  const {
    persistedReducer: { base64Pan },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    const canvas = cropperRef.current?.cropper.getCroppedCanvas();
    const croppedImage = canvas?.toDataURL();

    dispatch(
      setEditedPan({
        id: image.id,
        img: croppedImage,
      }),
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

{
  /* <ReactCrop className="" crop={crop} onChange={(c) => setCrop(c)}>
        <img
          className={`object-contain object-center w-full h-full !max-w-[35rem] !max-h-[35rem] `}
          ref={imgRef}
          src={base64Pan[0]?.img}
          alt="edit image"
        />
      </ReactCrop> */
}
// function onImageLoad(e: any) {
//   const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
// const crop = centerCrop(
//   makeAspectCrop(
//     {
//       unit: "%",
//       width: 90,
//     },
//     5 / 3,
//     width,
//     height
//   ),
//   width,
//   height
// );

//   setCrop(crop);
// }
