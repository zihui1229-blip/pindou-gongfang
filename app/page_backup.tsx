"use client";

import { useRef, useState } from "react";

import Header from "../components/Header";
import UploadArea from "../components/UploadArea";
import SizeSelector from "../components/SizeSelector";
import PixelPreview from "../components/PixelPreview";

import { resizeImage } from "../lib/imageResize";
import { getPixels } from "../lib/getPixels";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [pixelImage, setPixelImage] = useState<string | null>(null);

  const [size, setSize] = useState(29);

  async function handleFile(file: File) {
  // 原图预览
  const original = URL.createObjectURL(file);
  setOriginalImage(original);

  // 缩放成指定尺寸
  const resized = await resizeImage(file, size, size);
  setPixelImage(resized);

  // 读取圖片像素
  const pixels = await getPixels(file, size, size);

  console.log("第一顆像素：", pixels[0][0]);
  console.log("寬度：", pixels[0].length);
  console.log("高度：", pixels.length);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-xl">
        <Header />

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={async (e) => {
            const file = e.target.files?.[0];

            if (file) {
              await handleFile(file);
            }
          }}
        />

        <UploadArea
          image={originalImage}
          onClick={() => inputRef.current?.click()}
        />

        <div className="mt-8">
          <SizeSelector
            value={size}
            onChange={async (newSize) => {
              setSize(newSize);
            }}
          />
        </div>

        <div className="mt-8 rounded-2xl border bg-gray-50 p-4">
          <p className="font-semibold text-gray-700">
            🎨 色盘：官方 221 色（下一版启用）
          </p>
        </div>

        <PixelPreview image={pixelImage} />

         <button
          className="mt-8 w-full rounded-2xl bg-green-600 py-4 text-xl font-bold text-white transition hover:bg-green-700"
        >
          开始生成拼豆图
        </button>
      </div>
    </main>
  );
}