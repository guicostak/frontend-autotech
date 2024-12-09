"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import MessageList from "@/components/MessageList";
import ChatContent from "@/components/ChatContent";
import { IChatInfo } from "@/interfaces/IChatInfo";
import Footer from "@/components/Footer";
import { getConversaNova, getTodasConversas } from "@/services/chatService";
import { useAppSelector } from "@/store/store";
import { useParams, useRouter } from "next/navigation";
import withAuth from "@/common/auth/Hok/withAuth";
import LoadingDots from "@/utils/loading/LoadingDots";

function ConversaChat() {
  const [messagesData, setMessagesData] = useState<IChatInfo[]>([]);
  const [selectedMessageId, setSelectedMessageId] = useState<string>("");
  const { id } = useAppSelector((state) => state.user.userInfo || { id: null });
  const senderId = Number(id);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { idAnuncio } = useParams<{ idAnuncio: string }>();

  const handleUpdateLastMessage = (chatId: string, message: string, time: string) => {
    setMessagesData((prevChatInfos) =>
      prevChatInfos.map((chatInfo) =>
        chatInfo.chatId === chatId
          ? { ...chatInfo, lastMessage: message, horarioUltimaMensagem: time }
          : chatInfo
      )
    );
  };

  useEffect(() => {
    const fetchListaDeConversas = async () => {
      try {
        const listaDeConversas = await getTodasConversas(id);

        const conversaNova = idAnuncio ? await getConversaNova(idAnuncio) : null;
        console.log(conversaNova);
        if(conversaNova?.linkedUser.userId == Number(id)) {
          router.push("/chat")
        } else {
        const conversaExiste = listaDeConversas.some(
          (message) =>
            message.adId === idAnuncio 
        );

        const novaListaDeConversas = conversaNova && !conversaExiste
          ? [...listaDeConversas, conversaNova]
          : listaDeConversas;

        setMessagesData(novaListaDeConversas);

        if (novaListaDeConversas.length > 0) {
          setSelectedMessageId(
            novaListaDeConversas[novaListaDeConversas.length - 1].chatId
          );
        }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Erro ao carregar o histórico de mensagens:", error);
      }
    };

    fetchListaDeConversas();
  }, [idAnuncio, id]);

  const selectedChatInfo = messagesData.find(
    (message) => message.chatId === selectedMessageId
  );
  if(loading) {
    return (
    <div className="mt-24">
      <LoadingDots isLoading={loading}/>
    </div>
    )
  } else {

    return (
      <div className="w-full bg-white flex flex-col min-h-screen">
        <Navbar />
        <div className="flex min-h-screen w-full py-2 mx-auto p-4">
          <div className="flex flex-row bg-white w-full rounded-2xl overflow-hidden">
            <MessageList
              messages={messagesData}
              onSelectMessage={setSelectedMessageId}
              selectedMessageId={selectedMessageId || ""}
            />
            {selectedChatInfo && <ChatContent onUpdateLastMessage={handleUpdateLastMessage} router={router} chatInfo={selectedChatInfo} />}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withAuth(ConversaChat);