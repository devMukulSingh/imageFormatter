"use client";
import { useAppDispatch } from "@/redux/hook";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { cropImage } from "@/lib/hooks";
import { base64Images } from "@/lib/types";
import { Check, CropIcon, FilterIcon, Save } from "lucide-react";
import Image from "next/image";
import { ReactElement, useRef, useState } from "react";
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";
import FiltersComp from "./FiltersComp";
import CropComp from "./CropComp";
import { getContainedSize } from "@/lib/utils";
import { setCroppedImg, setEditedPan } from "@/redux/reducers/persistReducer";
import { ReactCropperElement } from "react-cropper";

type Props = {
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  image: base64Images;
};
type ComponentType = "cropComp" | "filtersComp";
const EditDialog = ({ openDialog, setOpenDialog, image }: Props) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const dispatch = useAppDispatch();
  const imgRef = useRef<HTMLImageElement>(null);

  const [currentComponent, setCurrentComponent] =
    useState<ComponentType>("cropComp");

  const renderComponent = () => {
    switch (currentComponent) {
      case "cropComp":
        return (
          <CropComp
            image={image}
            imgRef={imgRef}
            cropperRef={cropperRef}
            setOpenDialog={setOpenDialog}
          />
        );
      case "filtersComp":
        return (
          <FiltersComp
            cropperRef={cropperRef}
            setOpenDialog={setOpenDialog}
            image={image}
            imgRef={imgRef}
          />
        );
      default:
        return null;
    }
  };

  const handleCropWindow = () => {
    // handleSaveImage();
    setCurrentComponent("cropComp");
  };
  const handleFilterWindow = () => {
    const canvas = cropperRef.current?.cropper.getCroppedCanvas();
    const croppedImage = canvas?.toDataURL();
    dispatch(
      setEditedPan({
        id: image.id,
        img: croppedImage,
      }),
    );
    setCurrentComponent("filtersComp");
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="min-w-[90vw] h-[95vh] bg-neutral-200 gap-10 flex flex-col  items-center overflow-auto">
        <div className="flex items-center gap-5 w-[30rem] ">
          <Button
            variant={`${currentComponent === "cropComp" ? "outline" : "default"}`}
            onClick={handleCropWindow}
            className="w-1/2"
          >
            <CropIcon className="mr-2" />
            Crop
          </Button>
          <Button
            type="button"
            variant={`${currentComponent === "filtersComp" ? "outline" : "default"}`}
            onClick={handleFilterWindow}
            className="w-1/2"
          >
            <FilterIcon className="mr-2" />
            Filters
          </Button>
        </div>
        {renderComponent()}
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
// const handleSaveImage = () => {
//   const canvas = document.createElement("canvas");
//   if (imgRef.current) {
//     const img = imgRef.current;
//     const { height, width } = getContainedSize(img);
//     canvas.width = img.width;
//     canvas.height = img.height;

//     const ctx = canvas.getContext("2d");

//     if (ctx) {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.save();
//       ctx.translate(canvas.width / 2, canvas.height / 2);
//       ctx.rotate((rotation * Math.PI) / 180);
//       ctx.drawImage(img, -width / 2, -height / 2, width, height);

//       ctx.restore();
//     }
//     const fileredImage = canvas.toDataURL();

//     dispatch(
//       setCroppedImg({
//         id: image.id,
//         img: fileredImage,
//       }),
//     );
//   }
// };
