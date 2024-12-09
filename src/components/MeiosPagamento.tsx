import React from "react";
import Image, { StaticImageData } from "next/image";

interface PaymentMethodsProps {
  title?: string;
  imageSrc: StaticImageData;
  altText: string;
  imageWidth?: number;
  imageHeight?: number;
}

const MeiosPagamento: React.FC<PaymentMethodsProps> = ({
  title = "Meios de pagamento",
  imageSrc,
  altText,
  imageWidth = 300,
  imageHeight = 60,
}) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-bold mb-4 text-[#2A2C2F]">{title}</h2>
      <Image
        src={imageSrc}
        alt={altText}
        width={imageWidth}
        height={imageHeight}
      />
    </div>
  );
};

export default MeiosPagamento;
