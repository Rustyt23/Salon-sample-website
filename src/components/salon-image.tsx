import Image from "next/image";

type SalonImageProps = {
  name: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export function SalonImage({ name, alt, sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw", priority = false, className = "" }: SalonImageProps) {
  const widths = [320, 480, 640, 960, 1440, 1920];
  return (
    <picture className="salon-picture">
      <source type="image/webp" srcSet={widths.map((width) => `/images/${name}-${width}.webp ${width}w`).join(", ")} sizes={sizes} />
      <Image src={`/images/${name}-960.webp`} alt={alt} fill sizes={sizes} preload={priority} className={`salon-image ${className}`} />
    </picture>
  );
}
