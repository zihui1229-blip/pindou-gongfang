type UploadAreaProps = {
  image: string | null;
  onClick: () => void;
};

export default function UploadArea({
  image,
  onClick,
}: UploadAreaProps) {
  return (
    <div
      onClick={onClick}
      className="mt-8 cursor-pointer rounded-3xl border-4 border-dashed border-orange-300 bg-orange-50 p-8 transition hover:bg-orange-100"
    >
      {image ? (
        <img
          src={image}
          alt="预览图片"
          className="mx-auto max-h-80 rounded-2xl object-contain"
        />
      ) : (
        <div className="text-center">
          <div className="text-6xl">📷</div>

          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            点击上传图片
          </h2>

          <p className="mt-2 text-gray-500">
            支持 JPG、PNG、WEBP
          </p>
        </div>
      )}
    </div>
  );
}