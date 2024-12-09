export interface IAnuncioDetalhado {
  anuncio_id: number;
  ativo: boolean;
  categoria: string;
  data_criacao: string;
  descricao: string;
  imagens: string[];
  marca: string;
  modelo: string;
  preco: number;
  quantidade_produtos: number;
  titulo: string;
  ano_fabricacao?: string;
  anunciante: IAnunciante;
  }
  
  export interface IAnunciante {
    usuario_id: number;
    is_vendedor: boolean;
    nome: string;
    email: string;
    documento: string;
    telefone: string;
    imagem: string;
  }
  