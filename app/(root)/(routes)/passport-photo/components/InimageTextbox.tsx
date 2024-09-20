import { Textarea } from '@/components/ui/textarea';
import React from 'react'

const InimageTextbox = () => {
  return (
    <>
      <Textarea className=" bg-white absolute bottom-0 focus:outline-0 resize-none focus:border-0 text-[12px] font-thin text-center min-h-[10px]  px-[2px] py-[2px] leading-none text-black rounded-none w-[124px] border-[1.5px] border-black" />
    </>
  );
}

export default InimageTextbox