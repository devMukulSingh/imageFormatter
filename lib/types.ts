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
}

export interface IPersistInitialState {
  base64Images: base64Images[];
  passportSizeBase64Images: base64Images[];
  aadharPdfs: IaadharPdfs[];
  collageFiles: any;
  passportPhotoFiles: any;
  base64Pan: base64Images[];
}
export interface InonPersistInitialState {
  loading: boolean;
  collageInputRef: HTMLInputElement | null;
  passportInputRef: HTMLInputElement | null;
  panInputRef: HTMLInputElement | null;
  aadharInputRef:HTMLInputElement | null
}

export interface IaadharPdfs {
  file: string;
  id: number;
}
