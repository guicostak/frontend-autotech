import { getPedidosRealizados, getPedidosRecebidos } from '@/services/pedidosService';
import { useState } from 'react';
import { useAppSelector } from "@/store/store";
import { PedidoResponse } from '@/interfaces/IPedidoRealizado';

export const useMeusPedidos = () => {
  const userId = useAppSelector((state) => state.user.userInfo?.id);

  const [pedidosRealizados, setPedidosRealizados] = useState<PedidoResponse[]>([]);
  const [pedidosRecebidos, setPedidosRecebidos] = useState<PedidoResponse[]>([]);

  const { id } = useAppSelector((state) => state.user.userInfo || { id: null });

  const getPedidosRealizadosHook = async () => {
    try {
      const response: any = await getPedidosRealizados(id);

      if (response?.pedidos && response.pedidos.length > 0) {
        const pedidosFormatados: PedidoResponse[] = response.pedidos.map((pedido: any) => ({
          pedidoId: pedido.pedido_id,
          tituloAnuncio: pedido.titulo_anuncio,
          anuncioId: pedido.anuncio_id,
          imagemAnuncio: pedido.imagem_anuncio,
          valorTotal: pedido.valor_total,
          statusPagamento: pedido.status_pagamento,
          dataPedido: pedido.data_pedido,
        }));

        setPedidosRealizados(pedidosFormatados);
      } else {
        setPedidosRealizados([]); 
      }
    } catch (err) {
      console.error('Erro ao buscar seus pedidos', err);
    }
  };

  const getPedidosRecebidosHook = async () => {
    try {
      const response: any = await getPedidosRecebidos(id);

      if (response?.pedidos && response.pedidos.length > 0) {
        const pedidosFormatados: PedidoResponse[] = response.pedidos.map((pedido: any) => ({
          pedidoId: pedido.pedido_id,
          tituloAnuncio: pedido.titulo_anuncio,
          anuncioId: pedido.anuncio_id,
          imagemAnuncio: pedido.imagem_anuncio,
          valorTotal: pedido.valor_total,
          statusPagamento: pedido.status_pagamento,
          dataPedido: pedido.data_pedido,
        }));

        setPedidosRecebidos(pedidosFormatados);
      } else {
        setPedidosRealizados([]); 
      }
    } catch (err) {
      console.error('Erro ao buscar seus pedidos', err);
    }
  };

  return {
    pedidosRealizados,
    pedidosRecebidos,
    getPedidosRealizadosHook,
    getPedidosRecebidosHook
  };
};
