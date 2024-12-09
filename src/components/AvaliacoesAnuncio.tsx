import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface Avaliacao {
  nome: string;
  data: string;
  comentario: string;
}

interface AvaliacoesAnuncioProps {
  notaGeral: number;
  distribuicaoAvaliacoes: {
    [key: number]: number;
  };
  comentarios: Avaliacao[];
}

const AvaliacoesAnuncio: React.FC<AvaliacoesAnuncioProps> = ({
  notaGeral,
  distribuicaoAvaliacoes,
  comentarios,
}) => {
  const renderStars = (rating: number) => {
    const filledStars = Array(rating).fill(<FontAwesomeIcon icon={faStar} />);
    const emptyStars = Array(5 - rating).fill(
      <FontAwesomeIcon icon={faStar} className="text-gray-300" />
    );
    return [...filledStars, ...emptyStars];
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold mb-4 text-[#2A2C2F]">Avaliações do anúncio</h2>

      <div className="flex items-center mb-4">
        <span className="text-4xl font-bold text-[#2A2C2F]">{notaGeral}</span>
        <div className="flex ml-4 text-red-500">
          {renderStars(Math.round(notaGeral))}
        </div>
      </div>
      
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center">
            <div className="w-full h-2 bg-gray-200 rounded-full mr-2">
              <div
                className="h-full bg-gray-500"
                style={{
                  width: `${distribuicaoAvaliacoes[star] || 0}%`,
                }}
              ></div>
            </div>
            <span>
              {star} <FontAwesomeIcon icon={faStar} />
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-4">
        {comentarios.map((comentario, index) => (
          <div key={index} className="border p-4 rounded-md">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[#2A2C2F]">{comentario.nome}</h3>
              <p className="text-gray-500 text-right">{comentario.data}</p>
            </div>
            <p className="text-[#2A2C2F]">{comentario.comentario}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvaliacoesAnuncio;
