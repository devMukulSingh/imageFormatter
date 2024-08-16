import React, { MutableRefObject, RefObject } from "react";
import { removePassportSizeImage } from "@/redux/reducers/persistReducer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import EndOfPage from "./EndOfPage";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

type Props = {
  a4pageRef: RefObject<HTMLDivElement>;
  a4PageHeight: number;
};

const HorizontalPhoto = ({ a4pageRef, a4PageHeight }: Props) => {
  const {
    persistedReducer: { passportSizeBase64Images: passportImages },
    nonPersistedReducer: { passportInputRef },
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
        bg-white 
        print:mt-0
        py-[14px]
        px-[14px]
        relative
        `}
    >
      {passportImages.map((image, index) => {
        // h-[155px]
        // w-[118px]

        if (a4PageHeight > 1120 && index % 42 === 0 && index !== 0) {
          return (
            <>
              <EndOfPage />
              <figure
                key={index}
                className={`
                  h-[150px]
                  w-[124px]
                  relative
                  flex
                  flex-col
                  border-[1.5px]
                  border-black
                  `}
              >
                <Button
                  onClick={() => {
                    dispatch(removePassportSizeImage(image.id));
                    if (passportInputRef) passportInputRef.value = "";
                  }}
                  size={"icon"}
                  variant={"outline"}
                  className="self-center z-20 text-black rounded-full size-6 mt-1 print:hidden"
                >
                  <X className="" size={15} />
                </Button>
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
            </>
          );
        }

        return (
          <figure
            draggable
            key={index}
            className={`
              h-[150px]
              w-[124px]
              relative
              flex
              flex-col
              border-[1.5px]
              border-black
              
            `}
          >
            <Button
              onClick={() => dispatch(removePassportSizeImage(image.id))}
              size={"icon"}
              variant={"outline"}
              className="self-center z-20 text-black rounded-full size-6 mt-1 print:hidden"
            >
              <X className="" size={15} />
            </Button>
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
        );
      })}
    </div>
  );
};

export default HorizontalPhoto;
