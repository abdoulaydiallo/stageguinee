"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="cumul1m1"
      options={{ maxFiles: 1 }}
    >
      {(open) => {
        return (
          <div
            onClick={() => open.open()}
            className={`w-[200px] h-[200px] flex items-center justify-center relative cursor-pointer hover:opacity-70 transition ${
              value ? "border-none" : "border-dashed"
            }  border-2 p-20 rounded-full border-neutral-300`}
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-sm text-center">
              Cliquer pour télécharger
            </div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full flex "
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
export default ImageUpload;
