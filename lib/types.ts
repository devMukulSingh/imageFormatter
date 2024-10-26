type EtextboxLocation = "inImage" | "afterImage" | null;

export interface Iimages {
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
export interface IaadharPdfs {
  file: string;
  id: number;
  imgUrl: string;
}
export interface IdoubleSideAadharPdfs {
  file: string;
  id: number;
  imgUrl: {
    front: string;
    back: string;
  };
}
////////////////////////////INITIAL STATE////////////////////////////
export interface ICollageInitialState {
  collageImages: Iimages[];
  collageInputRef: HTMLInputElement | null;
  collageFiles: string
}

export interface IAadharPrintoutInitialState {
  aadharPrintoutImages: Iimages[],
  aadharPrintoutInputRef: HTMLInputElement | null;
}
export interface IAadharCardInitialstate {
  aadharCardInputRef: HTMLInputElement | null;
  aadharPdfs: IaadharPdfs[],
}
export interface IDoubleSideAadharInitalState {
  doubleSideAadharPdfs: IdoubleSideAadharPdfs[],
  doubleSideAadharInputRef: HTMLInputElement | null;
}
export interface IAyushmanInitialState {
  ayushmanPdfs: IaadharPdfs[];
  ayushmanInputRef: HTMLInputElement | null;
}

export interface IPassportSizeImages {
  passportInputRef: HTMLInputElement | null;
  passportSizePhotos: Iimages[],
  passportPhotoFiles: '',
  passportPhotoIndexes: IPassportPhotoIndexes[]
}

export interface IPassportPhotoIndexes {
  imageId: number | null;
  textboxLocation: EtextboxLocation;
}

export interface IPanInitialState {
  panInputRef: HTMLInputElement | null;
  panCardImages: Iimages[]
}

export interface InonPersistInitialState {
  loading: boolean;
}
