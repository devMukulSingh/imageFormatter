import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setLoading } from "@/app/redux/reducers/nonPersistReducer";
import {
  pushBase64Images,
  removeAllImages,
} from "@/app/redux/reducers/persistReducer";
import { Button } from "@/components/ui/button";
import { getBase64Image } from "@/lib/hooks";
import { base64Images } from "@/lib/types";
import { PlusCircle, Printer, Trash } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

type Props = {
  disabled: boolean;
};

const Buttons = ({ disabled }: Props) => {
  const dispatch = useAppDispatch();
  const {
    nonPersistedReducer: { collageInputRef },
  } = useAppSelector((state) => state);
  const handleAddMore = async () => {
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.multiple = true;
    imageInput.click();
    imageInput.onchange = async (e: any) => {
      const file = e?.target?.files;
      try {
        let base64Images: base64Images[] | null = [];
        const files = e?.target?.files;
        if (files) {
          dispatch(setLoading(true));
          for (let i = 0; i < files?.length; i++) {
            const base64Image = await getBase64Image(files[i]);
            const imageId = Math.floor(Math.random() * 1000);
            base64Images.push({
              id: imageId,
              img: base64Image,
            });
          }
          dispatch(pushBase64Images(base64Images));
        }
      } catch (e) {
        toast.error("Something went wrong. Please try again");
        console.log(`Error in handleChange`);
      } finally {
        dispatch(setLoading(false));
      }
    };
  };
  return (
    <div className="print:hidden flex-shrink lg:fixed md:top-[90px] px-2 py-1 z-30 gap-5 h-[3rem]  flex justify-center items-center w-[793.7px] bg-neutral-200 ">
      <Button
        disabled={disabled}
        className="flex gap-1"
        variant={"destructive"}
        onClick={() => {
          dispatch(removeAllImages());
          if (collageInputRef) collageInputRef.value = "";
        }}
      >
        <Trash size={20} />
        Remove all
      </Button>
      <Button
        disabled={disabled}
        variant={"outline"}
        className="w-24 flex gap-1 text-black"
        onClick={() => globalThis.print()}
      >
        <Printer size={20} />
        Print
      </Button>

      <Button
        disabled={disabled}
        className="flex gap-1 items-center"
        onClick={handleAddMore}
      >
        <PlusCircle size={20} />
        Add more
      </Button>
      
    </div>
  );
};

export default Buttons;
