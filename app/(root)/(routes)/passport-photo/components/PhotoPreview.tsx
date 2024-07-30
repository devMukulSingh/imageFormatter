"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { removePassportSizeImage } from "@/app/redux/slice";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import Buttons from "./Buttons";
import { useRef } from "react";

type Props = {};

const PhotoPreview = ({}: Props) => {
  const a4pageRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const { passportSizeBase64Images: images, loading } = useAppSelector(
    (state) => state
  );

  return (
    <div className="flex relative flex-col bg-white gap-5 print:max-h-screen max-h-[calc(100vh-6.25rem)] print:overflow-visible overflow-y-auto">
      <Buttons disabled={images.length > 0 ? false : true} />

      <div
        ref={a4pageRef}
        className={`
        print:h-screen
        mt-[3rem]
        gap-x-[6px]
        gap-y-2
        grid
        auto-rows-min
        grid-cols-6
        auto-cols-min
        min-h-[1120px]
        w-[50rem]
        bg-white 
        print:mt-0
        px-6
        py-[14px]
        relative
        `}
      >

        {images.map((image, index) => {
          // h-[155px]
          // w-[118px]
          
          if (
            a4pageRef.current &&
            a4pageRef.current?.scrollHeight > 1120 &&
             (index % 42 === 0 && index !== 0)
          ) {
            return (
              <>
                <div className="flex  justify-center items-center col-span-6  z-20 print:hidden">
                  <hr className=" w-1/2  border-2 x border-dashed border-black" />
                  <h1 className="whitespace-nowrap bg-white text-black rounded-md py-1 px-2 font-semibold">
                    End of page
                  </h1>{" "}
                  <hr className=" w-1/2 border-2  border-dashed border-black z-40" />
                </div>
                <hr className="w-full mb-1 border-2 col-span-full invisible" />
                <figure
                  draggable
                  key={index}
                  className={`
              h-[151px]
              w-[118px]

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
              </>
            );
          }

          return (
            <figure
              draggable
              key={index}
              className={`
              h-[151px]
              w-[118px]

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
export default PhotoPreview;
