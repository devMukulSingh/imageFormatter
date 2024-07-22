import { useAppDispatch } from "@/app/redux/hook";
import { removeImage } from "@/app/redux/slice";
import { Button } from "@/components/ui/button";
import { base64Images } from "@/lib/types";
import { X } from "lucide-react";
import React, { useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import EditDialog from "./EditDialog";
import Image from "next/image";

type Props = {
  image: base64Images;
};

const SingleImage = ({ image }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const dispatch = useAppDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      {
        <EditDialog
          image={image}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      }
      <div
        className="         
                          justify-center
                          flex
                          flex-col
                          border
                          print:border-none
                              "
      >
        <Button
          onClick={() => dispatch(removeImage(image.id))}
          size={"icon"}
          variant={"outline"}
          className="self-center text-black z-20 rounded-full size-6  absolute top-1 print:hidden"
        >
          <X className="" size={15} />
        </Button>
        <figure className="relative size-[22rem] ">
          <Image
            quality={6}
            onClick={() => setOpenDialog(true)}
            ref={imgRef}
            fill
            className="  
            cursor-pointer       
            object-contain
            object-center 
            "
            src={image.img}
            alt="image"
          />
        </figure>
      </div>
    </>
  );
};

export default SingleImage;
