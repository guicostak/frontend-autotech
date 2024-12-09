import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store'; 
import { addFavorite, removeFavorite, clearFavorites } from '@/store/favoritosSlice'; 
import { toast } from 'react-toastify';
import { getAnunciosByListIDs } from '@/services/anuncioService';
import { IFavorito } from '@/interfaces/IFavorito';

const useFavoritos = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.favoritos.items);

  const adicionarFavorito = (item: IFavorito) => {
    dispatch(addFavorite(item));
    setTimeout(() => {
      toast.success('Item adicionado aos favoritos!', {});
    }, 500);
  };

  const removerFavorito = (itemId: number) => {
    dispatch(removeFavorite(itemId)); 
    setTimeout(() => {
      toast.success('Item removido dos favoritos!', {});
    }, 500);
  };

  const limparFavoritos = () => {
    dispatch(clearFavorites());
  };

  const isFavorito = (itemId: number): boolean => {
    return items.some(item => item.id === itemId);
  };

  const getListaItens = (): IFavorito[] => {
    return items;
  };

  const getListaIds = (): number[] => {
    return items.map(item => item.id);
  };

  const atualizarFavoritos = async (): Promise<void> => {
    try {
      const listaIds = getListaIds();
      if (listaIds.length === 0) return;
  
      const anunciosAtualizados = await getAnunciosByListIDs(listaIds);
  
      anunciosAtualizados.forEach((anuncioAtualizado: any) => {
        dispatch(addFavorite({
          ...anuncioAtualizado,
          imagem: anuncioAtualizado.imagensLinks?.[0] || anuncioAtualizado.imagem,
        }));
      });
    } catch (error) {
      console.error('Erro ao atualizar os favoritos:', error);
    }
  };
  

  const getQuantidadeItensFavoritos = (): number => {
    return items.length; 
  };

  return {
    items,
    adicionarFavorito,
    removerFavorito,
    limparFavoritos,
    isFavorito,
    getListaItens,
    atualizarFavoritos,
    getQuantidadeItensFavoritos  
  };
};

export default useFavoritos;
