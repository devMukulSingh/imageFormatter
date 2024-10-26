import { Fragment } from "react";

const EndOfPage = () => {
  return (
    <Fragment>
      <div className="flex  justify-center items-center col-span-full  z-20 print:hidden">
        <hr className=" w-1/2  border-2 x border-dashed border-black" />
        <h1 className="whitespace-nowrap bg-white text-black rounded-md py-1 px-2 font-semibold">
          End of page
        </h1>{" "}
        <hr className=" w-1/2 border-2  border-dashed border-black z-40" />
      </div>
      <hr className="w-full mb-[2px] border-2 col-span-full invisible" />
    </Fragment>
  );
};

export default EndOfPage;
