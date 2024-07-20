"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import {
  pushBase64Images,
  removeAllImages,
  removeImage,
  setLoading,
} from "@/app/redux/slice";
import { Button } from "@/components/ui/button";
import { getBase64Image } from "@/lib/hooks";
import { base64Images } from "@/lib/types";
import { PlusCircle, Printer, Trash, X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
type Props = {};

const ImagesPage = ({}: Props) => {
  const dispatch = useAppDispatch();
  const { base64Images, loading } = useAppSelector((state) => state);
  const handleAddMore = async () => {
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.multiple = true;
    imageInput.click();
    imageInput.onchange = async (e: any) => {
      const file = e?.target?.files;
      console.log(file);
      try {
        let base64Images: base64Images[] | null = [];
        const files = e?.target?.files;
        if (files) {
          dispatch(setLoading(true));
          for (let i = 0; i < files?.length; i++) {
            const base64Image = await getBase64Image(files[i]);
            const imageId = Math.floor(Math.random() * 1000);
            base64Images.push({
              id: imageId,
              img: base64Image,
            });
          }
          // if (files?.length+base64Images.length > 6) {
          //   toast.error("Maximum 6 photos allowed");
          //   const first_6_images = base64Images.slice(0, 6-base64Images.length);
          //   dispatch(pushBase64Images(first_6_images));
          // } else {
          // }
          dispatch(pushBase64Images(base64Images));
        }
      } catch (e) {
        toast.error("Something went wrong. Please try again");
        console.log(`Error in handleChange`);
      } finally {
        dispatch(setLoading(false));
      }
    };
  };
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
      {base64Images.length > 0 && (
        <div className="print:hidden fixed top-[90px] px-2 py-1 z-30 gap-5 h-[3rem] flex justify-center items-center w-[595px] bg-white ">
          <Button
            className="flex gap-1"
            variant={"destructive"}
            onClick={() => dispatch(removeAllImages())}
          >
            <Trash size={20} />
            Remove all
          </Button>
          <Button
            variant={"outline"}
            className="w-24 flex gap-1 text-black"
            onClick={() => globalThis.print()}
          >
            <Printer size={20} />
            Print
          </Button>

          <Button className="flex gap-1 items-center" onClick={handleAddMore}>
            <PlusCircle size={20} />
            Add more
          </Button>
        </div>
      )}

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="gallery">
          {(provided) => (
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
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {base64Images.map((image, index) => (
                <Draggable
                  key={image.id}
                  draggableId={image.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <figure
                        draggable
                        key={index}
                        className="
              w-[22rem]
              h-[22rem]
              relative
              flex
              flex-col
              border
              print:border-none
            "
                      >
                        <Button
                          size={"icon"}
                          variant={"outline"}
                          className="self-center text-black z-20 rounded-full size-6 mt-1 print:hidden"
                        >
                          <X
                            onClick={() => dispatch(removeImage(image.id))}
                            className=""
                            size={15}
                          />
                        </Button>
                        <Image
                          quality={7}
                          className="
              relative
              object-contain
              object-center
              "
                          fill
                          // width={180}
                          // height={180}
                          src={image.img}
                          key={index}
                          alt="image"
                        />
                      </figure>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImagesPage;
