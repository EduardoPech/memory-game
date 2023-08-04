interface ListImages {
  entries: Fields[];
}

interface Fields {
  fields: {
    image: ImageAPI;
  };
}

interface ImageAPI {
  uuid: string;
  title: string;
  alt_text: string;
  description: string;
  url: string;
  content_type: string;
  tags: string[];
}

interface Image {
  id: string;
  title: string;
  url: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface ImageMemory extends Image {
  key: string;
}

export type { ListImages, Fields, ImageAPI, Image, ImageMemory };
