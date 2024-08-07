"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setBrightness, setContrast, setCroppedImg,  setRotation, setSaturation } from "@/app/redux/reducers/persistReducer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { rotateBy90, saveImage } from "@/lib/hooks";
import { base64Images } from "@/lib/types";
import { getContainedSize } from "@/lib/utils";
import {
  LucideRotateCcw,
  Rotate3D,
  RotateCcwSquare,
  Save,
  WandSparkles,
} from "lucide-react";
import React, { MutableRefObject, RefObject, useState } from "react";
import { ReactCropperElement } from "react-cropper";

type Props = {
  setOpenDialog: (openDialog: boolean) => void;
  imgRef: RefObject<HTMLImageElement>;
  image: base64Images;
  cropperRef:RefObject<ReactCropperElement>
};

const FiltersComp = ({ setOpenDialog, imgRef, image, cropperRef }: Props) => {
  const dispatch = useAppDispatch();
  const { brightness, contrast, rotation, saturation } = image.filters;

  const handleSaveImage = () => {
    // const filteredImage = saveImage({
    //   brightness,
    //   contrast,
    //   img: imgRef.current,
    //   rotation,
    //   saturation,
    // });
    // dispatch(
    //   setCroppedImg({
    //     id: image.id,
    //     img: filteredImage,
    //   }),
    // );
    setOpenDialog(false);
  };
  const filters = [
    // {
    //   title: "rotation",
    //   defaultValue: 0,
    //   min: -15,
    //   max: 15,
    //   step: 1,
    //   state: rotation,
    //   setState: setRotation,
    // },
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
    // const filteredImage = rotateBy90(imgRef.current);
    // dispatch(
    //   setCroppedImg({
    //     id: image.id,
    //     img: filteredImage,
    //   }),
    // );
    dispatch(
      setRotation({
        value: rotation + 90,
        id: image.id,
      })
    );
  };
  const handleAutoEnhance = () => {
    dispatch(
      setBrightness({
        value: 105,
        id: image.id,
      })
    );
    dispatch(
      setContrast({
        value: 115,
        id: image.id,
      })
    );
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
            {/* <Button
              variant={"outline"}
              className=" w-fit mx-auto font-semibold"
              onClick={handleRotate}
            >
              Rotate
              <LucideRotateCcw className="ml-2" size={20} />
            </Button> */}
            <Button
              className="font-semibold"
              variant={"outline"}
              onClick={handleAutoEnhance}
            >
              Auto enhance
              <WandSparkles className="ml-2" size={20} />
            </Button>
          </div>
          {filters.map((filter, index) => (
            <div className="space-y-2 w-full " key={index}>
              <h1>{filter.title}</h1>
              <Slider
                value={[filter.state]}
                onValueChange={(val) =>
                  dispatch(
                    filter.setState({
                      value: val[0],
                      id: image.id,
                    })
                  )
                }
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
