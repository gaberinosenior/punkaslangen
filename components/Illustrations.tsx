import Image from "next/image";

type Props = {
  className?: string;
};

export function CarIllustration({ className }: Props) {
  return (
    // CC0 — spadassin / Openclipart, Wikimedia Commons
    // https://commons.wikimedia.org/wiki/File:Volkswagen_Beetle_car.svg
    <Image
      src="/images/car-pd.svg"
      alt=""
      width={380}
      height={180}
      className={className}
      unoptimized
    />
  );
}

export function TractorIllustration({ className }: Props) {
  return (
    // CC0 — cyberscooty / Openclipart, Wikimedia Commons
    // https://commons.wikimedia.org/wiki/File:Green_tractor.svg
    <Image
      src="/images/tractor-pd.svg"
      alt=""
      width={340}
      height={220}
      className={className}
      unoptimized
    />
  );
}
