import { saveAs } from "file-saver";

export const downloadImage = async (url: string | undefined) => {
  try {
    if (url) {
      const response = await fetch(url);
      response, "response";
      const blob = await response.blob();
      saveAs(blob, "image.png");
    }
  } catch (error) {
    console.error("Error downloading image:", error);
    error;
  }
};
