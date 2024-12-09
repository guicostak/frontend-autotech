import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useState } from 'react';
import { IitemCarrinho } from '@/interfaces/IitemCarrinho';
import { IAnunciosPedido, IPedido } from '@/interfaces/IPedido';
import { fazerPedido } from '@/services/pedidosService';

const useCheckout = () => {
  const items = useSelector((state: RootState) => state.carrinhoDeCompras.items);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const userId = Number(userInfo?.id)
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const converterParaPedido = (item: IitemCarrinho): IAnunciosPedido => {
    return {
      anuncioId: item.id || null,
      quantidade: item.quantidade.toString() || null,
    };
  };

  const checkoutCarrinho = async () => {
    setLoading(true);
    setErro(null);

    try {
      const pedidos: IAnunciosPedido[] = items.map(converterParaPedido);

      const pedidoFinal: IPedido = {
        anuncios: pedidos,  
        usuarioId: userId || null,
      };

      return fazerPedido(pedidoFinal);

    } catch (error: any) {
      console.error('Erro ao realizar checkout:', error.message);
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    checkoutCarrinho,
    loading,
    erro,
  };
};

export default useCheckout;
