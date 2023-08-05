import Image from "next/image";

export default function CardFront({ url }: { url: string }) {
  return (
    <div className="rounded-md relative h-full w-full">
      <Image
        src={url}
        alt="Front of card"
        fill={true}
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="user-drag-none"
      />
    </div>
  );
}
