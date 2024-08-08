"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setCroppedImg } from "@/app/redux/reducers/persistReducer";
import { Button } from "@/components/ui/button";
import { base64Images } from "@/lib/types";
import { CropIcon, RotateCw, Save } from "lucide-react";
import React, {
  MutableRefObject,
  // MouseEvent,
  // MouseEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";
import "../../../../../node_modules/cropperjs/dist/cropper.min.css";
import "cropperjs/dist/cropper.css";
import Cropper, { ReactCropperElement } from "react-cropper";
import { setLoading } from "@/app/redux/reducers/nonPersistReducer";

type Props = {
  imgRef: RefObject<HTMLImageElement>;
  image: base64Images;
  setOpenDialog: (openDialog: boolean) => void;
  cropperRef: RefObject<ReactCropperElement>;
};

const CropComp = ({ imgRef, image, setOpenDialog, cropperRef }: Props) => {
  useEffect(() => {
    cropperRef.current?.cropper.setCropBoxData({
      height: 380,
      width: 380,
    });
    const clearCropper = (e: MouseEvent) => {
      const id = (e?.target as HTMLElement).id;
      if (id === "radix-:r0:") {
        cropperRef.current?.cropper.clear();
      }
    };
    document.addEventListener("click", (e) => clearCropper(e));
    () => {
      document.removeEventListener("click", (e) => clearCropper(e));
    };
  }, []);

  const { rotation } = image.filters;
  const dispatch = useAppDispatch();
  const {loading } = useAppSelector( state => state.nonPersistedReducer)
  const handleClick = () => {
    dispatch(setLoading(true));
    const canvas = cropperRef.current?.cropper.getCroppedCanvas();
    const croppedImage = canvas?.toDataURL();
    dispatch(
      setCroppedImg({
        id: image.id,
        img: croppedImage,
      }),
    );
    dispatch(setLoading(false));
    setOpenDialog(false);
  };

  const handleRotate = () => {
    cropperRef.current?.cropper.rotate(90);
  };

  return (
    // <div className="border-black border-2 h-[35rem] w-[35rem] relative flex flex-col items-center justify-center">
    <>
      <div
        id="cropper"
        className="flex flex-col size-[30rem] border-2 border-black items-center justify-center"
      >
        <Cropper
          // autoCropArea={1}
          autoCrop={false}
          center={false}
          allowFullScreen
          className="w-full h-full "
          src={image.img}
          style={{}}
          // Cropper.js options
          guides={false}
          ref={cropperRef}
        />
      </div>
      <div className="flex gap-10">
        <Button
          disabled={loading}
          onClick={handleRotate}
          type="button"
          variant={"primary"}
        >
          Rotate
          <RotateCw className="ml-2" size={20} />
        </Button>
        <Button
          disabled={loading}
          onClick={handleClick}
          type="button"
          variant={"outline"}
          className=" "
        >
          Save
          <Save className="ml-2" size={20} />
        </Button>
      </div>
    </>
  );
};

export default CropComp;
// const [crop, setCrop] = useState<Crop>({
//   height: 80,
//   width: 90,
//   unit: "%",
//   x: 0,
//   y: 0,
// });
{
  /* <ReactCrop
        className={ `border `}
        crop={crop}
        onChange={(c) => setCrop(c)}
      > */
}
{
  /* <div className="flex">
        <img
          // style={{
          //   transform: `rotate(${rotation}deg)`,
          //   // filter: `
          //   //     saturate(${saturation}%)
          //   //     contrast(${contrast}%)
          //   //     brightness(${brightness})
          //   //     `,
          // }}
          // height={560}
          // width={560}
          className={`block  max-w-full  `}
          ref={imgRef}
          src={image.img}
          alt="edit image"
        />
      </div> */
}
{
  /* </ReactCrop> */
}
// function onImageLoad(e: any) {
//   const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
// const crop = centerCrop(
//   makeAspectCrop(
//     {
//       unit: "%",
//       width: 90,
//     },
//     5 / 3,
//     width,
//     height
//   ),
//   width,
//   height
// );

//   setCrop(crop);
// }
