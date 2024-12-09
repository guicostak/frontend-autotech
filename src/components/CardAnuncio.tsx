import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCartPlus, faCheck, faLocationDot, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { IAnuncioCard } from '@/interfaces/IAnuncioCard';
import { formatarValorBRL, truncateString } from '@/utils/stringUtils';
import useCarrinhoDeCompras from '@/hooks/useCarrinhoDeCompras';
import useFavoritos from '@/hooks/useFavoritos';
import { IitemCarrinho } from '@/interfaces/IitemCarrinho';
import { IFavorito } from '@/interfaces/IFavorito';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface ICardAnuncioProps {
  anuncio: IAnuncioCard;
}

const CardAnuncio: React.FC<ICardAnuncioProps> = ({ anuncio }) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const userId = Number(userInfo?.id)

  const { isItemInCart, adicionarItem, removerItem } = useCarrinhoDeCompras();
  const { isFavorito, adicionarFavorito, removerFavorito } = useFavoritos(); 

  const itemInCart = isItemInCart(anuncio.id);
  const itemFavorito = isFavorito(anuncio.id);

  const anuncioCarrinho: IitemCarrinho = {
    id: anuncio.id,
    titulo: anuncio.titulo,
    preco: anuncio.preco,
    imagem: anuncio.imagem,
    quantidade: 1,
  };

  const anuncioFavorito: IFavorito = {
    id: anuncio.id,
    titulo: anuncio.titulo,
    preco: anuncio.preco,
    imagem: anuncio.imagem,
    dataCriacao: anuncio.dataCriacao,
    descricao: anuncio.descricao,
  };

  const handleCartToggle = () => {
    if (itemInCart) {
      removerItem(anuncio.id);
    } else {
      adicionarItem(anuncioCarrinho);
    }
  };

  const handleFavoriteToggle = () => {
    if (itemFavorito) {
      removerFavorito(anuncio.id);
    } else {
      adicionarFavorito(anuncioFavorito);
    }
  };

  const isUserAnuncio = anuncio.usuarioId === userId;

  return (
    <div className="border mb-12 text-left w-72 h-[28rem] pb-5 ml-4 mr-4 border-gray-300 rounded-xl relative flex flex-col justify-top shadow-md group transition-shadow duration-300 hover:shadow-2xl overflow-hidden">
      <Link href={`/anuncio/${anuncio.id}`} passHref>
        <img
          src={anuncio.imagem || '/path/to/default/image.png'}
          alt="Imagem do anúncio"
          className="w-72 h-56 h-max-56 rounded-xl border-b cursor-pointer transition-transform duration-300 transform group-hover:scale-105 object-cover"
        />
      </Link>
      <div className="flex flex-col justify-between h-full">
        <Link href={`/anuncio/${anuncio.id}`} passHref>
          <div className="mt-4 flex flex-col items-start justify-left w-full px-5 break-words">
            <p className="text-mainColor text-xl">{formatarValorBRL(Number(anuncio.preco))}</p>
            <h2 className="text-gray-600 text-sm cursor-pointer break-words w-full mt-3">
              {truncateString(anuncio.titulo, 40)}
            </h2>
            <p className="font-extralight mt-1 text-sm text-gray-600">
              <strong className="my-2 text-sm text-gray-600">Categoria:</strong> {anuncio.categoria}
            </p>
          </div>
        </Link>
        <Link href={`/anuncio/${anuncio.id}`} passHref>
          <div className="mt-4 flex flex-col items-start justify-left w-full px-5 break-words">
            <p className="text-gray-500 text-xs">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-xs mr-2 cursor-pointer transition-colors duration-300"
              />
              {anuncio.endereco}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              <FontAwesomeIcon
                icon={faCalendar}
                className="text-xs mr-2 cursor-pointer transition-colors duration-300"
              />
              {anuncio.dataCriacao}
            </p>
          </div>
        </Link>
      </div>
      {!isUserAnuncio && (
        <>
          <FontAwesomeIcon
            icon={itemFavorito ? solidHeart : regularHeart}
            className="absolute bottom-2 right-2 text-lg cursor-pointer transition-colors duration-300"
            style={{ color: itemFavorito ? '#DE3450' : '#DE3450' }}
            onClick={handleFavoriteToggle}
          />
          <FontAwesomeIcon
            icon={itemInCart ? faCheck : faCartPlus}
            className="absolute bottom-2 right-10 text-lg cursor-pointer transition-colors duration-300"
            style={{ color: '#DE3450' }}
            onClick={handleCartToggle}
          />
        </>
      )}
    </div>
  );
};

export default CardAnuncio;
