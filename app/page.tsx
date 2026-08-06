"use client";

import { useRef, useState } from "react";

import Header from "../components/Header";
import UploadArea from "../components/UploadArea";
import SizeSelector from "../components/SizeSelector";
import PixelPreview from "../components/PixelPreview";
import PixelGrid from "../components/PixelGrid";
import ColorStatistics from "../components/ColorStatistics";
import Toolbar from "../components/Toolbar";

import { resizeImage } from "../lib/imageResize";
import { getPixels } from "../lib/getPixels";
import { loadPalette } from "../lib/loadPalette";
import { generatePattern } from "../lib/patternGenerator";
import { exportPatternAsPNG } from "../lib/exportPNG";

import type { BeadColor } from "../types/beadColor";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [pixelImage, setPixelImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [size, setSize] = useState(29);

  const [pattern, setPattern] = useState<BeadColor[][]>([]);

  const [selectedColorId, setSelectedColorId] =
    useState<number | null>(null);

  const [displayMode, setDisplayMode] =
    useState<"normal" | "number">("normal");

  async function handleFile(file: File) {
    const original = URL.createObjectURL(file);
    setOriginalImage(original);

    const resized = await resizeImage(file, size, size);
    setPixelImage(resized);

    const pixels = await getPixels(file, size, size);

    const palette = await loadPalette();

    const result = generatePattern(pixels, palette);

    setPattern(result);
  }

  return (    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-xl">

        <Header />

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (!file) return;

            setSelectedFile(file);
            setOriginalImage(URL.createObjectURL(file));
          }}
        />

        <UploadArea
          image={originalImage}
          onClick={() => inputRef.current?.click()}
        />

        <div className="mt-8">
          <SizeSelector
            value={size}
            onChange={setSize}
          />
        </div>

        <div className="mt-8 rounded-2xl border bg-gray-50 p-4">
          <p className="font-semibold text-gray-700">
            🎨 色盤：221 色（測試版）
          </p>
        </div>

        <div className="mt-6">
          <Toolbar
            displayMode={displayMode}
            setDisplayMode={setDisplayMode}
          />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <PixelPreview image={pixelImage} />

          <PixelGrid
            pattern={pattern}
            selectedColorId={selectedColorId}
            onSelectColor={setSelectedColorId}
            displayMode={displayMode}
          />
        </div>

        <ColorStatistics
          pattern={pattern}
          selectedColorId={selectedColorId}
        />

        <button
          onClick={async () => {
            if (selectedFile) {
              await handleFile(selectedFile);
            }
          }}
          className="mt-8 w-full rounded-2xl bg-green-600 py-4 text-xl font-bold text-white transition hover:bg-green-700"
        >
          開始生成拼豆圖
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