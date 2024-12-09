import { getAnuncioById } from "@/services/anuncioService";
import { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { IAnuncioDetalhado } from "@/interfaces/IAnuncioDetalhado";
import useCarrinhoDeCompras from "./useCarrinhoDeCompras";
import useFavoritos from "./useFavoritos";
import { IitemCarrinho } from "@/interfaces/IitemCarrinho";
import { IFavorito } from "@/interfaces/IFavorito";

export const useVerAnuncioDetalhado = (router: AppRouterInstance, idAnuncio: number) => {
  const [anuncio, setAnuncio] = useState<IAnuncioDetalhado | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { isItemInCart, adicionarItem, removerItem, checkout } = useCarrinhoDeCompras();
  const { isFavorito, adicionarFavorito, removerFavorito } = useFavoritos();
  const itemInCart = isItemInCart(idAnuncio);
  const itemFavorito = isFavorito(idAnuncio);
  const isOwnAnounce = isFavorito(idAnuncio);

  const getAnuncioByIdHook = async (anuncioId: number) => {
    setLoading(true);
    try {
      const response = await getAnuncioById(anuncioId);
      console.log(response)
      setAnuncio(response);
    } catch (err) {
      console.log(err)
      router.push("/anuncionaoencontrado");
    } finally {
      setTimeout(() => {
        setLoading(false); 
      }, 400)
    }
  };
  
  const handleCartToggle = () => {
    if (itemInCart) {
      removerItem(idAnuncio);
    } else if (anuncio) {
      const anuncioCarrinho: IitemCarrinho = {
        id: idAnuncio,
        titulo: anuncio.titulo,
        preco: anuncio.preco.toString(),
        imagem: anuncio.imagens[0],
        quantidade: 1,
      };
      adicionarItem(anuncioCarrinho);
    } 
  };
  const handleCheckout = () => {
    if (anuncio) {
      const anuncioCarrinho: IitemCarrinho = {
        id: idAnuncio,
        titulo: anuncio.titulo,
        preco: anuncio.preco.toString(),
        imagem: anuncio.imagens[0],
        quantidade: 1,
      };
      router.push("/carrinho")
      checkout(anuncioCarrinho);
    } 
  };

  const handleFavoriteToggle = () => {
    if (itemFavorito) {
      removerFavorito(idAnuncio);
    } else if (anuncio) {
      const anuncioFavorito: IFavorito = {
        id: idAnuncio,
        titulo: anuncio.titulo,
        preco: anuncio.preco.toString(),
        imagem: anuncio.imagens[0],
        dataCriacao: anuncio.data_criacao,
        descricao: anuncio.descricao,
      };
      adicionarFavorito(anuncioFavorito);
    }
  };

  return {
    getAnuncioByIdHook,
    anuncio,
    loading,
    isItemInCart,
    adicionarItem,
    removerItem,
    isFavorito,
    adicionarFavorito, 
    removerFavorito,
    handleCartToggle,
    handleFavoriteToggle,
    itemInCart, 
    itemFavorito,
    handleCheckout
  };
};
