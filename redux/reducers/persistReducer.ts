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
  collageFiles: "",
  passportPhotoFiles: "",
  base64Pan: [],
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
        }
      }
    },
    setContrast: (state, action) => {
      const { id, value } = action.payload;

      for (let i = 0; i < state.base64Images.length; i++) {
        if (state.base64Images[i].id === id) {
          state.base64Images[i].filters.contrast = value;
        }
      }
    },
    setRotation: (state, action) => {
      const { id, value } = action.payload;
      for (let i = 0; i < state.base64Images.length; i++) {
        if (state.base64Images[i].id === id) {
          state.base64Images[i].filters.rotation = value;
        }
      }
    },
    setSaturation: (state, action) => {
      const { id, value } = action.payload;
      for (let i = 0; i < state.base64Images.length; i++) {
        if (state.base64Images[i].id === id) {
          state.base64Images[i].filters.saturation = value;
        }
      }
    },
    setPanContrast: (state, action) => {
      const { id, value } = action.payload;

      for (let i = 0; i < state.base64Pan.length; i++) {
        if (state.base64Pan[i].id === id) {
          state.base64Pan[i].filters.contrast = value;
        }
      }
    },
    setPanRotation: (state, action) => {
      const { id, value } = action.payload;
      for (let i = 0; i < state.base64Pan.length; i++) {
        if (state.base64Pan[i].id === id) {
          state.base64Pan[i].filters.rotation = value;
        }
      }
    },
    setPanSaturation: (state, action) => {
      const { id, value } = action.payload;
      for (let i = 0; i < state.base64Pan.length; i++) {
        if (state.base64Pan[i].id === id) {
          state.base64Pan[i].filters.saturation = value;
        }
      }
    },
    setPanBrightness: (state, action) => {
      const { id, value } = action.payload;
      for (let i = 0; i < state.base64Pan.length; i++) {
        if (state.base64Pan[i].id === id) {
          state.base64Pan[i].filters.brightness = value;
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
    removeAadharPdf: (state, action) => {
      const filteredArr = state.aadharPdfs.filter(
        (pdf) => pdf.id !== action.payload,
      );
      state.aadharPdfs = filteredArr;
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
      state.aadharPdfs.push(...action.payload);
    },
    removeAllAadharPdfs: (state) => {
      state.aadharPdfs = [];
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
  removeAllAadharPdfs
} = persistedSlice.actions;
