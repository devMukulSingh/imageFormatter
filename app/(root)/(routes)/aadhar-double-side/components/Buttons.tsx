import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  removeAllDoubleSideAadharPdfs,
} from "@/redux/slices/doubleSideAadharSlice";
import { Button } from "@/components/ui/button";
import { Printer, Trash } from "lucide-react";
import React from "react";

type Props = {
  disabled: boolean;
  currComp: string;
  setCurrComp: (currComp: string) => void;
};

const Buttons = ({ disabled, currComp, setCurrComp }: Props) => {
  const dispatch = useAppDispatch();
  const {
    doubleSideAadharSlice: { doubleSideAadharInputRef },
  } = useAppSelector((state) => state);
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
          dispatch(removeAllDoubleSideAadharPdfs());
          if (doubleSideAadharInputRef) doubleSideAadharInputRef.value = "";
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


    </div>
  );
};

export default Buttons;
