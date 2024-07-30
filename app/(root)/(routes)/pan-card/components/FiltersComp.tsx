"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setBase64Pan, setCroppedImg, setEditedPan } from "@/app/redux/slice";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { base64Images } from "@/lib/types";
import { getContainedSize } from "@/lib/utils";
import { LucideRotateCcw, Rotate3D, RotateCcwSquare, Save } from "lucide-react";
import React, { RefObject, useState } from "react";

type Props = {
  setOpenDialog: (openDialog: boolean) => void;
  imgRef: RefObject<HTMLImageElement>;
  image: base64Images;
  brightness: number;
  setBrightness: (b: number) => void;
  contrast: number;
  setContrast: (c: number) => void;
  saturation: number;
  setSaturation: (s: number) => void;
  rotation: number;
  setRotation: (r: number) => void;
  sharpness: number;
  setSharpness: (s: number) => void;
};

const FiltersComp = ({
  setOpenDialog,
  imgRef,
  image,
  brightness,
  contrast,
  rotation,
  saturation,
  setBrightness,
  setContrast,
  setRotation,
  setSaturation,
  sharpness,
  setSharpness,
}: Props) => {
  const dispatch = useAppDispatch();

  const handleSaveImage = () => {
    if (imgRef.current) {
      const img = imgRef.current;
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

      dispatch(
        setEditedPan({
          id: image.id,
          img: filteredImage,
        })
      );
    }
    setOpenDialog(false);
  };
  const filters = [
    {
      title: "rotation",
      defaultValue: 0,
      min: -15,
      max: 15,
      step: 1,
      state: rotation,
      setState: setRotation,
    },
    {
      title: "brightness",
      defaultValue: 100,
      min: 50,
      max: 150,
      step: 1,
      state: brightness,
      setState: setBrightness,
    },
    {
      title: "contrast",
      defaultValue: 100,
      min: 100,
      max: 300,
      step: 1,
      state: contrast,
      setState: setContrast,
    },
    {
      title: "saturate",
      defaultValue: 100,
      min: 100,
      max: 1000,
      step: 10,
      state: saturation,
      setState: setSaturation,
    },
  ];
  const handleRotate = () => {
    const canvas = document.createElement("canvas");
    if (imgRef.current) {
      const img = imgRef.current;
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

      dispatch(
        setEditedPan({
          id: image.id,
          img: rotatedImage,
        })
      );
    }
  };
  const handleAutoEnhance = () => {
    setBrightness(110);
    setContrast(115);
  };
  return (
    <>
      <figure className="border-black border-2 h-[352px] w-[352px] relative overflow-hidden ">
        <img
          ref={imgRef}
          style={{
            transform: `rotate(${rotation}deg)`,
            filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
          }}
          className={`object-contain object-center w-full h-full !max-w-[22rem] !max-h-[22rem] `}
          src={image.img}
          alt="edit image"
        />
      </figure>
      <div className="w-full mt-auto relative  flex flex-col gap-5 items-center justify-center">
        <div className="grid grid-cols-2 gap-y-2 gap-x-5 w-full sm:w-3/4  ">
          <div className="flex col-span-2 mx-auto gap-10">
            <Button
              variant={"outline"}
              className=" w-fit mx-auto font-semibold"
              onClick={handleRotate}
            >
              Rotate
              <LucideRotateCcw className="ml-2" size={20} />
            </Button>
            <Button onClick={handleAutoEnhance}>Auto Enhance</Button>
          </div>
          {filters.map((filter, index) => (
            <div className="space-y-2 w-full " key={index}>
              <h1>{filter.title}</h1>
              <Slider
                value={[filter.state]}
                onValueChange={(val) => filter.setState(val[0])}
                className=""
                defaultValue={[filter.defaultValue]}
                max={filter.max}
                min={filter.min}
                step={filter.step}
              />
            </div>
          ))}
        </div>
        <Button
          onClick={handleSaveImage}
          type="button"
          className="z-20   print:hidden  self-center bg-green-600 hover:bg-green-500"
        >
          Save
          <Save className="ml-2" size={20} />
        </Button>
      </div>
    </>
  );
};

export default FiltersComp;
