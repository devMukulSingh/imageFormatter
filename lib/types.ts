export interface base64Images {
  id: number;
  img: string;
}

export interface IinitialState {
  base64Images: base64Images[];
  loading: boolean;
  passportSizeBase64Images: base64Images[];
  aadharPdfs: IaadharPdfs[];
  collageFiles: any;
  passportPhotoFiles: any;
  base64Pan: string;
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
