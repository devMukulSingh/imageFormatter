"use client";
import { useAppSelector } from "@/redux/hook";
import Buttons from "./Buttons";
import SinglePan from "./SinglePan";

type Props = {};

const ImagesPage = ({}: Props) => {
  const {
    panSlice:{panCardImages},
    nonPersistedReducer: { loading },
  } = useAppSelector((state) => state);

  return (
    <div className="flex relative flex-col bg-white gap-5 print:max-h-screen max-h-[calc(100vh-6.25rem)] print:overflow-visible overflow-y-auto">
      <Buttons disabled={panCardImages.length > 0 ? false : true} />
      <div
        className="
        flex
        justify-center
        mt-[3rem]
        min-h-[1122.5px]
       w-[793.7px]
        bg-white 
        print:m-0
        py-10
        px-5
        "
      >
        {panCardImages.length !== 0 && <SinglePan panCardImage={panCardImages[0]} />}
      </div>
    </div>
  );
};
export default ImagesPage;
