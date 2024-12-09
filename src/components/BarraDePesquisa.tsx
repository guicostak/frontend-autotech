import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Botao from "./Botao";
import { useAnuncios } from "@/hooks/useAnuncios";
import { useSearchParams } from "next/navigation";
import { IFiltros } from "@/interfaces/IFiltros";

export default function BarraDePesquisa() {
  const { handleValorPesquisadoChange, filtros, montarUrlComFiltros, handleFiltroChange, getAnunciosPorFiltros, setFiltros,  handleEnterPress, handlePesquisarButton } = useAnuncios(); 

  const searchParams = useSearchParams();

  useEffect(() => {
    const valorPesquisado = searchParams.get("valorPesquisado") || "";
    const categoria = searchParams.get("categoria") || "";
    const precoMin = searchParams.get("precoMin") || "";
    const precoMax = searchParams.get("precoMax") || "";
    const marca = searchParams.get("marca") || "";
    const modelo = searchParams.get("modelo") || "";
    const anoFabricacao = searchParams.get("anoFabricacao") || "";
    const campoOrdenacao = searchParams.get("campoOrdenacao") || "dataCriacao";
    const ordenacao = searchParams.get("ordenacao") || "desc";
    const tipoAnuncio = searchParams.get("tipoAnuncio") || "";
    const page = searchParams.get("page") || "";
    const size = searchParams.get("size") || "";

    const novosFiltros: IFiltros = {
      valorPesquisado,
      categoria,
      precoMin,
      precoMax,
      marca,
      modelo,
      anoFabricacao,
      campoOrdenacao,
      ordenacao,
      tipoAnuncio,
      page,
      size,
    };

    setFiltros(novosFiltros);
    getAnunciosPorFiltros(novosFiltros);
  }, [searchParams]);

  return (
    <div className="bg-white h-8 flex items-center pl-2 justify-end border-none rounded-xl w-64 pr-1 text-sm">
      <input
        type="text"
        value={filtros.valorPesquisado}
        onChange={handleValorPesquisadoChange}
        onKeyPress={handleEnterPress}
        placeholder="Digite o valor para pesquisa"
        className="w-full outline-none"
      />
      <Botao type="button" className="p-0" onClick={handlePesquisarButton}>
        <FontAwesomeIcon className="text-mainColor cursor-pointer" icon={faSearch} />
      </Botao>
    </div>
  );
}
