"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";
import {
  Column,
  ColumnBreak,
  Document,
  ImageRun,
  Packer,
  PageBreak,
  Paragraph,
  Tab,
  TextRun,
} from "docx";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Download, Printer } from "lucide-react";
import {
  pushBase64Images,
  setBase64Images,
  setCollageFiles,
} from "@/app/redux/reducers/persistReducer";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { base64Images } from "@/lib/types";
import { getBase64Image } from "@/lib/hooks";
import {
  setCollageInputRef,
  setLoading,
} from "@/app/redux/reducers/nonPersistReducer";

type Props = {
  // fileRef: RefObject<HTMLInputElement>;
};

const UploadComp = ({}: Props) => {
  const collageInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const {
    nonPersistedReducer: { loading },
    persistedReducer: { base64Images: images },
  } = useAppSelector((state) => state);
  const sectionProperties = {
    page: {
      margin: {
        left: 400,
        right: 400,
        top: 500,
        bottom: 500,
      },
    },
    column: {
      space: 10,
      count: 2,
      equalWidth: true,
      children: [
        new Column({
          width: 720 * 10,
          space: 10,
        }),
        new Column({
          width: 720 * 10,
          space: 10,
        }),
      ],
    },
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      let base64Images: base64Images[] | null = [];
      const files = e?.target?.files;
      if (files) {
        dispatch(setLoading(true));
        for (let i = 0; i < files?.length; i++) {
          if (files[i].type.slice(0, 5) !== "image") {
            toast.error("Only images allowed");
            break;
          }
          // const base64Image = await getBase64Image(files[i]);
          const imgUrl = URL.createObjectURL(files[i]);
          console.log(imgUrl);

          const imageId = Math.floor(Math.random() * 100000);
          base64Images.push({
            id: imageId,
            img: imgUrl,
          });
        }
        dispatch(pushBase64Images(base64Images));
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again");
      console.log(`Error in handleChange`);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDownload = () => {
    if (images.length > 0) {
      dispatch(setLoading(true));
      const doc = new Document({
        styles: {},
        sections: [
          {
            properties: sectionProperties,
            children: [
              new Paragraph({
                spacing: {
                  line: 300,
                },
                heading: "Heading1",
                alignment: "center",
                indent: {},
                children: [
                  new ImageRun({
                    data: images[0]?.img,
                    transformation: {
                      height: 340,
                      width: 340,
                    },
                  }),
                  new ImageRun({
                    data: images[1]?.img,
                    transformation: {
                      height: 340,
                      width: 340,
                    },
                  }),
                  new ImageRun({
                    data: images[2]?.img,
                    transformation: {
                      height: 340,
                      width: 340,
                    },
                  }),
                  new ColumnBreak(),
                  ////////2nd COLUMN////////////////
                  new ImageRun({
                    data: images[3]?.img,
                    transformation: {
                      height: 340,
                      width: 340,
                    },
                  }),
                  new ImageRun({
                    data: images[4]?.img,
                    transformation: {
                      height: 340,
                      width: 340,
                    },
                  }),
                  new ImageRun({
                    data: images[5]?.img,
                    transformation: {
                      height: 340,
                      width: 340,
                    },
                  }),
                ],
              }),
            ],
          },
        ],
      });

      dispatch(setLoading(false));
      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "example.docx");
      });
    } else {
      toast.error("Please upload images to format");
    }
  };
  useEffect(() => {
    dispatch(setCollageInputRef(collageInputRef.current));
  }, []);
  return (
    <div
      className="
        print:hidden
        flex
        items-center
        h-fit 
        w-[18rem]
        flex-col 
        gap-8
        shadow-2xl 
        hover:scale-105
        transition 
        border 
        px-8 
        py-10
        rounded-lg 
        bg-purple-400"
    >
      <Label className="text-lg text-white" htmlFor="picture">
        Upload Images
      </Label>
      <Input
        ref={collageInputRef}
        onChange={handleChange}
        className="bg-slate-200 cursor-pointer h-28 "
        type="file"
        multiple
        disabled={loading}
      />
      {/* <div className="flex gap-5">
        <Button disabled={loading} onClick={handleDownload}>
          <Download size={20} className="mr-2" />
          Download DOCX
        </Button>
      </div> */}
    </div>
  );
};

export default UploadComp;
