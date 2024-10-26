import React, {  RefObject } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import SingleVerticalEOF from "./SingleVerticalEOF";
import DialogModal from "@/components/DialogModal";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  a4pageRef: RefObject<HTMLDivElement>;
  a4PageHeight: number;
};

const SingleVerticalPhoto = ({ a4pageRef, a4PageHeight }: Props) => {
  const {
    passportPhotoSlice: { passportSizePhotos,passportPhotoIndexes},
  } = useAppSelector((state) => state);

  return (
    <div
      ref={a4pageRef}
      className={`
        border-blue-400
        mt-[3rem]
        flex
        justify-center
        min-w-[793.7px]
        min-h-[793.7px]
        h-full
        bg-white 
        print:mt-0
        relative
        print:w-fit
        `}
    >
      <div
        style={{ gridAutoRows: 124 }}
        className="
        grid
        grid-cols-[150px]
        gap-y-[8px]
        print:w-fit
        mt-[75px]

        "
      >
        {passportSizePhotos.map((image, index) => {
          if (a4PageHeight >= 791 && index % 5 === 0 && index !== 0) {
            return (
              <React.Fragment key={index}>
                <SingleVerticalEOF />
                <DialogModal imageId={image.id}>
                  <figure
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
                  rotate-90
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
                </DialogModal>
              </React.Fragment>
            );
          }

          return (
            <div className="flex gap-5 " key={index}>
              {passportPhotoIndexes?.find(
                (item) => item.imageId === image.id
              ) ? (
                <Textarea className="rotate-90 focus:outline-0 resize-none focus:border-0 text-[12px] font-thin text-center w-[124px]   px-[2px] py-[2px] leading-none text-black rounded-none max-h-[60px] border-[1.5px] border-t-0 border-black" />
              ) : null}
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
              rotate-90

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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleVerticalPhoto;
