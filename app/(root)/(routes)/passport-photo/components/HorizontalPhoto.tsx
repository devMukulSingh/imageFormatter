import React, { MutableRefObject, RefObject, useState } from "react";
import { removePassportSizeImage } from "@/redux/reducers/persistReducer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import EndOfPage from "./EndOfPage";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Textarea } from "@/components/ui/textarea";
import DialogModal from "@/components/DialogModal";

type Props = {
  a4pageRef: RefObject<HTMLDivElement>;
  a4PageHeight: number;
};

const HorizontalPhoto = ({ a4pageRef, a4PageHeight }: Props) => {
  const {
    persistedReducer: { passportSizeBase64Images: passportImages },
    nonPersistedReducer: { passportInputRef, passportPhotoIndexes },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  
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
        
      {passportImages.map((image, index) => {
                console.log(index);
        if (a4PageHeight > 1120 && index % 42 === 0 && index !== 0) {
    
          return (
            <div key={index}>
              <EndOfPage />
              <DialogModal index={index.toString()} imageId={image.id}>
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
                  {/* <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removePassportSizeImage(image.id));
                      if (passportInputRef) passportInputRef.value = "";
                    }}
                    size={"icon"}
                    variant={"outline"}
                    className="self-center z-20 text-black rounded-full size-6 mt-1 print:hidden"
                  >
                    <X className="" size={15} />
                  </Button> */}
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
                {passportPhotoIndexes?.find((item) => item === index.toString()) ? (
                  <Textarea className="focus:outline-0 resize-none focus:border-0 text-[12px] font-thin text-center min-h-[30px] px-[3px] py-[3px] leading-none text-black rounded-none w-[124px] border-[1.5px] border-t-0 border-black" />
                ) : null}
              </DialogModal>
            </div>
          );
        }

        return (
          <div key={index}>
            <DialogModal index={index.toString()} imageId = {image.id}>
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
                {/* <Button
                  onClick={(e) => {
                    e.stopPropagation();
                   
                  }}
                  size={"icon"}
                  variant={"outline"}
                  className="self-center z-20 text-black rounded-full size-6 mt-1 print:hidden"
                >
                  <X className="" size={15} />
                </Button> */}
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
            {passportPhotoIndexes?.find((item) => item === index.toString()) ? (
              <Textarea className="focus:outline-0 resize-none focus:border-0 text-[12px] font-thin text-center min-h-[10px]  px-[2px] py-[2px] leading-none text-black rounded-none w-[124px] border-[1.5px] border-t-0 border-black" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalPhoto;
