import { IChatInfo } from '@/interfaces/IChatInfo';
import { store } from '@/store/store';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid"; 

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_USUARIOS_URL,
});

const getAuthToken = () => {
    const state = store.getState();
    return state.user.token;
};

const chatUrl = `${process.env.NEXT_PUBLIC_API_CHAT}`;

export const getHistoricoDeMensagens = async (chatId: string): Promise<any[]> => {
    try {
        const response = await api.get(`${chatUrl}/${chatId}/history`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Erro ao buscar histórico de mensagens';
            throw new Error(errorMessage);
        } else {
            throw new Error('Erro inesperado ao buscar histórico de mensagens');
        }
    }
};

export const getTodasConversas = async (userId: string | null): Promise<IChatInfo[]> => {
    try {
        const response = await api.get(`${chatUrl}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        });

        return response.data.map((chat: any) => ({
            chatId: chat.chat_id,
            receiverId: chat.receiver_id,
            imagemAnuncio: chat.linked_ad.ad_image,
            tituloAnuncio: chat.linked_ad.ad_title,
            precoAnuncio: `R$ ${chat.linked_ad.ad_price.toFixed(2).replace('.', ',')}`,
            lastMessage: chat.last_message,
            adId: chat.linked_ad.ad_id.toString(),
            horarioUltimaMensagem: chat.timestamp,
            lastMessageSenderId: chat.last_message_sender_id,
            receiverUser: {
                userId: chat.receiver_user.user_id,
                name: chat.receiver_user.name,
                profileImage: chat.receiver_user.profile_image,
            },
            linkedUser: {
                userId: chat.linked_ad.linked_user.user_id,
                isSeller: chat.linked_ad.linked_user.is_seller,
                name: chat.linked_ad.linked_user.name,
                profileImage: chat.linked_ad.linked_user.profile_image,
            },
        }));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Erro ao buscar histórico de mensagens';
            throw new Error(errorMessage);
        } else {
            throw new Error('Erro inesperado ao buscar histórico de mensagens');
        }
    }
};

export const getConversaNova = async (anuncioId: string | null): Promise<IChatInfo> => {
    try {
        const response = await api.get(`${chatUrl}/${anuncioId}/ad/details`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        });

        const linkedAd = response.data.linked_ad;
        const receiver_user = response.data.receiver_user;

        return {
            chatId: uuidv4(), 
            receiverId: linkedAd.linked_user.user_id,
            imagemAnuncio: linkedAd.ad_image,
            tituloAnuncio: linkedAd.ad_title,
            precoAnuncio: `R$ ${linkedAd.ad_price.toFixed(2).replace('.', ',')}`,
            lastMessage: "",
            lastMessageSenderId: "",
            adId: linkedAd.ad_id.toString(),
            horarioUltimaMensagem: "",
            receiverUser: {
                userId: linkedAd.linked_user.user_id,
                name: linkedAd.linked_user.name,
                profileImage: linkedAd.linked_user.profile_image,
            },
            linkedUser: {
                userId: linkedAd.linked_user.user_id,
                isSeller: linkedAd.linked_user.is_seller,
                name: linkedAd.linked_user.name,
                profileImage: linkedAd.linked_user.profile_image,
            },
        };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Erro ao buscar dados da nova mensagem';
            throw new Error(errorMessage);
        } else {
            throw new Error('Erro ao buscar dados da nova mensagem');
        }
    }
};