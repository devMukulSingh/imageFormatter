export const getBase64Image = async (image: Blob): Promise<any> => {
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
