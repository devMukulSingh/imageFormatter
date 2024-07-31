import { MutableRefObject, RefObject } from "react";

export interface base64Images {
  id: number;
  img: string;
}

export interface IinitialState {
  collageInputRef: HTMLInputElement | null;
  passportInputRef: HTMLInputElement | null;
  panInputRef: HTMLInputElement | null;
  base64Images: base64Images[];
  loading: boolean;
  passportSizeBase64Images: base64Images[];
  aadharPdfs: IaadharPdfs[];
  collageFiles: any;
  passportPhotoFiles: any;
  base64Pan: base64Images[];
  filters: {
    brightness: number;
    contrast: number;
    saturation: number;
    rotation: number;
  };
}

export interface IaadharPdfs {
  file: string;
  id: number;
}
