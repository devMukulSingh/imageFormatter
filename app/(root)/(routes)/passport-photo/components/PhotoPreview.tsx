"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { removePassportSizeImage } from "@/app/redux/slice";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import Buttons from "./Buttons";
import { useEffect, useRef, useState } from "react";
import EndOfPage from "@/components/EndOfPage";

type Props = {};

const PhotoPreview = ({}: Props) => {
  const [a4PageHeight, setA4PageHeight] = useState(0);
  const dispatch = useAppDispatch();
  const { passportSizeBase64Images: passportImages, loading } = useAppSelector(
    (state) => state,
  );
  const a4pageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (a4pageRef.current) setA4PageHeight(a4pageRef.current?.scrollHeight);
  }, [passportImages]);

  return (
    <div className="flex relative flex-col bg-white gap-5 print:max-h-screen max-h-[calc(100vh-6.25rem)] print:overflow-visible overflow-y-auto">
      <Buttons disabled={passportImages.length > 0 ? false : true} />
      <div
        ref={a4pageRef}
        className={`
        mt-[3rem]
        gap-x-[6px]
        gap-y-2
        grid
        auto-rows-min
        grid-cols-6
        auto-cols-min
        min-h-[1122.5px]
        w-[793.7px]
        bg-white 
        print:mt-0
        px-6
        py-[14px]
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
                  h-[151px]
                  w-[117px]
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
