import { Crop } from "react-image-crop";
import { IinitialState } from "./types";
import { setCroppedImg } from "@/app/redux/slice";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
type Targs = {
  image: HTMLImageElement | null;
  crop: Crop;
  setCrop: (crop: Crop) => void;
  imgId: number;
  dispatch: ThunkDispatch<IinitialState, undefined, UnknownAction> &
    Dispatch<UnknownAction>;
};
export const getBase64Image = async (image: Blob): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(image);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

export const handleCrop = ({
  image,
  crop,
  setCrop,
  imgId,
  dispatch,
}: Targs) => {
  const canvas = document.createElement("canvas");

  if (image) {
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    if (ctx) {
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
      );
    }
  }
  const croppedImgUrl = canvas.toDataURL("image/jpeg");
  dispatch(
    setCroppedImg({
      id: imgId,
      img: croppedImgUrl,
    }),
  );

  setCrop({
    unit: "px",
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
};
