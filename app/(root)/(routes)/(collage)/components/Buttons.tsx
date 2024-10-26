import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setLoading } from "@/redux/slices/nonPersistReducer";
import { Button } from "@/components/ui/button";
import { getBase64Image } from "@/lib/hooks";
import { PlusCircle, Printer, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { pushcollageImages, removeAllImages } from "@/redux/slices/collageSlice";
import { Iimages } from "@/lib/types";

type Props = {
  disabled: boolean;
};

const Buttons = ({ disabled }: Props) => {
  const dispatch = useAppDispatch();
  const {
    collageSlice:{collageInputRef}
  } = useAppSelector((state) => state);
  const handleAddMore = async () => {
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.multiple = true;
    imageInput.click();
    imageInput.onchange = async (e: any) => {
      try {
        let base64Images: Iimages[] | null = [];
        const files = e?.target?.files;
        if (files) {
          dispatch(setLoading(true));
          for (let i = 0; i < files?.length; i++) {
            const base64Image = await getBase64Image(files[i]);
            const imageId = Math.floor(Math.random() * 1000);
            base64Images.push({
              id: imageId,
              img: base64Image,
              filters: {
                brightness: 100,
                contrast: 100,
                rotation: 0,
                saturation: 100,
              },
            });
          }
          dispatch(pushcollageImages(base64Images));
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
