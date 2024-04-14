import React from "react";
import { Image } from "../types/Job";

interface ImageCarouselProps {
  images: Image[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex space-x-4 transition-transform duration-300 ease-in-out">
          {images.map((image, index) => (
            <img
              key={index}
              src={process.env.REACT_APP_API_URL + "/" + image?.url}
              alt={`Image ${index}`}
              className="w-auto max-h-64 object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
