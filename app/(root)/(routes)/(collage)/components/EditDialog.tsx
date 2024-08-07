"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { cropImage } from "@/lib/hooks";
import { base64Images } from "@/lib/types";
import { Check, CropIcon, FilterIcon, Save } from "lucide-react";
import Image from "next/image";
import { ReactElement, useEffect, useRef, useState } from "react";
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";
import FiltersComp from "./FiltersComp";
import CropComp from "./CropComp";
import { getContainedSize } from "@/lib/utils";
import { setCroppedImg } from "@/app/redux/reducers/persistReducer";
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
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [currentComponent, setCurrentComponent] =
    useState<ComponentType>("cropComp");

  const renderComponent = () => {
    switch (currentComponent) {
      case "cropComp":
        return (
          <CropComp
            image={image}
            imgRef={imgRef}
            setOpenDialog={setOpenDialog}
            cropperRef={cropperRef}
          />
        );
      case "filtersComp":
        return (
          <FiltersComp
            setOpenDialog={setOpenDialog}
            image={image}
            cropperRef={cropperRef}
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
      setCroppedImg({
        id: image.id,
        img: croppedImage,
      })
    );
    setCurrentComponent("filtersComp");
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="min-w-[90vw] h-[95vh] bg-neutral-200 gap-10 flex flex-col  items-center overflow-auto">
        <div className="flex items-center gap-10">
          <Button
            variant={`${currentComponent === "cropComp" ? "outline" : "default"}`}
            onClick={handleCropWindow}
          >
            <CropIcon className="mr-2" />
            Crop
          </Button>
          <Button
            type="button"
            variant={`${currentComponent === "filtersComp" ? "outline" : "default"}`}
            onClick={handleFilterWindow}
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
