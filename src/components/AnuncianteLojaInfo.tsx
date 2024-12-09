import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faStore, 
  faPhone, 
  faEnvelope, 
  faCreditCard, 
  faStar, 
  faComment
} from "@fortawesome/free-solid-svg-icons";
import { formatPhoneNumber } from "@/utils/stringUtils";
import { formatCnpj } from "@/utils/regex/cnpjRegex";
import Link from "next/link";
import Botao from "./Botao";

interface AnuncianteLojaInfoProps {
  isOwnAdvertisement?: boolean;
  idAnuncio?: number;
  imagem?: string;
  anuncianteNome?: string;
  phone?: string;
  email?: string;
  cnpj?: string;
  rating?: number;
  reviews?: number;
}

const AnuncianteLojaInfo: React.FC<AnuncianteLojaInfoProps> = ({
  isOwnAdvertisement = false,
  idAnuncio = 0,
  imagem = "",
  anuncianteNome = "N/A",
  phone = "N/A",
  email = "N/A",
  cnpj = "N/A",
  rating = 0,
  reviews = 0,
}) => {
  const fullStars = Math.floor(rating);
  const halfStars = Math.ceil(rating - fullStars);
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="border p-10 rounded-lg shadow-sm">
      <div className="flex items-center mb-6">
        {typeof imagem === "string" && imagem && imagem !== "undefined"  ? (
            <img
              src={imagem}
              alt="Profile"
              className="rounded-full w-12 h-12 mr-2 object-cover"
            />
          ) : (
            <FontAwesomeIcon
              className="text-mainColor text-3xl mr-2"
              icon={faStore}
            />
          )}     
        <h2 className="font-bold text-xl text-mainColor">{anuncianteNome}</h2>
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faPhone} className="mr-3 text-mainColor" />
          <span>Telefone: {formatPhoneNumber(phone)}</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-mainColor" />
          <span>Email: {email}</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faCreditCard} className="mr-3 text-mainColor" />
          <span>CNPJ: {formatCnpj(cnpj)}</span>
        </div>
      </div>
      <div className="mt-4">
        {!isOwnAdvertisement && (
          <Link href={`/chat/${idAnuncio}`}>
            <Botao className="bg-[#2A2C2F] text-white text-sm py-3 px-4 rounded-lg flex items-center justify-center space-x-4 w-full mt-3">
              <FontAwesomeIcon
                className="text-secondaryColor mr-4"
                icon={faComment}
              />
              Conversar com vendedor
            </Botao>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AnuncianteLojaInfo;
