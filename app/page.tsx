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

import type { BeadColor } from "../types/beadColor";
import PixelGrid from "../components/PixelGrid";


export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const [pixelImage, setPixelImage] = useState<string | null>(null);

  const [size, setSize] = useState(29);

  const [pattern, setPattern] = useState<BeadColor[][]>([]);

  async function handleFile(file: File) {
    // 原图预览
    const original = URL.createObjectURL(file);
    setOriginalImage(original);

    // 缩放图片
    const resized = await resizeImage(file, size, size);
    setPixelImage(resized);

    // 取得像素
    const pixels = await getPixels(file, size, size);

    // 读取调色盘
    const palette = await loadPalette();

    // 产生拼豆图
    const result = generatePattern(pixels, palette);

    setPattern(result);

    console.log("拼豆图：", result);
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

            const original = URL.createObjectURL(file);
            setOriginalImage(original);

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

        <PixelPreview image={pixelImage} />
        <PixelGrid pattern={pattern} />

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

      </div>
    </main>
  );
}