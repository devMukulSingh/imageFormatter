import React, { MouseEvent, MutableRefObject, RefObject } from "react";
import { removePassportSizePhoto } from "@/redux/slices/passportPhotosSlice";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import DialogModal from "@/components/DialogModal";
import { Textarea } from "@/components/ui/textarea";
import AfterImageTextbox from "./AfterImageTextbox";

type Props = {
  a4pageRef: RefObject<HTMLDivElement>;
  a4PageHeight: number;
};

const VerticalPhoto = ({ a4pageRef, a4PageHeight }: Props) => {
  const {
    passportPhotoSlice: {
      passportSizePhotos,
      passportInputRef,
      passportPhotoIndexes,
    },
    nonPersistedReducer: {},
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const stopPropagation = (
    e: React.MouseEvent<HTMLTextAreaElement, globalThis.MouseEvent>
  ) => e.stopPropagation();
  return (
    <div
      // onClick={stopPropagation}
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
        py-[14px]
        px-[14px]
        relative
        `}
    >
      <div
        className="
        w-fit 
        grid
        gap-y-2
        gap-x-[6px]
        grid-cols-2
        auto-rows-min"
      >
        {passportSizePhotos.map((image, index) => {
          // h-[155px]
          // w-[118px]

          if (a4PageHeight >= 786 && index % 8 === 0 && index !== 0) {
            return (
              <div key={index}>
                {/* <EndOfPage /> */}
                <DialogModal imageId={image.id}>
                  <figure
                    key={index}
                    className={`
                  h-[150px]
                  cursor-pointer
                  w-[124px]
                  relative
                  flex
                  flex-col
                  border-[1.5px]
                  border-black
                  col-span-2
                  mx-auto
                  rotate-90
                  `}
                  >
                    <Button
                      onClick={() => {
                        dispatch(removePassportSizePhoto(image.id));
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
                </DialogModal>
              </div>
            );
          }

          return (
            <div key={index}>
              <DialogModal imageId={image.id}>
                <figure
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
                  {image.textbox?.isActive &&
                  image.textbox.location === "inImage" ? ( // <InimageTextbox />
                    <Textarea
                      autoFocus
                      onClick={(e) => stopPropagation(e)}
                      className="z-30 bg-white absolute top-[120px] border-b-0 focus:outline-0 resize-none focus:border-0 text-[12px] font-thin text-center min-h-[10px]  px-[2px] py-[2px] leading-none text-black rounded-none w-[124px] border-[1.5px] border-black"
                    />
                  ) : null}
                </figure>
              </DialogModal>
              {image.textbox?.isActive &&
              image.textbox.location === "afterImage" ? (
                <AfterImageTextbox />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalPhoto;
