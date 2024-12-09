import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCreditCard, faCartPlus, faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { formatData } from "@/utils/regex/dataRegex";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface CardProps {
  isOwnAdvertisement?: boolean;
  descricao?: string;
  titulo?: string;
  dataCriacao?: string | null;
  preco?: number;
  itemInCart: boolean;
  itemFavorito: boolean;
  handleFavoriteToggle: () => void;
  handleCartToggle: () => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
  handleCheckout?: () => void;
}

const Card: React.FC<CardProps> = ({
  isOwnAdvertisement,
  descricao,
  titulo,
  dataCriacao,
  preco,
  itemInCart,
  itemFavorito,
  handleFavoriteToggle,
  handleCartToggle,
  handleCheckout,
  handleEdit,
  handleDelete,
}) => {
  const formatarValorBRL = (valor: number) => {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <div className="border p-10 px-10 rounded-lg shadow-sm relative">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-sm">
          <FontAwesomeIcon icon={faCalendar} className="mr-2 text-[#DE3450]" />
          <span>{dataCriacao ? formatData(dataCriacao) : "N/A"}</span>
        </div>
        {!isOwnAdvertisement && (
          <FontAwesomeIcon
            icon={itemFavorito ? solidHeart : regularHeart}
            className="absolute top-4 right-4 text-xl cursor-pointer transition-colors duration-300 text-secondaryColor"
            onClick={handleFavoriteToggle}
          />
        )}
      </div>

      <h1 className="text-xl font-bold mb-2 text-[#2A2C2F] max-w-full break-words whitespace-normal">
        {titulo || "N/A"}
      </h1>
      <p className="max-w-full break-words mb-4 font-extralight whitespace-normal">
        {descricao || "Descrição não disponível."}
      </p>
      <div className="text-3xl mb-8 text-[#2A2C2F] max-w-full break-words">
        {formatarValorBRL(preco || 0)}
      </div>

      <div className="flex flex-col space-y-4">
        {isOwnAdvertisement ? (
          <></>
        ) : (
          <>
            <button onClick={handleCheckout} className="bg-[#2A2C2F] text-white text-sm py-3 px-4 rounded-lg flex items-center justify-center space-x-4">
              <FontAwesomeIcon className="text-secondaryColor" icon={faCreditCard} />
              <span>Comprar Agora</span>
            </button>
            <button
              onClick={handleCartToggle}
              className="bg-[#2A2C2F] text-white text-sm py-3 px-4 rounded-lg flex items-center justify-center space-x-4"
            >
              <FontAwesomeIcon
                icon={itemInCart ? faCheck : faCartPlus}
                className="text-lg cursor-pointer transition-colors duration-300 text-secondaryColor"
              />
              <span>{itemInCart ? "Adicionado" : "Adicionar ao carrinho"}</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
