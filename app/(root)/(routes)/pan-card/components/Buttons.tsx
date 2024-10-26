import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/slices/nonPersistReducer";
import { Button } from "@/components/ui/button";
import { getBase64Image } from "@/lib/hooks";
import { Iimages } from "@/lib/types";
import { Printer, Trash, } from "lucide-react";
import toast from "react-hot-toast";
type Props = {
  disabled: boolean;
};

export default function Buttons({ disabled }: Props) {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="print:hidden lg:fixed top-[90px] px-2 py-1 z-30 gap-5 h-[3rem] flex justify-center items-center w-[793.7px] bg-neutral-200 ">

        <Button
          disabled={disabled}
          variant={"outline"}
          className="w-24 flex gap-1 text-black"
          onClick={() => globalThis.print()}
        >
          <Printer size={20} />
          Print
        </Button>

      </div>
    </>
  );
}
