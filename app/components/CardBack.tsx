import Image from "next/image";
import url from "../assets/images/abstract.jpeg";

export default function CardBack() {
  return (
    <div className="h-full w-full bg-yellow-400">
      <Image
        src={`/nextjs-github-pages/${url}`}
        alt="Spiderman"
        fill={true}
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="user-drag-none"
      />
    </div>
  );
}
