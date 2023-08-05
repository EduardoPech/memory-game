import { ListImages, Fields, Image, ImageMemory } from "../interfaces/image";

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

const updateListImages = (listImages: ImageMemory[], key: string) => {
  return listImages.map((image: ImageMemory) => {
    if (image.key === key) {
      return { ...image, isFlipped: true };
    }
    return image;
  });
};

const blockListImages = (listImages: any, id: string) => {
  return listImages.map((image: any) => {
    if (image.id === id) {
      return { ...image, isMatched: !image.isMatched };
    }
    return image;
  });
};

export {
  formatData,
  duplicateImages,
  shuffleImages,
  updateListImages,
  blockListImages,
};
