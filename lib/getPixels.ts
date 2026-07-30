import { Pixel } from "../types/pixel";

export async function getPixels(
  file: File,
  width: number,
  height: number
): Promise<Pixel[][]> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("无法建立 Canvas"));
        return;
      }

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(image, 0, 0, width, height);

      const { data } = ctx.getImageData(0, 0, width, height);

      const pixels: Pixel[][] = [];

      for (let y = 0; y < height; y++) {
        const row: Pixel[] = [];

        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;

          row.push({
            r: data[index],
            g: data[index + 1],
            b: data[index + 2],
            a: data[index + 3],
          });
        }

        pixels.push(row);
      }

      resolve(pixels);
    };

    image.onerror = () => {
      reject(new Error("图片读取失败"));
    };

    image.src = URL.createObjectURL(file);
  });
}