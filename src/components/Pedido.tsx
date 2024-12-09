import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { formatarData } from '@/utils/dataUtils';
import { formatarValorBRL } from '@/utils/stringUtils';

interface PedidoRealizadoProps {
  pedidoId: number;
  tituloAnuncio: string;
  anuncioId: number;
  imagemAnuncio: string;
  valorTotal: number;
  statusPagamento: string;
  dataPedido: string;
}

const Pedido: React.FC<PedidoRealizadoProps> = ({ 
  pedidoId, 
  tituloAnuncio, 
  anuncioId, 
  imagemAnuncio, 
  valorTotal, 
  statusPagamento, 
  dataPedido 
}) => {
  return (
    <div className="bg-white rounded-lg h-96 flex mt-10 flex-col border w-72 ml-10 items-center justify-center relative shadow-md hover:shadow-xl transition-shadow duration-300">
      
      <div className="mb-4 h-42 w-42 overflow-hidden rounded-xl">
        <img
          src={imagemAnuncio}
          alt={tituloAnuncio}
          className="w-36 h-36 rounded-xl transform transition-transform duration-300 hover:scale-110"
        />
      </div>
      <span className="w-full ml-4  text-gray-400 text-xs rounded px-2 py-1">
        Pedido #{pedidoId}
      </span>

      <div className="flex flex-col w-64 px-5 py-6">
        <Link className="cursor-pointer" href={`/anuncio/${anuncioId}`} passHref>
          <div className="flex items-center mb-2">
            <FontAwesomeIcon icon={faCalendar} className="text-gray-500 mr-2 text-xs" />
            <p className="text-gray-500 font-light text-xs">Realizado em {formatarData(dataPedido)}</p>
          </div>
          <h2 className="text-md text-mainColor break-words">
            {tituloAnuncio}
          </h2>
          <p className="text-mainColor text-xl">{formatarValorBRL(Number(valorTotal))}</p>
          <p className={`text-xs text-white mt-2 rounded-md pl-3 w-auto py-1 ${statusPagamento === 'Pago' ? 'bg-green-400' : 'bg-red-400'}`}>
          Status: {statusPagamento}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Pedido;
