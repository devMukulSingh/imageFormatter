import React, { RefObject, useState } from "react";
import Image from "next/image";
import EndOfPage from "./EndOfPage";
import { useAppSelector } from "@/redux/hook";
import { Textarea } from "@/components/ui/textarea";
import DialogModal from "@/components/DialogModal";
import AfterImageTextbox from "./AfterImageTextbox";
import InimageTextbox from "./InimageTextbox";

type Props = {
  a4pageRef: RefObject<HTMLDivElement>;
  a4PageHeight: number;
};

const HorizontalPhoto = ({ a4pageRef, a4PageHeight }: Props) => {
  const {
    passportPhotoSlice: { passportSizePhotos,passportPhotoIndexes},
  } = useAppSelector((state) => state);


  return (
    <div
      ref={a4pageRef}
      className={`
        mt-[3rem]
        grid
        auto-rows-min
        grid-cols-6
        auto-cols-min
        gap-x-[6px]
        gap-y-2
        min-h-[1122.5px]
          w-[793.7px]
          print:mt-0
          py-[14px]
          px-[14px]
          relative
          `}
    >
      {passportSizePhotos.map((image, index) => {
        if (a4PageHeight > 1120 && index % 42 === 0 && index !== 0) {
          return (
            <div key={index}>
              <EndOfPage />
              <DialogModal imageId={image.id}>
                <figure
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  key={index}
                  className={`
                  h-[150px]
                  w-[124px]
                  relative
                  flex
                  flex-col
                  border-[1.5px]
                  border-black
                  cursor-pointer
                  `}
                >
                  <Image
                    quality={10}
                    className="
                    object-top  
                    object-cover
                    "
                    fill
                    src={image.img}
                    key={index}
                    alt="image"
                  />
                </figure>
                {passportPhotoIndexes?.find((item) => item.imageId === image.id)
                  ?.textboxLocation === "afterImage" ? (
                  <Textarea className="focus:outline-0 resize-none focus:border-0 text-[12px] font-thin text-center min-h-[30px] px-[3px] py-[3px] leading-none text-black rounded-none w-[124px] border-[1.5px] border-t-0 border-black" />
                ) : (
                  <Textarea className="absolute focus:outline-0 resize-none focus:border-0 text-[12px] font-thin text-center min-h-[30px] px-[3px] py-[3px] leading-none text-black rounded-none w-[124px] border-[1.5px] border-t-0 border-black" />
                )}
              </DialogModal>
            </div>
          );
        }

        return (
          <div key={index} className="relative">
            <DialogModal imageId={image.id}>
              <figure
                onClick={(e) => e.stopPropagation()}
                draggable
                key={index}
                className={`
              cursor-pointer
              h-[150px]
              w-[124px]
              relative
              flex
              flex-col
              border-[1.5px]
              border-black
            `}
              >
                <Image
                  quality={10}
                  className="
              relative
              object-top
              object-cover
              "
                  fill
                  // width={180}
                  // height={180}
                  src={image.img}
                  key={index}
                  alt="image"
                />
              </figure>
            </DialogModal>
            {image.textbox?.isActive &&
            image.textbox.location === "afterImage" ? (
              <AfterImageTextbox />
            ) : image.textbox?.isActive &&
              image.textbox.location === "inImage" ? (
              <InimageTextbox />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalPhoto;
