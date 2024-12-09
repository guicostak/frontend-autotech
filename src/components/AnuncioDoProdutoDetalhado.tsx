"use client";
import { useEffect } from "react";
import mercadoPagoImg from "@/assets/img/mercadopago.jpeg";
import { useVerAnuncioDetalhado } from "@/hooks/useVerAnuncioDetalhado";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import LoadingDots from "@/utils/loading/LoadingDots";
import ProdutoCaracteristicas from "./ProdutoCaracteristicas";

import MeiosPagamento from "./MeiosPagamento";
import Card from "./Card";
import ImagensAnuncio from "./ImagensAnuncio";
import AnuncianteLojaInfo from "./AnuncianteLojaInfo";
import AnuncianteUserInfo from "./AnuncianteUserInfo";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface AnuncioDoProdutoDetalhadoProps {
  readonly isLoggedIn: boolean;
  readonly idAnuncio: number;
  readonly router: AppRouterInstance;
}

export default function AnuncioDoProdutoDetalhado({
  idAnuncio,
  router,
  isLoggedIn
}: AnuncioDoProdutoDetalhadoProps) {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const userId = Number(userInfo?.id)

  const { 
    loading, 
    getAnuncioByIdHook, 
    anuncio, 
    handleCartToggle,
    handleFavoriteToggle,
    itemInCart,
    itemFavorito,
    handleCheckout
  } = useVerAnuncioDetalhado(router, idAnuncio);

  useEffect(() => {
    getAnuncioByIdHook(idAnuncio);
  }, [idAnuncio]);

  const images = anuncio?.imagens || [];


  const isOwnAdvertisement = userId === anuncio?.anunciante.usuario_id;

  if (loading) {
    return (
      <div className="mt-20">
        <LoadingDots isLoading={loading} />
      </div>
    );
  } else {
    return (
        <div className="bg-white h-auto w-4/5 mx-auto p-12 pb-16 shadow-lg mt-6 flex flex-col items-center rounded-xl">

          <div className="flex flex-col lg:flex-row gap-24 justify-center items-start">
            <div className="w-full lg:w-[486px] flex flex-col space-y-6">
              <ImagensAnuncio images={images} />

              <ProdutoCaracteristicas
                modelo={anuncio?.modelo}
                marca={anuncio?.marca}
                ano_fabricacao={anuncio?.ano_fabricacao}
                categoria={anuncio?.categoria}
                descricao={anuncio?.descricao}
              />
            </div>

            <div className="w-full lg:w-[486px] flex flex-col space-y-6">
              <Card
                isOwnAdvertisement={isOwnAdvertisement}
                descricao={anuncio?.descricao}
                titulo={anuncio?.titulo}
                dataCriacao={anuncio?.data_criacao}
                preco={anuncio?.preco}
                itemInCart={itemInCart}
                itemFavorito={itemFavorito}
                handleFavoriteToggle={handleFavoriteToggle}
                handleCartToggle={handleCartToggle}
                handleCheckout={handleCheckout}
              />

              {
              anuncio?.anunciante.is_vendedor ? 
                <AnuncianteLojaInfo
                  isOwnAdvertisement={isOwnAdvertisement}
                  idAnuncio={anuncio?.anuncio_id}
                  imagem={anuncio?.anunciante.imagem}
                  anuncianteNome={anuncio?.anunciante.nome}
                  phone={anuncio?.anunciante.telefone}
                  email={anuncio?.anunciante.email}
                  cnpj={anuncio.anunciante.documento}
                  rating={5}
                  reviews={10}
                /> 
                :
                <AnuncianteUserInfo
                    isOwnAdvertisement={isOwnAdvertisement}
                    idAnuncio={anuncio?.anuncio_id}
                    imagem={anuncio?.anunciante.imagem}
                    anuncianteNome={anuncio?.anunciante.nome}
                    phone={anuncio?.anunciante.telefone}
                    email={anuncio?.anunciante.email}
                    cpf={anuncio?.anunciante.documento}
                    rating={5}
                    reviews={10}
                />
              }

              <MeiosPagamento
                imageSrc={mercadoPagoImg}
                altText="Formas de pagamento"
              />
            </div>
          </div>
        </div>
    );
  }
}
