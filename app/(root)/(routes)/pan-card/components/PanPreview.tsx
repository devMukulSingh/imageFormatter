"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { removeBase64Pan, removePassportSizeImage } from "@/app/redux/slice";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import Buttons from "./Buttons";

type Props = {};

const ImagesPage = ({}: Props) => {
  const dispatch = useAppDispatch();
  const { base64Pan, loading } = useAppSelector((state) => state);

  return (
    <div className="flex relative flex-col bg-white gap-5 print:max-h-screen max-h-[calc(100vh-6.25rem)] print:overflow-visible overflow-y-auto">
      <Buttons disabled={base64Pan.length > 0 ? false : true} />

      <div
        className="
        flex
        justify-center
        mt-[3rem]
        min-h-[1122.5px]
        w-[793.7px]
        bg-white 
        print:m-0
        py-10
        px-5
        "
      >
        {base64Pan !== "" && (
          <figure
            draggable
            className="
              size-[22rem]
              relative
              flex
              flex-col

            "
          >
            <Button
              onClick={() => dispatch(removeBase64Pan(""))}
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
              object-contain
              object-top
              "
              fill
              src={base64Pan}
              alt="image"
            />
          </figure>
        )}
      </div>
    </div>
  );
};
export default ImagesPage;
