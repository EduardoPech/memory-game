"use client";

import FlipCard from "../components/FlipCard";
import { getData } from "../api/images";
import { useEffect, useState } from "react";
import { ImageMemory } from "../interfaces/image";
import Win from "../components/Win";
import Score from "../components/Score";
import SkeletonLoaders from "../components/SkeletonLoaders";
import STATUS from "../utils/constants";
import {
  blockListImages,
  duplicateImages,
  formatData,
  shuffleImages,
  updateListImages,
} from "../utils/game";

export default function Game() {
  const [images, setImages] = useState<ImageMemory[]>([]);
  const [backupImages, setBackupImages] = useState<ImageMemory[]>([]);
  const [imagesFlipped, setImagesFlipped]: any = useState([]);
  const [imagesMatched, setImagesMatched]: any = useState([]);
  const [hits, setHits] = useState(0);
  const [errors, setErrors] = useState(0);
  const [status, setStatus] = useState(STATUS.LOADING);

  useEffect(() => {
    try {
      // Fetch data
      const fetchData = async () => {
        const data = await getData();
        setImages(shuffleImages(duplicateImages(formatData(data))));
      };
      // Get data
      fetchData();
      // Start game
      setTimeout(() => {
        setStatus(STATUS.PLAYING);
      }, 1000);
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (imagesFlipped.length === 2) {
      const [firstImage, secondImage] = imagesFlipped;
      if (firstImage.id === secondImage.id) {
        setImagesMatched([...imagesMatched, firstImage]);
        setImages(blockListImages(images, firstImage.id));
        setHits(hits + 1);
        setImagesFlipped([]);
      } else {
        setTimeout(() => {
          setImages(backupImages);
          setImagesFlipped([]);
          setErrors(errors + 1);
        }, 1000);
      }
    }
  }, [imagesFlipped, errors, hits, imagesMatched, images, backupImages]);

  // Check if the game is finished
  useEffect(() => {
    if (status === STATUS.PLAYING && imagesMatched.length > 0) {
      if (imagesMatched.length === images.length / 2) {
        setTimeout(() => {
          setStatus(STATUS.FINISHED);
        }, 1000);
      }
    }
  }, [imagesMatched, images, status]);

  const handleFlip = (image: ImageMemory) => {
    if (imagesFlipped.length < 2) {
      if (imagesFlipped.length === 0) {
        setBackupImages(images);
      }
      setImagesFlipped([...imagesFlipped, image]);
      setImages(updateListImages(images, image.key));
    }
  };

  const resetGame = () => {
    setStatus(STATUS.LOADING);
    setImagesFlipped([]);
    setImagesMatched([]);
    setHits(0);
    setErrors(0);
    setBackupImages([]);
    setTimeout(() => {
      setStatus(STATUS.PLAYING);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-84px)]">
      <Score hits={hits} errors={errors} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-x-8  gap-y-4 md:gap-y-8 container mx-auto justify-items-center">
        {status === STATUS.LOADING && <SkeletonLoaders />}
        {status === STATUS.PLAYING &&
          images.map((image: any) => {
            return <FlipCard key={image.key} image={image} flip={handleFlip} />;
          })}
      </div>
      {status === STATUS.FINISHED && <Win resetGame={resetGame} />}
    </div>
  );
}
