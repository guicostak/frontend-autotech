export interface ILinkedUser {
    userId: number;
    isSeller: boolean;
    name: string;
    profileImage: string | null;
}

export interface IReceiverUser {
    userId: number;
    name: string;
    profileImage: string | null;
}

export interface IChatInfo {
    chatId: string;
    receiverId: number;
    imagemAnuncio: string;
    tituloAnuncio: string;
    precoAnuncio: string;
    lastMessage: string;
    lastMessageSenderId: string;
    adId: string;
    linkedUser: ILinkedUser; 
    horarioUltimaMensagem: string;
    receiverUser: IReceiverUser;
}
