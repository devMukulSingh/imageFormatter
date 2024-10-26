import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import EditDialog from "./EditDialog";
import { Iimages } from "@/lib/types";
import { removeBase64Pan } from "@/redux/slices/panSlice";

type Props = {
  panCardImage: Iimages;
};

const SinglePan = ({ panCardImage }: Props) => {
  const dispatch = useAppDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const { brightness, contrast, rotation, saturation } = panCardImage.filters;

  const {
    panSlice:{panInputRef}
  } = useAppSelector((state) => state);
  const handleRemove = () => {
    dispatch(removeBase64Pan(panCardImage.id));
    if (panInputRef) {
      panInputRef.value = "";
    }
  };
  return (
    <>
      {openDialog && (
        <EditDialog
          image={panCardImage}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      )}
      <figure
        onClick={() => setOpenDialog(true)}
        draggable
        className="
              cursor-pointer
              size-[22rem]
              relative
              flex
              flex-col
            "
      >
        <Button
          onClick={handleRemove}
          size={"icon"}
          variant={"outline"}
          className="self-center z-20 text-black absolute rounded-full size-6 mt-1 print:hidden"
        >
          <X className="" size={15} />
        </Button>

        <img
          style={{
            transform: `rotate(${rotation}deg)`,
            filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
          }}
          className="
          relative
          object-contain
          object-center
          !max-w-[22rem]
          !max-h-[22rem]
          "
          src={panCardImage?.img}
          alt="image"
        />
      </figure>
    </>
  );
};

export default SinglePan;
