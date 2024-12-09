export interface PedidoResponse {
    pedidoId: number;
    tituloAnuncio: string;
    anuncioId: number;
    imagemAnuncio: string;
    valorTotal: number; 
    statusPagamento: string;
    dataPedido: string;
  }
  
  export interface PedidoResponse {
    usuarioId: number;
    pedidos: PedidoResponse[];
  }
  