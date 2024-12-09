"use client";

import Navbar from "@/components/Navbar";
import MenuLateral from "@/components/MenuLateral";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import withAuth from "@/common/auth/Hok/withAuth";
import Pedido from "@/components/Pedido";
import { useEffect } from "react";
import { useMeusPedidos } from "@/hooks/useMeusPedidos";

function PedidosRecebidos() {
  const { pedidosRecebidos, getPedidosRecebidosHook } = useMeusPedidos();

  useEffect(() => {
    getPedidosRecebidosHook();
  }, []);

  return (
    <body className="bg-mainBackground font-sans flex flex-col">
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

      <div className="bg-mainBackground h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1 overflow-auto">
          <MenuLateral />
          <main className="flex-1 p-4 w-full h-full flex flex-col items-center justify-start py-10 pb-20 overflow-y-auto">
            <div className="w-full px-36">
              <h1 className="text-4xl mb-2 text-left text-mainColor">Pedidos recebidos</h1>
              <h2 className="text-md mb-6 text-left font-light text-gray-500">
                Acompanhe os pedidos recebidos em sua loja
              </h2>
            </div>
            <div className="flex flex-row flex-wrap px-24">
              {pedidosRecebidos.length > 0 ? (
                pedidosRecebidos.map((pedido) => (
                  <Pedido
                    key={pedido.pedidoId}
                    pedidoId={pedido.pedidoId}
                    tituloAnuncio={pedido.tituloAnuncio}
                    anuncioId={pedido.anuncioId}
                    imagemAnuncio={pedido.imagemAnuncio}
                    valorTotal={pedido.valorTotal}
                    statusPagamento={pedido.statusPagamento}
                    dataPedido={pedido.dataPedido}
                  />
                ))
              ) : (
                <p className="text-gray-500 mt-24">Nenhum pedido recebido ainda.</p>
              )}
            </div>
          </main>
        </div>
      </div>
    </body>
  );
}

export default withAuth(PedidosRecebidos);
