import axios from 'axios';
import { store } from '@/store/store';
import { IPedido } from '@/interfaces/IPedido';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ANUNCIOS_URL,
});

const getAuthToken = () => {
    const state = store.getState();
    return state.user.token;
};

const pedidosUrl = process.env.NEXT_PUBLIC_API_PEDIDOS as string;

export const fazerPedido = async (bodyRequest: IPedido) => {
    try {
        const response = await api.post(
            `${pedidosUrl}`,
            bodyRequest,
            {
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`,
                },
            }
        );
        console.log(response);

        const { url_pagamento } = response.data;
        if (url_pagamento) {
            window.location.href = url_pagamento; 
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data || 'Erro ao fazer o pedido';
            throw new Error(errorMessage);
        } else {
            throw new Error('Erro inesperado ao fazer o pedido');
        }
    }
};


export const getPedidosRealizados = async (idUsuario?: string | null) => {
    try {
        const response = await api.get(`${pedidosUrl}/realizados/${idUsuario}`,
            {
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data || 'Erro ao buscar o anúncio';
            throw new Error(errorMessage);
        } else {
            throw new Error('Erro inesperado ao buscar o anúncio');
        }
    }
};

export const getPedidosRecebidos = async (idUsuario?: string | null) => {
    try {
        const response = await api.get(`${pedidosUrl}/recebidos/${idUsuario}`,
            {
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data || 'Erro ao buscar o anúncio';
            throw new Error(errorMessage);
        } else {
            throw new Error('Erro inesperado ao buscar o anúncio');
        }
    }
};
