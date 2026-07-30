export async function resizeImage(
  file: File,
  width: number,
  height: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject("无法建立 Canvas");
        return;
      }

      // 不做平滑，让像素更明显
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(image, 0, 0, width, height);

      resolve(canvas.toDataURL());
    };

    image.onerror = reject;

    image.src = URL.createObjectURL(file);
  });
}