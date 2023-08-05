"use client";

import FlipCard from "../components/FlipCard";
import { getData } from "../api/images";
import { useEffect, useState } from "react";
import {
  ListImages,
  Fields,
  ImageAPI,
  Image,
  ImageMemory,
} from "../interfaces/image";
import Win from "../components/Win";
import Score from "../components/Score";

const STATUS = {
  LOADING: "loading",
  PLAYING: "playing",
  FINISHED: "finished",
};

export default function Game() {
  const [images, setImages] = useState<ImageMemory[]>([]);
  const [backupImages, setBackupImages] = useState<ImageMemory[]>([]);
  const [imagesFlipped, setImagesFlipped]: any = useState([]);
  const [imagesMatched, setImagesMatched]: any = useState([]);
  const [hits, setHits] = useState(0);
  const [errors, setErrors] = useState(0);
  const [status, setStatus] = useState(STATUS.LOADING);
  const [isBlock, setIsBlock] = useState(false);

  const formatData = (listImages: ListImages): Image[] => {
    const images = listImages.entries.map(({ fields: { image } }: Fields) => {
      return {
        id: image.uuid,
        title: image.title,
        url: image.url,
        isFlipped: false,
        isMatched: false,
      };
    });

    return images;
  };

  // TODO: Remove any type
  const duplicateImages = (images: Image[]): ImageMemory[] => {
    return images.reduce((acc: any, image: Image): ImageMemory[] => {
      return [
        ...acc,
        { ...image, key: `${image.id}a` },
        { ...image, key: `${image.id}b` },
      ];
    }, []);
  };

  const shuffleImages = (images: ImageMemory[]): ImageMemory[] => {
    return images.sort(() => Math.random() - 0.5);
  };

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

  const updateListImages = (listImages: ImageMemory[], key: string) => {
    return listImages.map((image: ImageMemory) => {
      if (image.key === key) {
        return { ...image, isFlipped: true };
      }
      return image;
    });
  };

  const handleFlip = (image: ImageMemory) => {
    console.log("handleFlip", imagesFlipped.length);
    if (imagesFlipped.length < 2) {
      if (imagesFlipped.length === 0) {
        setBackupImages(images);
      }
      setImagesFlipped([...imagesFlipped, image]);
      setImages(updateListImages(images, image.key));
    }
  };

  const blockListImages = (listImages: any, id: string) => {
    return listImages.map((image: any) => {
      if (image.id === id) {
        return { ...image, isMatched: !image.isMatched };
      }
      return image;
    });
  };

  useEffect(() => {
    if (imagesFlipped.length === 2) {
      setIsBlock(true);
      const [firstImage, secondImage] = imagesFlipped;
      if (firstImage.id === secondImage.id) {
        setImagesMatched([...imagesMatched, firstImage]);
        setImages(blockListImages(images, firstImage.id));
        setHits(hits + 1);
        setImagesFlipped([]);
        setIsBlock(false);
      } else {
        setTimeout(() => {
          setImages(backupImages);
          setIsBlock(false);
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

  // Generate skeleton loaders
  const SkeletonLoaders = () => {
    const loaders = Array.from(Array(18).keys());

    return loaders.map((loader: any) => {
      return (
        <div key={loader} className="shadow">
          <div className="animate-pulse flex space-x-4">
            <div className="bg-slate-700 w-52 h-52"></div>
          </div>
        </div>
      );
    });
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
