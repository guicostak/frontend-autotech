import React from "react";

interface ProdutoCaracteristicasProps {
  modelo?: string;
  marca?: string;
  ano_fabricacao?: string | number;
  categoria?: string;
  descricao?: string;
}

const ProdutoCaracteristicas: React.FC<ProdutoCaracteristicasProps> = ({
  modelo = "N/A",
  marca = "N/A",
  ano_fabricacao = "N/A",
  categoria = "N/A",
  descricao = "Descrição não disponível.",
}) => {
  return (
    <div>
      <div className="border-t border-b pb-4 mb-4">
        <h2 className="text-lg font-bold mb-2 mt-4">Características do produto</h2>
        <p className="mb-2">
          <strong className="text-[#2A2C2F]">Modelo:</strong> {modelo}
        </p>
        <p className="mb-2">
          <strong className="text-[#2A2C2F]">Marca:</strong> {marca}
        </p>
        <p className="mb-2">
          <strong className="text-[#2A2C2F]">Ano de fabricação:</strong> {ano_fabricacao}
        </p>
        <p className="mb-2">
          <strong className="text-[#2A2C2F]">Categoria:</strong> {categoria}
        </p>
      </div>
      
      <div className="border-b pb-4 mb-4">
        <h2 className="text-lg font-bold mb-2">Descrição completa</h2>
        <p className="max-w-full break-words whitespace-normal">{descricao}</p>
      </div>
    </div>
  );
};

export default ProdutoCaracteristicas;
