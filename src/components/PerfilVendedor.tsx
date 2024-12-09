"use client";

import React, { useEffect } from "react";
import { usePerfilVendedor } from "@/hooks/usePerfilVendedor";
import Footer from "@/components/Footer";
import LoadingDots from "@/utils/loading/LoadingDots";
import { useParams } from "next/navigation";

interface PerfilVendedorProps {
    isLoggedIn: boolean;
    idVendedor: number;
  }

  const PerfilVendedor: React.FC<PerfilVendedorProps> = ({ isLoggedIn, idVendedor }) => {
    const { fetchPerfilVendedor, loading, vendedor } = usePerfilVendedor();
  
    useEffect(() => {
      if (idVendedor) {
        fetchPerfilVendedor(Number(idVendedor));
      }
    }, [idVendedor, fetchPerfilVendedor]);
  
    if (loading) {
      return (
        <div className="mt-20">
          <LoadingDots isLoading={loading} />
        </div>
      );
    }
  
    if (!vendedor) {
      return (
        <div className="mt-20">
          <h1 className="text-center text-xl font-semibold text-gray-700">
            Vendedor não encontrado.
          </h1>
        </div>
      );
    }
  
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-grow flex justify-center items-start p-6">
          <div className="border rounded-lg shadow-lg bg-white w-1/3 p-4 relative">
            <div className="flex items-center mb-4">
              <img
                src="/path-to-logo.jpg"
                alt="Vendor Logo"
                className="h-10 w-10 rounded-full mr-3"
              />
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-[#2A2C2F]">
                  {vendedor.nomeFantasia || "Vendedor"}
                </h2>
                <p className="text-sm text-gray-500">último acesso há 9 dias</p>
              </div>
            </div>
  
            <div className="mt-4">
              <h3 className="font-semibold text-[#2A2C2F] mb-2">Sobre a Loja</h3>
              <p className="text-sm text-gray-600">
                {vendedor.descricao || "Descrição não disponível."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default PerfilVendedor;
