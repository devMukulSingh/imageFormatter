"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Iimages } from "@/lib/types";
import { CropIcon, FilterIcon, Save } from "lucide-react";
import { useRef, useState } from "react";
import FiltersComp from "./FiltersComp";
import CropComp from "./CropComp";
import { setAadharPrintoutCroppedImg } from "@/redux/slices/aadharPrintoutSlice";
import { ReactCropperElement } from "react-cropper";
import { setLoading } from "@/redux/slices/nonPersistReducer";

type Props = {
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  image: Iimages;
};
type ComponentType = "cropComp" | "filtersComp";
const EditDialog = ({ openDialog, setOpenDialog, image }: Props) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const dispatch = useAppDispatch();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { loading } = useAppSelector((state) => state.nonPersistedReducer);
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
    setCurrentComponent("cropComp");
  };
  const handleFilterWindow = () => {
    dispatch(setLoading(true));
    const canvas = cropperRef.current?.cropper.getCroppedCanvas();
    const croppedImage = canvas?.toDataURL();
    dispatch(
      setAadharPrintoutCroppedImg({
        id: image.id,
        img: croppedImage,
      })
    );
    dispatch(setLoading(false));
    setCurrentComponent("filtersComp");
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="min-w-[90vw] h-[95vh] bg-neutral-200 flex gap-10 flex-col  items-center overflow-auto">
        <div className="flex gap-5 w-[30rem] ">
          <Button
            className="w-1/2"
            disabled={loading}
            variant={`${currentComponent === "cropComp" ? "outline" : "default"}`}
            onClick={handleCropWindow}
          >
            <CropIcon className="mr-2" />
            Crop
          </Button>
          <Button
            className="w-1/2"
            disabled={loading}
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
