"use client";
import { Crop } from "react-image-crop";
import { IinitialState } from "./types";
import { setCroppedImg } from "@/app/redux/slice";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { getContainedSize } from "./utils";

type TsaveImageArgs = {
  img: HTMLImageElement | null;
  brightness: number;
  contrast: number;
  saturation: number;
  rotation: number;
};

type Targs = {
  image: HTMLImageElement | null;
  crop: Crop;
  setCrop: (crop: Crop) => void;
  rotation: number;
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

export const cropImage = ({ image, crop, setCrop }: Targs) => {
  if (image && crop.height !== 0) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";
      // ctx.rotate((90 * Math.PI) / 180)
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
      ctx.restore();
    }
    const croppedImgUrl = canvas.toDataURL("image/jpeg");
    setCrop({
      unit: "px",
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
    return croppedImgUrl;
  }
};

export const rotateBy90 = (img: HTMLImageElement | null) => {
  const canvas = document.createElement("canvas");
  if (img) {
    const { height, width } = getContainedSize(img);
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((90 * Math.PI) / 180);
      ctx.drawImage(img, -width / 2, -height / 2, width, height);

      ctx.restore();
    }
    const rotatedImage = canvas.toDataURL();
    return rotatedImage;
  }
};

export const saveImage = ({
  img,
  brightness,
  contrast,
  saturation,
  rotation,
}: TsaveImageArgs) => {
  if (img) {
    const { height, width } = getContainedSize(img);

    const canvas = document.createElement("canvas");

    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, -width / 2, -height / 2, width, height);

      ctx.restore();
    }
    const filteredImage = canvas.toDataURL();
    return filteredImage;
  }
};

export const handleSaveImage = ({
  img,
  brightness,
  contrast,
  saturation,
  rotation,
}: TsaveImageArgs) => {
  if (img) {
    const { height, width } = getContainedSize(img);

    const scaleX = img.naturalWidth / width;
    const scaleY = img.naturalHeight / height;

    const canvas = document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.filter = `brightness(${brightness}) contrast(${contrast}%) saturate(${saturation}%)`;
      ctx.rotate((rotation * Math.PI) / 180);

      ctx?.drawImage(
        img,
        0,
        0,
        width * scaleX,
        height * scaleY,
        0,
        0,
        width,
        height,
      );
    }
    const fileredImage = canvas.toDataURL();

    return fileredImage;
  }
};
