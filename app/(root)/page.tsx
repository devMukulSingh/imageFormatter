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

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([""]);
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
        setImages(base64Images);
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again");
      console.log(`Error in handleChange`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    setLoading(true);
    if(images){
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
                // contextualSpacing:true,
                // alignment:"center",
                indent:{

                },
                // thematicBreak:true,

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
    }
    else{
      toast.error('Please upload images to format')
    }

  };
  return (
    <main className=" bg-gradient-to-r from-indigo-500 via-purple-500 flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col gap-10 shadow-2xl hover:scale-105 transition border p-10 rounded-lg bg-purple-400">
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
        <Button disabled={loading} onClick={handleDownload}>
          Download Word file
        </Button>
      </div>
    </main>
  );
}
