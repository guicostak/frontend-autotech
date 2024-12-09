export interface IPedido {
    usuarioId: number | null;
    anuncios: IAnunciosPedido[] | null;  
}

export interface IAnunciosPedido {
    anuncioId: number | null;
    quantidade: string | null;
}
