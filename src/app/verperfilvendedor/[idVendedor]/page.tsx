"use client";

import Navbar from "@/components/Navbar";
import { useAppSelector } from "@/store/store";
import { useRouter, useParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import AnuncioDoProdutoDetalhado from "@/components/AnuncioDoProdutoDetalhado";
import PerfilVendedor from "@/components/PerfilVendedor";

export default function VerPerfilVendedor() {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const { idVendedor } = useParams<{ idVendedor: string}>(); 
  
  return (
    <div className="min-h-screen pb-12 bg-mainBackground">
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

      <PerfilVendedor isLoggedIn={isLoggedIn} idVendedor={Number(idVendedor)} />
    </div>
  );
}