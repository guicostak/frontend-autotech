import { useEffect } from 'react';
import Botao from './Botao';
import { IFavorito } from '@/interfaces/IFavorito';
import useFavoritos from '@/hooks/useFavoritos';
import ItemFavorito from './ItemFavorito';

export function ListaFavoritos() {
  const { getListaItens, limparFavoritos, atualizarFavoritos } = useFavoritos();
  const anuncios: IFavorito[] = getListaItens();

  useEffect(() => {
    const atualizar = async () => {
      console.log(anuncios)
      await atualizarFavoritos();
    };
    atualizar();
  }, []);

  return (
    <div className="container mx-auto py-5 text-center mb-10">
      <div className="flex flex-col items-start">
        <div className="flex flex-col text-left w-full space-y-4">
          {anuncios.map((anuncio) => (
            <ItemFavorito key={anuncio.id} anuncio={anuncio} />
          ))}
        </div>
        
        {anuncios.length > 0 && (
          <Botao onClick={limparFavoritos} className="font-medium text-red-400 mt-5">
            Limpar lista de favoritos
          </Botao>
        )}
      </div>
    </div>
  );
}

export default ListaFavoritos;
