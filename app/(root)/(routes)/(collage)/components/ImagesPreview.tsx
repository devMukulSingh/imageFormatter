"use client";
import { useAppSelector } from "@/app/redux/hook";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import Buttons from "./Buttons";
import SingleImage from "./SingleImage";
import { useEffect, useRef, useState } from "react";
import EndOfPage from "@/components/EndOfPage";

type Props = {

};

const ImagesPreview = ({  }: Props) => {
  const [a4PageHeight, setA4PageHeight] = useState(0);
  const a4pageRef = useRef<HTMLDivElement | null>(null);
  const { base64Images: collageImages, loading } = useAppSelector(
    (state) => state
  );
  useEffect(() => {
    if (a4pageRef?.current) setA4PageHeight(a4pageRef.current?.scrollHeight);
  }, [collageImages]);

  return (
    <div className="flex relative flex-col bg-white gap-5 print:max-h-screen max-h-[calc(100vh-6.25rem)] print:overflow-visible  overflow-y-auto">
      <Buttons
        disabled={collageImages.length > 0 ? false : true}

      />
      <div
        ref={a4pageRef}
        className="
                mt-[3rem]
                grid
                grid-cols-2
                gap-4
                min-h-[1122.5px]
                w-[793.7px]
                auto-rows-max
                bg-white 
                print:mt-0
                py-5
                px-8"
      >
        {collageImages.map((image, index) => {
          if (a4PageHeight > 1120 && index % 6 === 0 && index !== 0)
            return (
              <>
                <EndOfPage />
                <div className=" size-[352px] ">
                  <SingleImage image={image} key={index}  />;
                </div>
              </>
            );
          return <SingleImage image={image} key={index}  />;
        })}
      </div>
    </div>
  );
};

export default ImagesPreview;
// const handleOnDragEnd = (result: DropResult) => {
//   const { source, destination } = result;
//   if (!destination) return;
//   if (
//     destination?.droppableId === source.droppableId &&
//     destination.index === source.index
//   )
//     return;

//   let add, active;
// };
