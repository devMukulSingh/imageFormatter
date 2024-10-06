import { MutableRefObject, RefObject } from "react";

export interface base64Images {
  id: number;
  img: string;
  filters: {
    brightness: number;
    contrast: number;
    rotation: number;
    saturation: number;
  };
  textbox?: {
    location: EtextboxLocation;
    isActive: boolean;
  };
}

export interface IPersistInitialState {
  base64Images: base64Images[];
  passportSizeBase64Images: base64Images[];
  aadharPdfs: IaadharPdfs[];
  collageFiles: any;
  passportPhotoFiles: any;
  base64Pan: base64Images[];
  ayushmanPdfs: IaadharPdfs[];
  doubleSideAadharPdfs : IdoubleSideAadharPdfs[]
}
export interface InonPersistInitialState {
  loading: boolean;
  collageInputRef: HTMLInputElement | null;
  passportInputRef: HTMLInputElement | null;
  panInputRef: HTMLInputElement | null;
  aadharInputRef: HTMLInputElement | null;
  doubleSideAadharInputRef: HTMLInputElement | null;
  ayushmanInputRef: HTMLInputElement | null;
  passportPhotoIndexes: IpassportPhotoIndexes[];
}
type EtextboxLocation = "inImage" | "afterImage" | null;

export interface IpassportPhotoIndexes {
  imageId: number | null;
  textboxLocation: EtextboxLocation;
}

export interface IaadharPdfs {
  file: string;
  id: number;
  imgUrl: string;
}
export interface IdoubleSideAadharPdfs {
  file: string;
  id: number;
  imgUrl: {
    front:string,
    back:string
  };
}
