import React, { MutableRefObject, RefObject } from "react";
import { removePassportSizeImage } from "@/redux/reducers/persistReducer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import EndOfPage from "./EndOfPage";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import SingleVerticalEOF from "./SingleVerticalEOF";

type Props = {
  a4pageRef: RefObject<HTMLDivElement>;
  a4PageHeight: number;
};

const SingleVerticalPhoto = ({ a4pageRef, a4PageHeight }: Props) => {
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
        mx-auto
        flex
        justify-center
        min-w-[793.7px]
        min-h-[793.7px]
        bg-white 
        print:mt-0
        py-[12px]
        px-[14px]
        relative
        `}
    >
      <div
        className="
        gap-y-[4px]
        grid
        grid-cols-1
        "
      >
        {passportImages.map((image, index) => {
          // h-[155px]
          // w-[118px]

          if (a4PageHeight >= 791 && index % 5 === 0 && index !== 0) {
            console.log("inside");
            console.log("index", index);

            return (
              <>
                <SingleVerticalEOF />
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
    </div>
  );
};

export default SingleVerticalPhoto;
