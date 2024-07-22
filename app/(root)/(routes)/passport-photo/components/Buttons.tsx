import { useAppDispatch } from "@/app/redux/hook";
import {
  pushBase64Images,
  pushPassportSizeBase64Images,
  removeAllImages,
  removeAllPassportSizeImages,
  removeImage,
  setLoading,
} from "@/app/redux/slice";
import { Button } from "@/components/ui/button";
import { getBase64Image } from "@/lib/hooks";
import { base64Images } from "@/lib/types";
import { PlusCircle, Printer, Trash, X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

type Props = {
  disabled: boolean;
};

export default function Buttons({ disabled }: Props) {
  const dispatch = useAppDispatch();
  const handleAddMore = async () => {
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.click();
    imageInput.onchange = async (e: any) => {
      try {
        let base64Images: base64Images[] = [];
        const file = e?.target?.files[0];
        if (file) {
          dispatch(setLoading(true));
          const base64Image = await getBase64Image(file);
          for (let i = 0; i < 6; i++) {
            const imageId = Math.floor(Math.random() * 1000);
            base64Images.push({
              id: imageId,
              img: base64Image,
            });
          }
          dispatch(pushPassportSizeBase64Images(base64Images));
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
    <>
      <div
       className="print:hidden fixed top-[90px] px-2 py-1 z-30 gap-5 h-[3rem] flex justify-center items-center w-[595px] bg-white ">
        <Button
         
                 disabled={disabled}
         className="flex gap-1"
          variant={"destructive"}
          onClick={() => dispatch(removeAllPassportSizeImages())}
        >
          <Trash size={20} />
          Remove all
        </Button>
        <Button
          variant={"outline"}
         
                  disabled={disabled}
          className="w-24 flex gap-1 text-black"
          onClick={() => globalThis.print()}
        >
          <Printer size={20} />
          Print
        </Button>

        <Button
                 disabled={disabled}
         className="flex gap-1 items-center" onClick={handleAddMore}>
          <PlusCircle size={20} />
          Add more
        </Button>
      </div>
    </>
  );
}
