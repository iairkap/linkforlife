import { saveAs } from "file-saver";

export const downloadImage = async (url: string | undefined) => {
  try {
    if (url) {
      const response = await fetch(url);
      console.log(response, "response");
      const blob = await response.blob();
      saveAs(blob, "image.png");
    }
  } catch (error) {
    console.error("Error downloading image:", error);
    console.log(error);
  }
};
