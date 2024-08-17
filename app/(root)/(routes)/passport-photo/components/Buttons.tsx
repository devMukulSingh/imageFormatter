import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setLoading } from "@/redux/reducers/nonPersistReducer";
import {
  pushBase64Images,
  pushPassportSizeBase64Images,
  removeAllImages,
  removeAllPassportSizeImages,
  removeImage,
} from "@/redux/reducers/persistReducer";
import { Button } from "@/components/ui/button";
import { getBase64Image } from "@/lib/hooks";
import { base64Images } from "@/lib/types";
import { PlusCircle, Printer, Trash, X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

type Props = {
  disabled: boolean;
  setCurrentComp: (currentComp: string) => void;
  currentComp: string;
};

export default function Buttons({
  disabled,
  currentComp,
  setCurrentComp,
}: Props) {
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
              filters: {
                brightness: 100,
                contrast: 100,
                rotation: 0,
                saturation: 100,
              },
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
  const {
    nonPersistedReducer: { passportInputRef },
  } = useAppSelector((state) => state);
  const handleRemoveAll = () => {
    dispatch(removeAllPassportSizeImages());
    if (passportInputRef) passportInputRef.value = "";
  };
  const handleAlignCenter = () => {
    if (currentComp === "horizontal") setCurrentComp("vertical");
    else if(currentComp==="vertical") setCurrentComp("horizontal");
    else setCurrentComp("horizontal")
  };
  return (
    <>
      <div className="print:hidden bg-neutral-200 lg:fixed top-[90px] px-2 py-1 z-40 gap-5 h-[3rem] flex justify-center items-center   min-w-[793.7px] ">
        <Button
          disabled={disabled}
          className="flex gap-1"
          variant={"destructive"}
          onClick={handleRemoveAll}
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
          className="flex gap-1 items-center"
          onClick={handleAddMore}
        >
          <PlusCircle size={20} />
          Add more
        </Button>
        <Button
          disabled={disabled}
          className="flex gap-1 items-center"
          onClick={handleAlignCenter}
        >
          {currentComp === "horizontal" ? " Align center" : "Align normal"}
        </Button>
          
          <Button
          disabled={disabled }
          className="flex gap-1 items-center"
          onClick={() => setCurrentComp("singleVertical")}
          >
          Single row
        </Button>
      </div>
    </>
  );
}
