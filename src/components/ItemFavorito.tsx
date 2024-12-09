import Botao from './Botao';
import Link from 'next/link';
import useFavoritos from '@/hooks/useFavoritos';
import { IFavorito } from '@/interfaces/IFavorito';
import { formatarData } from '@/utils/dataUtils';
import { formatarValorBRL } from '@/utils/stringUtils';

interface ICardAnuncioProps {
  anuncio: IFavorito;
}

const ItemFavorito: React.FC<ICardAnuncioProps> = ({ anuncio }) => {
  const { removerFavorito } = useFavoritos();

  return (
    <div className="bg-white h-40 text-left rounded-xl p-4 items-center flex flex-row justify-start shadow-lg">
      <Link href={`/anuncio/${anuncio.id}`} passHref>
        <img
          src={anuncio.imagem || '/path/to/default/image.png'}
          alt={`Imagem do ${anuncio.titulo}`}
          className="h-full border-r w-36 pr-2 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="justify-between flex flex-row w-full">
        <div className="ml-12 flex flex-col items-start justify-center border-r">
          <p className="text-gray-500 font-light text-xs">
            Criado em {formatarData(anuncio.dataCriacao)}
          </p>
          <Link href={`/anuncio/${anuncio.id}`} passHref>
            <h2 className="text-xl w-80 text-[#2A2C2F] break-words cursor-pointer">
              {anuncio.titulo}
            </h2>
          </Link>
          <Botao onClick={() => removerFavorito(anuncio.id)} className="text-secondaryColor font-light text-xs pl-0">
            remover favorito
          </Botao>
        </div>
        <div className="ml-8 w-full flex flex-row items-center justify-between pr-10">
          <div className="w-5/6 pr-16 flex flex-col items-start h-32 justify-center border-r">
            <span className="text-sm text-gray-500 ml-10">{anuncio.descricao}</span>
          </div>
          <p className="text-lg ml-10">{formatarValorBRL(Number(anuncio.preco))}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemFavorito;
