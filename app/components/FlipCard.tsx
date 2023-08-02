"use client";

import CardFront from "./CardFront";
import CardBack from "./CardBack";
import { useEffect, useState } from "react";

export default function FlipCard({ image, flip }: { image: any; flip: any }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (id: any) => {
    if (!image.isMatched) {
      setIsFlipped(!isFlipped);
      flip(id);
    }
  };

  useEffect(() => {
    setIsFlipped(image.isFlipped);
  }, [image.isFlipped]);

  return (
    <div
      className={`perspective-1000 bg-transparent w-52 h-52 cursor-pointer ${
        isFlipped && "flip-card-now"
      }`}
      onClick={() => handleFlip(image)}
    >
      <div className="flip-card-inner transform-style-preserve-3d relative w-full h-full text-center transition duration-700 ease-in-out">
        <div className="backface-visibility-hidden absolute w-full h-full">
          <CardFront url={image.url} />
        </div>
        <div className="transform-rotate-y-180 backface-visibility-hidden absolute w-full h-full">
          <CardBack />
        </div>
      </div>
    </div>
  );
}
