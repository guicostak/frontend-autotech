import React, { useState } from "react";

interface ImageGalleryProps {
  images: string[]; 
}

const ImagensAnuncio: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);

  return (
    <div className="flex flex-col items-center">
      <div className="border rounded-lg w-[400px] h-[400px] overflow-hidden">
        <img
          src={selectedImage}
          alt="Selected product"
          className="w-full h-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="flex space-x-2 mt-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img)}
              className="focus:outline-none"
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-[90px] h-[90px] object-cover cursor-pointer rounded-md border ${
                  selectedImage === img
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagensAnuncio;
