import { useAppDispatch } from "@/app/redux/hook";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { handleCrop } from "@/lib/hooks";
import { base64Images } from "@/lib/types";
import { Check } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";

type Props = {
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  image: base64Images;
};

const EditDialog = ({ openDialog, setOpenDialog, image }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const dispatch = useAppDispatch();
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const handleClick = () => {
    imgRef.current &&
      handleCrop({
        image: imgRef.current,
        crop,
        setCrop,
        imgId: image.id,
        dispatch,
      });
    setOpenDialog(false);
  };
  function onImageLoad(e:any) {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        5 / 3,
        width,
        height
      ),
      width,
      height
    );

    setCrop(crop);
  }
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="min-w-[90vw] h-[90vh] bg-neutral-200 gap-5 flex flex-col  items-center justify-center ">
        <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
          <figure className="">
            <img
                onLoad={onImageLoad}
              className="object-contain max-w-[60vw] max-h-[60vh]"
              ref={imgRef}
              src={image.img}
              alt="edit image"
            />
          </figure>
        </ReactCrop>
        <DialogFooter>
          <Button
            onClick={handleClick}
            type="button"
            size={"icon"}
            variant={"outline"}
            className="self-center text-black z-20 rounded-full size-12  print:hidden absolute bottom-2"
          >
            <Check className="" size={25} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
