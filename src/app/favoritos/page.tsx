"use client";

import Navbar from "@/components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardsRecomendados from "@/components/CardsRecomendados";
import Footer from "@/components/Footer";
import withAuth from "@/common/auth/Hok/withAuth";
import ListaFavoritos from "@/components/ListaFavoritos";
import { IFavorito } from "@/interfaces/IFavorito";
import useFavoritos from "@/hooks/useFavoritos";

function Carrinho() {

  const { getListaItens } = useFavoritos();
  const anuncios: IFavorito[] = getListaItens();

  return (
    <div className="bg-mainBackground font-sans flex flex-col min-h-screen">
      <ToastContainer 
          position="top-center" 
          autoClose={2000} 
          hideProgressBar 
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover 
        />
      <Navbar />
      <main className="flex-grow w-full px-24 mt-10 pb-10">
          <h1 className="text-4xl mb-2 text-left text-mainColor">Lista de favoritos</h1>
          <h2 className="text-md mb-2 text-left font-light text-gray-500">Adicione itens à sua lista de favoritos</h2>
          {anuncios.length > 0 ? (
            <div className="flex flex-row space-x-20 mb-10">
              <ListaFavoritos />
            </div>
          ) : (
            <div className="mt-10 mb-20">
              <p className="font-extralight text-gray-400">Nenhum item na lista de favoritos.</p>
            </div>
          )}
          <CardsRecomendados />
      </main>
      <Footer />
    </div>
  );
}

export default withAuth(Carrinho);