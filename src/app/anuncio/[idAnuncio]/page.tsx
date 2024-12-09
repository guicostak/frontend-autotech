"use client";
import Navbar from "@/components/Navbar";
import { useAppSelector } from "@/store/store";
import { useRouter, useParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import AnuncioDoProdutoDetalhado from "@/components/AnuncioDoProdutoDetalhado";

export default function VerAnuncio() {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const router = useRouter();
  const { idAnuncio } = useParams<{ idAnuncio: string}>(); 
  
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
      <AnuncioDoProdutoDetalhado isLoggedIn={isLoggedIn} router={router} idAnuncio={Number(idAnuncio)} />
    </div>
  );
}
