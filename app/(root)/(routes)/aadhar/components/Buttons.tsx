import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setLoading } from "@/redux/reducers/nonPersistReducer";
import {
  pushAadharPdfs,
  pushBase64Images,
  removeAllAadharPdfs,
  removeAllImages,
} from "@/redux/reducers/persistReducer";
import { Button } from "@/components/ui/button";
import { getBase64Image } from "@/lib/hooks";
import { base64Images, IaadharPdfs } from "@/lib/types";
import { PlusCircle, Printer, Trash } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

type Props = {
  disabled: boolean;
  currComp: string;
  setCurrComp: (currComp: string) => void;
};

const Buttons = ({ disabled, currComp, setCurrComp }: Props) => {
  const dispatch = useAppDispatch();
  const {
    nonPersistedReducer: { aadharInputRef,loading },
  } = useAppSelector((state) => state);
  const handleAddMore = async () => {
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.multiple = true;
    imageInput.click();
    imageInput.onchange = async (e: any) => {
      try {
        let base64Images: IaadharPdfs[] | null = [];
        const files = e?.target?.files;
        if (files) {
          if (files?.length > 10) {
            toast.error("Maximum 10 files allowed at a time");
            return;
          }
          dispatch(setLoading(true));
          for (let i = 0; i < files?.length; i++) {
            const imgUrl = URL.createObjectURL(files[i]);
            const imageId = Math.floor(Math.random() * 1000);
            base64Images.push({
              id: imageId,
              file: imgUrl,
              imgUrl: "",
            });
          }
          dispatch(pushAadharPdfs(base64Images));
        }
      } catch (e) {
        toast.error("Something went wrong. Please try again");
        console.log(`Error in handleChange`);
      } finally {
        dispatch(setLoading(false));
      }
    };
  };
  const handleRotate = () => {
    if (currComp === "horizontal") setCurrComp("vertical");
    else setCurrComp("horizontal");
  };
  return (
    <div className="print:hidden flex-shrink  md:top-[385px] px-2 py-1 z-30 gap-5 h-[3rem]  flex justify-center items-center w-[95vw] bg-neutral-200 ">
      <Button
        disabled={disabled}
        className="flex gap-1 print:hidden "
        variant={"destructive"}
        onClick={() => {
          dispatch(removeAllAadharPdfs());
          if (aadharInputRef) aadharInputRef.value = "";
        }}
      >
        <Trash size={20} />
        Remove all
      </Button>
      <Button
        disabled={disabled}
        variant={"outline"}
        className="w-24 flex gap-1 text-black print:hidden "
        onClick={() => globalThis.print()}
      >
        <Printer size={20} />
        Print
      </Button>

      <Button
        disabled={disabled || loading}
        className="flex gap-1 items-center"
        onClick={handleRotate}
      >
        <PlusCircle size={20} />
        Rotate
      </Button>
    </div>
  );
};

export default Buttons;
