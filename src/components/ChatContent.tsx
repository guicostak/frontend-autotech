import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "@/store/store";
import { IChatInfo } from "@/interfaces/IChatInfo";
import Botao from "./Botao";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { getHistoricoDeMensagens } from "@/services/chatService";
import Mensagem from "./Mensagem";
import { getFirstAndLastName } from "@/utils/stringUtils";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Message {
  content: string;
  chatId: string;
  senderId: number;
  receiverId: number;
  adId: number;
}

interface ChatWebSocketProps {
  chatInfo: IChatInfo;
  router: AppRouterInstance;
  onUpdateLastMessage: (chatId: string, message: string, time: string) => void;
}

export default function ChatWebSocket({ chatInfo, router, onUpdateLastMessage }: ChatWebSocketProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const socketRef = useRef<WebSocket | null>(null);
  const { id } = useAppSelector((state) => state.user.userInfo || { id: null });
  const senderId = Number(id);

  const isSocketConnected = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const initializeWebSocket = () => {
    if (socketRef.current) {
      socketRef.current.close();
    }

    const socket = new WebSocket("ws://localhost:8080/chat-websocket");
    socketRef.current = socket;
    console.log("ChatId ao inicializar webSocket:" + chatInfo.chatId);

    socket.onopen = () => {
      console.log("WebSocket conectado");
      socket.send(JSON.stringify({ chatId: chatInfo.chatId }));
      isSocketConnected.current = true;
    };

    socket.onclose = (event) => {
      console.log("WebSocket desconectado", event);
      isSocketConnected.current = false;
    };

    socket.onerror = (error) => {
      console.error("Erro no WebSocket", error);
      isSocketConnected.current = false;
    };

    socket.addEventListener("message", (event) => {
      const message: any = JSON.parse(event.data);
      console.log("Evento no frontend chegando: ", event);
      setMessages((prevMessages) => {
        if (message.content?.trim()) {
          return [...prevMessages, message];
        }
        return prevMessages;
      });
      const currentTime = new Date().toISOString();
      onUpdateLastMessage(chatInfo.chatId, message.content, currentTime);
    });
  };

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const historico = await getHistoricoDeMensagens(chatInfo.chatId);
        setMessages(historico);
      } catch (error) {
        console.error("Erro ao carregar o histórico de mensagens:", error);
      }
    };

    fetchHistorico();
    initializeWebSocket();

    return () => {
      if (socketRef.current) {
        console.log("Fechando WebSocket");
        socketRef.current.close();
      }
    };
  }, [chatInfo.chatId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "instant",
        block: "end",
      });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() && socketRef.current?.readyState === WebSocket.OPEN) {
      const message: Message = {
        content: input,
        chatId: chatInfo.chatId,
        senderId,
        receiverId: chatInfo.receiverId,
        adId: Number(chatInfo.adId),
      };
      socketRef.current?.send(JSON.stringify(message));
      setInput("");
      const currentTime = new Date().toISOString();
      onUpdateLastMessage(chatInfo.chatId, input, currentTime);
    } else {
      console.log("WebSocket não está aberto para enviar a mensagem");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    console.log(chatInfo);
    console.log(id);  
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);
  return (
    <div className="w-full items-end justify-end px-6 min-h-screen pb-4 border-r">
      <div className="flex items-center justify-between h-32 mb-2 p-4 border-b border-gray-300">
        <div className="flex items-center">
          <img
            src={chatInfo.imagemAnuncio}
            alt={chatInfo.tituloAnuncio}
            className="rounded-lg object-cover w-24 h-24"
          />
          <div className="ml-4">
            <span className="text-red-500 text-xs">Denunciar anúncio</span>
            <h3 className="text-lg font-thin">{chatInfo.tituloAnuncio}</h3>
            <p className="text-xl font-bold text-gray-700">
              {chatInfo.precoAnuncio}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          {chatInfo.receiverUser.profileImage ? (
            <img
              src={
                typeof chatInfo.receiverUser.profileImage === "string"
                  ? chatInfo.receiverUser.profileImage
                  : URL.createObjectURL(chatInfo.receiverUser.profileImage)
              }
              alt="Profile"
              className="rounded-full w-[4rem] h-[4rem] object-cover"
              style={{ cursor: "pointer" }}
            />
          ) : (
            <FontAwesomeIcon
              className="text-mainColor text-6xl"
              icon={faUserCircle}
            />
          )}
          <p className="mt-1">
            {getFirstAndLastName(chatInfo.receiverUser.name)}
          </p>
      

        </div>
      </div>

      <div className="flex flex-col w-full h-[65vh]">
      <div className="overflow-scroll min-h-[55vh] mb-4 py-4 essa div" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
      {messages.map((msg, index) => (
            <Mensagem
              key={index}
              content={msg.content}
              senderId={msg.senderId}
              currentUserId={senderId}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex flex-row pt-4 px-6 border-t border-gray-300 items-center justify-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Digite sua mensagem"
            className="w-full p-2 mr-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          <Botao
            onClick={handleSendMessage}
            className="px-4 bg-mainColor text-white rounded-r-lg"
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </Botao>
        </div>
      </div>
    </div>
  );
}
