import { useUploadThing } from "../utils/uploadthing";
import { Dispatch, SetStateAction } from "react";

type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    return result;
  };

  return {
    inputProps: {
      onChange,
      multiple: false,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

export default function UploadButton({
  setArtistPicture,
}: {
  setArtistPicture: Dispatch<SetStateAction<string>>;
}) {
  const { inputProps, isUploading } = useUploadThingInputProps(
    "imageUploader",
    {
      onClientUploadComplete: (data) => {
        setArtistPicture(data[0].url);
      },
    }
  );

  return (
    <div>
      <label
        className="p-2 block w-[200px] cursor-pointer text-center rounded-lg bg-black text-white"
        htmlFor="button"
      >
        {isUploading ? "Uploading..." : "Upload Picture"}
      </label>
      <input id="button" type="file" className="sr-only" {...inputProps} />
    </div>
  );
}
