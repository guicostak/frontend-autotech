
import { useState } from "react";
import { getVendedorByUsuarioId } from "@/services/vendedorService";
import { IVendedor } from "@/interfaces/IVendedor";
import { getUserById } from "@/services/userService";

export const usePerfilVendedor = () => {
    const [vendedor, setVendedor] = useState<IVendedor | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPerfilVendedor = async (vendedorId: number) => {
        setLoading(true);
        try {
            const response = await getUserById(vendedorId);
            setVendedor(response);
        } catch (err) {
            console.error("Erro ao buscar perfil do vendedor:", err);
            setVendedor(null);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 400);
        }
    };

    return {
        fetchPerfilVendedor,
        loading,
        vendedor
    };
};

