import { IPersistInitialState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

// let db;

// let request = indexedDB.open("myDatabase", 1);

// request.onerror = function (event) {
//   console.log("Error opening IndexedDB:", event);
// };

// request.onsuccess = function (event) {
//   db = event.target.result;
//   console.log("Database opened successfully");
// };
// request.onupgradeneeded = function (event) {
//   db = event.target.result;
//   let objectStore = db.createObjectStore("myStore", { keyPath: "id", autoIncrement: true });
//   objectStore.createIndex("base64Images", [], { unique: false });
//   objectStore.createIndex("passportSizeBase64Images", [], { unique: true });
//   objectStore.createIndex("base64Pan", [], { unique: true });
// };
// function getData(key:string) {
//   let transaction = db?.transaction(["myStore"], "readonly");
//   let objectStore = transaction.objectStore("myStore");
//   let request = objectStore.get(key);

//   request.onsuccess = function (event) {
//     if (request.result) {
//       console.log("Data retrieved:", request.result);
//     } else {
//       console.log("Data not found");
//     }
//   };

//   request.onerror = function (event) {
//     console.log("Unable to retrieve data:", event);
//   };
// }
// function addData(data:any) {
//   let transaction = db?.transaction(["myStore"], "readwrite");
//   let objectStore = transaction.objectStore("myStore");
//   let request = objectStore.add(data);

//   request.onsuccess = function (event) {
//     console.log("Data has been added to your database.");
//   };

//   request.onerror = function (event) {
//     console.log("Unable to add data:", event);
//   };
// }

const initialState: IPersistInitialState = {
  base64Images: [],
  passportSizeBase64Images: [],
  aadharPdfs: [],
  doubleSideAadharPdfs: [
  ],
  collageFiles: "",
  passportPhotoFiles: "",
  base64Pan: [],
  ayushmanPdfs: [],
};

export const persistedSlice = createSlice({
  name: "persistedSlice",
  initialState,
  reducers: {
    setBrightness: (state, action) => {
      const { id, value } = action.payload;
      for (let i = 0; i < state.base64Images.length; i++) {
        if (state.base64Images[i].id === id) {
          state.base64Images[i].filters.brightness = value;
          return;
        }
      }
    },
    setContrast: (state, action) => {
      const { id, value } = action.payload;

      for (let i = 0; i < state.base64Images.length; i++) {
        if (state.base64Images[i].id === id) {
          state.base64Images[i].filters.contrast = value;
          return;
        }
      }
    },
    setRotation: (state, action) => {
      const { id, value } = action.payload;
      for (let i = 0; i < state.base64Images.length; i++) {
        if (state.base64Images[i].id === id) {
          state.base64Images[i].filters.rotation = value;
          return;
        }
      }
    },
    setSaturation: (state, action) => {
      const { id, value } = action.payload;
      for (let i = 0; i < state.base64Images.length; i++) {
        if (state.base64Images[i].id === id) {
          state.base64Images[i].filters.saturation = value;
          return;
        }
      }
    },
    setPanContrast: (state, action) => {
      const { id, value } = action.payload;

      for (let i = 0; i < state.base64Pan.length; i++) {
        if (state.base64Pan[i].id === id) {
          state.base64Pan[i].filters.contrast = value;
          return;
        }
      }
    },
    setPanRotation: (state, action) => {
      const { id, value } = action.payload;
      for (let i = 0; i < state.base64Pan.length; i++) {
        if (state.base64Pan[i].id === id) {
          state.base64Pan[i].filters.rotation = value;
          return;
        }
      }
    },
    setPanSaturation: (state, action) => {
      const { id, value } = action.payload;
      for (let i = 0; i < state.base64Pan.length; i++) {
        if (state.base64Pan[i].id === id) {
          state.base64Pan[i].filters.saturation = value;
          return;
        }
      }
    },
    setPanBrightness: (state, action) => {
      const { id, value } = action.payload;
      for (let i = 0; i < state.base64Pan.length; i++) {
        if (state.base64Pan[i].id === id) {
          state.base64Pan[i].filters.brightness = value;
          return;
        }
      }
    },
    removeAllPassportSizeImages: (state) => {
      state.passportSizeBase64Images = [];
      state.passportPhotoFiles = "";
    },
    setCollageFiles: (state, action) => {
      state.collageFiles = action.payload;
    },
    setPassportPhotoFiles: (state, action) => {
      state.passportPhotoFiles = action.payload;
    },
    setPassportSizeBase64Image: (state, action) => {
      state.passportSizeBase64Images = action.payload;
    },
    pushBase64Pdfs: (state, action) => {
      state.aadharPdfs.push(action.payload);
    },
    setBase64Pdf: (state, action) => {
      state.aadharPdfs = action.payload;
    },
    pushPassportSizeBase64Images: (state, action) => {
      state.passportSizeBase64Images.push(...action.payload);
    },
    setBase64Images: (state, action) => {
      state.base64Images = action.payload;
    },
    removeImage: (state, action) => {
      const filteredArr = state.base64Images.filter(
        (img) => img.id !== action.payload,
      );
      state.base64Images = filteredArr;
    },
    pushBase64Images: (state, action) => {
      state.base64Images.push(...action.payload);
      // addData(action.payload)
    },
    removeAllImages: (state) => {
      state.base64Images = [];
      state.collageFiles = "";
    },
    removePassportSizeImage: (state, action) => {
      const filteredArr = state.passportSizeBase64Images.filter(
        (img) => img.id !== action.payload,
      );
      state.passportSizeBase64Images = filteredArr;
    },

    setBase64Pan: (state, action) => {
      state.base64Pan = action.payload;
    },
    removeBase64Pan: (state, action) => {
      const filteredArr = state.base64Pan.filter(
        (img) => img.id !== action.payload,
      );
      state.base64Pan = filteredArr;
    },
    setCroppedImg: (state, action) => {
      const { img, id } = action.payload;
      for (let i = 0; i < state.base64Images.length; i++) {
        if (state.base64Images[i].id === id) {
          state.base64Images[i].img = img;
          return;
        }
      }
    },

    setEditedPan: (state, action) => {
      const { img, id } = action.payload;
      for (let i = 0; i < state.base64Pan.length; i++) {
        if (state.base64Pan[i].id === id) {
          state.base64Pan[i].img = img;
          return;
        }
      }
    },
    pushAadharPdfs: (state, action) => {
      state.aadharPdfs.push(action.payload);
    },
    pushDoubleSideAadharPdfs: (state, action) => {
      state.doubleSideAadharPdfs.push(action.payload);
    },
    removeAadharPdf: (state, action) => {
      const filteredArr = state.aadharPdfs.filter(
        (pdf) => pdf.id !== action.payload,
      );
      state.aadharPdfs = filteredArr;
    },
    removeDoubleSideAadharPdf: (state, action) => {
      const filteredArr = state.doubleSideAadharPdfs.filter(
        (pdf) => pdf.id !== action.payload,
      );
      state.doubleSideAadharPdfs = filteredArr;
    },
    removeAllAadharPdfs: (state) => {
      state.aadharPdfs = [];
    },
    removeAllDoubleSideAadharPdfs: (state) => {
      state.doubleSideAadharPdfs = [];
    },
    setAadharImgUrl: (state, action) => {
      const { id, imgUrl } = action.payload;
      for (let i = 0; i < state.aadharPdfs.length; i++) {
        if (state.aadharPdfs[i].id === id) {
          state.aadharPdfs[i].imgUrl = imgUrl;
          return;
        }
      }
    },
    setDoubleSideAadharImgUrl: (state, action) => {
      const { id, imgUrlFront, imgUrlBack } = action.payload;
      for (let i = 0; i < state.doubleSideAadharPdfs.length; i++) {
        if (state.doubleSideAadharPdfs[i].id === id) {
          state.doubleSideAadharPdfs[i].imgUrl = {
            back: imgUrlBack,
            front: imgUrlFront,
          };
          return;
        }
      }
    },
    setBackSideAadharImgUrl: (state, action) => {
      const { id, imgUrlBack } = action.payload;
      for (let i = 0; i < state.doubleSideAadharPdfs.length; i++) {
        if (state.doubleSideAadharPdfs[i].id === id) {
          state.doubleSideAadharPdfs[i].imgUrl.back = imgUrlBack;
          return;
        }
      }
    },
    pushAyushmanPdfs: (state, action) => {
      state.ayushmanPdfs.push(action.payload);
    },
    removeAllAyushmanPdfs: (state) => {
      state.ayushmanPdfs = [];
    },
    setAyushmanImgUrl: (state, action) => {
      const { id, imgUrl } = action.payload;
      for (let i = 0; i < state.ayushmanPdfs.length; i++) {
        if (state.ayushmanPdfs[i].id === id) {
          state.ayushmanPdfs[i].imgUrl = imgUrl;
          return;
        }
      }
    },
    removeAyushmanPdf: (state, action) => {
      const filteredArr = state.ayushmanPdfs.filter(
        (pdf) => pdf.id !== action.payload,
      );
      state.ayushmanPdfs = filteredArr;
    },
    setPhotoTextbox: (state, action) => {
      const { imageId, textboxLocation } = action.payload;
      for (let i = 0; i < state.passportSizeBase64Images.length; i++) {
        if (state.passportSizeBase64Images[i].id === imageId) {
          state.passportSizeBase64Images[i].textbox = {
            isActive: true,
            location: textboxLocation,
          };
          return;
        }
      }
    },
    removePhotoTextbox: (state, action) => {
      for (let i = 0; i < state.passportSizeBase64Images.length; i++) {
        if (state.passportSizeBase64Images[i].id === action.payload) {
          state.passportSizeBase64Images[i].textbox = {
            isActive: false,
            location: null,
          };
          return;
        }
      }
    },
    setCollageImageById: (state, action) => {
      const { id, src } = action.payload;
      for (let i = 0; i < state.collageFiles.length; i++) {
        if (state.collageFiles[i].id === id) {
          state.collageFiles[i].src = src;
          return;
        }
      }
    },
  },
});

export default persistedSlice.reducer;

export const {
  setPanBrightness,
  setPanContrast,
  setPanRotation,
  setPanSaturation,
  setBrightness,
  setContrast,
  setRotation,
  setSaturation,
  setBase64Images,
  removeImage,
  pushBase64Images,
  pushPassportSizeBase64Images,
  setPassportSizeBase64Image,
  removeAllImages,
  removeAllPassportSizeImages,
  removePassportSizeImage,
  setBase64Pdf,
  removeAadharPdf,
  pushBase64Pdfs,
  setCollageFiles,
  setPassportPhotoFiles,
  setBase64Pan,
  removeBase64Pan,
  setCroppedImg,
  setEditedPan,
  pushAadharPdfs,
  pushDoubleSideAadharPdfs,
  removeDoubleSideAadharPdf,
  removeAllAadharPdfs,
  removeAllDoubleSideAadharPdfs,
  setDoubleSideAadharImgUrl,
  setBackSideAadharImgUrl,
  setAadharImgUrl,
  pushAyushmanPdfs,
  removeAllAyushmanPdfs,
  setAyushmanImgUrl,
  removeAyushmanPdf,
  setPhotoTextbox,
  removePhotoTextbox,
  setCollageImageById,
} = persistedSlice.actions;
