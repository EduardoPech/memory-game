"use client";

import CardFront from "./CardFront";
import CardBack from "./CardBack";
import { useEffect, useState } from "react";
import { ImageMemory } from "../interfaces/image";

export default function FlipCard({
  image,
  flip,
}: {
  image: ImageMemory;
  flip: any;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (image.isMatched) return;
    if (!image.isMatched && isFlipped) return;
    flip(image);
  };

  useEffect(() => {
    if (!image.isMatched) {
      setIsFlipped(image.isFlipped);
    }
  }, [image.isFlipped, image.isMatched]);

  return (
    <div
      className={`perspective-1000 bg-transparent w-36 h-36 md:w-52 md:h-52 cursor-pointer hover:scale-110 transition-all duration-500 ease-in-out
       ${isFlipped && "flip-card-now"}`}
      onClick={handleFlip}
    >
      <div className="flip-card-inner transform-style-preserve-3d relative w-full h-full text-center transition duration-700 ease-in-out">
        <div className="backface-visibility-hidden absolute w-full h-full">
          <CardBack />
        </div>
        <div className="transform-rotate-y-180 backface-visibility-hidden absolute w-full h-full">
          <CardFront url={image.url} />
        </div>
      </div>
    </div>
  );
}
