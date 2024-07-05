"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
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
import { setBase64Images } from "@/app/redux/slice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";

const UploadComp = () => {
  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.base64Images);
  const [loading, setLoading] = useState(false);
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
  const getBase64Image = async (image: Blob): Promise<any> => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(image);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  };
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      let base64Images: string[] | null = [];
      const files = e?.target?.files;
      if (files) {
        setLoading(true);
        for (let i = 0; i < files?.length; i++) {
          const base64Image = await getBase64Image(files[i]);
          base64Images.push(base64Image);
        }
        if (files?.length > 6) {
          toast.error("Maximum 6 photos allowed");
          const first_6_images = base64Images.slice(0, 6);
          dispatch(setBase64Images(first_6_images));
        } else {
          dispatch(setBase64Images(base64Images));
        }
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again");
      console.log(`Error in handleChange`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (images.length > 0) {
      setLoading(true);
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
                    data: images[0],
                    transformation: {
                      height: 340,
                      width: 340,
                    },
                  }),
                  new ImageRun({
                    data: images[1],
                    transformation: {
                      height: 340,
                      width: 340,
                    },
                  }),
                  new ImageRun({
                    data: images[2],
                    transformation: {
                      height: 340,
                      width: 340,
                    },
                  }),
                  new ColumnBreak(),
                  ////////2nd COLUMN////////////////
                  new ImageRun({
                    data: images[3],
                    transformation: {
                      height: 340,
                      width: 340,
                    },
                  }),
                  new ImageRun({
                    data: images[4],
                    transformation: {
                      height: 340,
                      width: 340,
                    },
                  }),
                  new ImageRun({
                    data: images[5],
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

      setLoading(false);
      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "example.docx");
      });
    } else {
      toast.error("Please upload images to format");
    }
  };
  return (
    <>
      <div
        className="
        print:hidden
        flex
        h-fit 
        flex-col 
        gap-10 
        shadow-2xl 
        hover:scale-105
        transition 
        border 
        p-10 
        rounded-lg 
        bg-purple-400"
      >
        <Label className="text-lg text-white" htmlFor="picture">
          Upload Images
        </Label>
        <Input
          onChange={handleChange}
          className="bg-slate-200 cursor-pointer"
          type="file"
          multiple
          disabled={loading}
        />
        <div className="flex gap-5">
          {/* <Button disabled={loading} onClick={()  => globalThis.print()}>
            <Download size={20} className="mr-2" />
            Print
          </Button> */}
          <Button disabled={loading} onClick={handleDownload}>
            <Download size={20} className="mr-2" />
            Download DOCX
          </Button>
        </div>
      </div>
    </>
  );
};

export default UploadComp;
