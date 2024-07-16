'use client'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook';
import { removeImage } from '@/app/redux/slice';
import { Button } from '@/components/ui/button';
import { Printer, X } from 'lucide-react';
import Image from 'next/image';

type Props = {

}

const ImagesPage = ({

}:Props) => {
  const dispatch = useAppDispatch();

  const base64Images = useAppSelector( state => state.base64Images);
  return (
    <div className="flex flex-col bg-white gap-5 print:max-h-screen max-h-[calc(100vh-6.25rem)] overflow-y-auto">
      <Button
        variant={"outline"}
        className="print:hidden w-24 mx-auto self-center fixed top-22 z-30"
        onClick={() => globalThis.print()}
      >
        <Printer size={18} className="mr-2" />
        Print
      </Button>
      <div
        className="
        grid
        grid-cols-2
        gap-3
        min-h-[843px] 
        w-[595px]
        print:h-screen 
        print:w-screen  
        bg-white 
        print:m-0
        py-5
        px-8
        "
      >
        {base64Images.map((image, index) => (
          <figure
            key={index}
            className="
              w-[16rem]
              print:w-[22rem]
              print:h-[22rem]
              h-[16rem]
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
              className="self-center z-30 rounded-full size-6 mt-1 print:hidden"
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
        ))}
      </div>
    </div>
  );
}

export default ImagesPage