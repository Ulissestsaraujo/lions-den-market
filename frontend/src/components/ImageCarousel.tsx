import React from "react";
import { Image } from "../types/Job";
import { Carousel } from "@material-tailwind/react";

interface ImageCarouselProps {
  images: Image[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <Carousel className="rounded-xl">
      {images.map((image, index) => (
        <img
          key={index}
          src={process.env.REACT_APP_API_URL + "/" + image?.url}
          alt={`Image ${index}`}
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
