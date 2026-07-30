"use client";

import { useRef, useState } from "react";

import Header from "../components/Header";
import UploadArea from "../components/UploadArea";
import SizeSelector from "../components/SizeSelector";
import PixelPreview from "../components/PixelPreview";


import { resizeImage } from "../lib/imageResize";
import { getPixels } from "../lib/getPixels";
import { loadPalette } from "../lib/loadPalette";
import { generatePattern } from "../lib/patternGenerator";
import { exportPatternAsPNG } from "../lib/exportPNG";

import type { BeadColor } from "../types/beadColor";
import PixelGrid from "../components/PixelGrid";
import ColorStatistics from "../components/ColorStatistics";


export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const [pixelImage, setPixelImage] = useState<string | null>(null);

  const [size, setSize] = useState(29);

  const [pattern, setPattern] = useState<BeadColor[][]>([]);

async function handleFile(file: File) {
  // 原圖預覽
  const original = URL.createObjectURL(file);
  setOriginalImage(original);

  // 縮放圖片
  const resized = await resizeImage(file, size, size);
  setPixelImage(resized);

  // 取得像素
  const pixels = await getPixels(file, size, size);

  // 讀取調色盤
  const palette = await loadPalette();

  // 產生拼豆圖
  const result = generatePattern(pixels, palette);

  setPattern(result);

  console.log("拼豆圖：", result);
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
              setSelectedFile(file);

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
            onChange={(newSize) => {
              setSize(newSize);
            }}
          />
        </div>

        <div className="mt-8 rounded-2xl border bg-gray-50 p-4">
          <p className="font-semibold text-gray-700">
            🎨 色盘：221 色（测试版）
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <PixelPreview image={pixelImage} />

          <PixelGrid pattern={pattern} />
        </div>


        <ColorStatistics pattern={pattern} />

        <button
          onClick={async () => {
            if (selectedFile) {
              await handleFile(selectedFile);
           }
         }}
         className="mt-8 w-full rounded-2xl bg-green-600 py-4 text-xl font-bold text-white transition hover:bg-green-700"
>
  
  开始生成拼豆图
</button>

{pattern.length > 0 && (
  <button
    onClick={() => exportPatternAsPNG(pattern)}
    className="mt-4 w-full rounded-2xl bg-blue-600 py-4 text-xl font-bold text-white transition hover:bg-blue-700"
  >
    🖼️ 下載 PNG
  </button>
)}

      </div>
    </main>
  );
}