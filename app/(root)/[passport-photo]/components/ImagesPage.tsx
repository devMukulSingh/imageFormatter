"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { removePassportSizeImage } from "@/app/redux/slice";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import Buttons from "./Buttons";

type Props = {};

const ImagesPage = ({}: Props) => {
  const dispatch = useAppDispatch();
  const { passportSizeBase64Images: images, loading } = useAppSelector(
    (state) => state,
  );

  return (
    <div className="flex relative flex-col bg-white gap-5 print:max-h-screen max-h-[calc(100vh-6.25rem)] print:overflow-visible overflow-y-auto">
      {images.length > 0 && <Buttons/>}

      <div
        className="
        mt-[3rem]
        gap-x-[6px]
        gap-y-2
        grid
        auto-rows-min
        auto-cols-min
        grid-cols-6
        min-h-[1122.5px]
        w-[793.7px]
        bg-white 
        print:m-0
        py-5
        px-5
        
        "
      >
        {images.map((image, index) => (
          <figure
            draggable
            key={index}
            className="
              h-[155px]
              w-[118px]
              relative
              flex
              flex-col
              border-[1.5px]
              border-black
            "
          >
            <Button
              size={"icon"}
              variant={"outline"}
              className="self-center z-20 rounded-full size-6 mt-1 print:hidden"
            >
              <X
                onClick={() => dispatch(removePassportSizeImage(image.id))}
                className=""
                size={15}
              />
            </Button>
            <Image
              quality={8}
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
        ))}
      </div>
    </div>
  );
};
export default ImagesPage;
