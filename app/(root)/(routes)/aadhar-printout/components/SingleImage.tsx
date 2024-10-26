import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { removeAadharPrintoutImage } from "@/redux/reducers/persistReducer";
import { Button } from "@/components/ui/button";
import { base64Images } from "@/lib/types";
import { X } from "lucide-react";
import React, { useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import EditDialog from "./EditDialog";


type Props = {
  image: base64Images;
};

const SingleImage = ({ image }: Props) => {
  const dispatch = useAppDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const {
    nonPersistedReducer: { aadharPrintoutInputRef },
  } = useAppSelector((state) => state);
  return (
    <>
      {openDialog && (
        <EditDialog
          image={image}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      )}
      <div
        className="
        self-center
        justify-self-center      
        overflow-hidden   
                        flex
                        flex-col
                        justify-center
                         
                          relative
                          size-[352px] 
                          border
       "
      >
        <Button
          onClick={() => {
            dispatch(removeAadharPrintoutImage(image.id));
            if (aadharPrintoutInputRef) aadharPrintoutInputRef.value = "";
          }}
          size={"icon"}
          variant={"outline"}
          className="self-center text-black z-20 rounded-full size-6  absolute top-1 print:hidden"
        >
          <X className="" size={15} />
        </Button>
        <figure className="size-[352px] ">
          <img
            id="main"
            style={{
              transform: `rotate(${image.filters.rotation}deg)`,
              filter: `brightness(${image.filters.brightness}%) contrast(${image.filters.contrast}%) saturate(${image.filters.saturation}%)`,
            }}
            onClick={() => setOpenDialog(true)}
            className={`
            w-[352px]
            h-[352px]
            cursor-pointer
            object-contain
            object-center 
            `}
            src={image.img}
            alt="image"
          />
        </figure>
      </div>
    </>
  );
};

export default SingleImage;
