"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setCroppedImg } from "@/app/redux/reducers/persistReducer";
import { Button } from "@/components/ui/button";
import { cropImage } from "@/lib/hooks";
import { base64Images } from "@/lib/types";
import { CropIcon } from "lucide-react";
import React, { RefObject, useState } from "react";
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type Props = {
  imgRef: RefObject<HTMLImageElement>;
  image: base64Images;
};

const CropComp = ({ imgRef, image }: Props) => {
  // const { brightness, contrast, rotation, saturation } = useAppSelector(
  //   (state) => state.filters
  // );
  const [crop, setCrop] = useState<Crop>({
    height: 80,
    width: 90,
    unit: "%",
    x: 0,
    y: 0,
  });
  const dispatch = useAppDispatch();
  const handleClick = () => {
    const filteredImage = cropImage({
      image: imgRef.current,
      crop,
      setCrop,
      rotation: 0,
    });
    dispatch(
      setCroppedImg({
        id: image.id,
        img: filteredImage,
      }),
    );
  };
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
  return (
    <div className="border-black border-2 h-[35rem] w-[35rem] relative flex flex-col items-center justify-center">
      <ReactCrop className="" crop={crop} onChange={(c) => setCrop(c)}>
        <img
          style={
            {
              // transform: `rotate(90deg)`,
              // filter: `
              //     saturate(${saturation}%)
              //     contrast(${contrast}%)
              //     brightness(${brightness})
              //     `,
            }
          }
          className={`object-contain object-center w-full h-full !max-w-[35rem] !max-h-[35rem] `}
          ref={imgRef}
          src={image.img}
          alt="edit image"
        />
      </ReactCrop>
      {crop.height !== 0 && (
        <Button
          onClick={handleClick}
          type="button"
          variant={"outline"}
          className="text-black z-20 print:hidden absolute bottom-1 "
        >
          Crop
          <CropIcon className="" size={25} />
        </Button>
      )}
    </div>
  );
};

export default CropComp;
