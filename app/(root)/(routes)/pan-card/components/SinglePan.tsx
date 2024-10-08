import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { removeBase64Pan } from "@/redux/reducers/persistReducer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import EditDialog from "./EditDialog";
import { base64Images } from "@/lib/types";

type Props = {
  base64Pan: base64Images;
};

const SinglePan = ({ base64Pan }: Props) => {
  const dispatch = useAppDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const { brightness, contrast, rotation, saturation } = base64Pan.filters;

  const {
    nonPersistedReducer: { panInputRef },
  } = useAppSelector((state) => state);
  const handleRemove = () => {
    dispatch(removeBase64Pan(base64Pan.id));
    if (panInputRef) {
      panInputRef.value = "";
    }
  };
  return (
    <>
      {openDialog && (
        <EditDialog
          image={base64Pan}
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
          src={base64Pan?.img}
          alt="image"
        />
      </figure>
    </>
  );
};

export default SinglePan;
