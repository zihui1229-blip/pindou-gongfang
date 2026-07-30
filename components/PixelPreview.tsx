type PixelPreviewProps = {
  image: string | null;
};

export default function PixelPreview({
  image,
}: PixelPreviewProps) {
  return (
    <div className="mt-8">
      <h2 className="mb-3 text-2xl font-bold text-gray-900">
        🧩 像素化预览
      </h2>

      <div className="flex min-h-[250px] items-center justify-center rounded-2xl border bg-gray-100 p-4">
        {image ? (
          <img
            src={image}
            alt="像素预览"
            className="h-80 w-80 border object-contain"
            style={{
              imageRendering: "pixelated",
            }}
          />
        ) : (
          <p className="text-gray-500">
            请先上传图片
          </p>
        )}
      </div>
    </div>
  );
}