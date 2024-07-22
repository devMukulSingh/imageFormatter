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
// import Image from "next/image";

type Props = {};

const ImagesPage = ({}: Props) => {
  const { base64Images, loading } = useAppSelector((state) => state);
  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination?.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add, active;
  };

  return (
    <div className="flex relative flex-col bg-white gap-5 print:max-h-screen max-h-[calc(100vh-6.25rem)] print:overflow-visible overflow-y-auto">
      <Buttons disabled={base64Images.length > 0 ? false:true} />

      <div
        className="
                mt-[3rem]
                grid
                grid-cols-2
                auto-rows-max
                gap-4
                min-h-[1075px] 
                w-[50rem]
                print:h-screen 
                print:w-screen  
                bg-white 
                print:m-0
                py-5
                px-8"
      >
        {base64Images.map((image, index) => (
          <SingleImage image={image} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ImagesPage;
