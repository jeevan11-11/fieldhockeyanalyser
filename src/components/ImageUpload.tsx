import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  imagePreview: string;
  onImageSelect: (file: File, preview: string) => void;
}

export default function ImageUpload({ imagePreview, onImageSelect }: ImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-gray-700 mb-2 block">
          Upload Turf Image
        </span>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="turf-image-upload"
          />
          <label
            htmlFor="turf-image-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-gray-50 hover:bg-gray-100"
          >
            {imagePreview ? (
              <div className="relative w-full h-full">
                <img
                  src={imagePreview}
                  alt="Turf preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                  <Upload className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
                <p className="text-sm text-gray-600 mb-1">
                  Click to upload turf image
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, JPEG up to 10MB
                </p>
              </div>
            )}
          </label>
        </div>
      </label>
      {imagePreview && (
        <p className="text-sm text-green-600 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-600 rounded-full"></span>
          Image uploaded successfully
        </p>
      )}
    </div>
  );
}
