import { IChatInfo } from "@/interfaces/IChatInfo";
import { useAppSelector } from "@/store/store";
import { formatarDataHora } from "@/utils/dataUtils";
import { getFirstAndLastName, truncateString } from "@/utils/stringUtils";

interface MessageListProps {
  messages: IChatInfo[];
  onSelectMessage: (id: string) => void;
  selectedMessageId: string;
}

export default function MessageList({
  messages,
  onSelectMessage,
  selectedMessageId,
}: MessageListProps) {
  const { id } = useAppSelector((state) => state.user.userInfo || { id: null });
  return (
    <div className="w-2/4 px-4 border-r border-gray-300">
      <div className="flex flex-col items-start justify-center mb-4 h-32 border-b border-gray-300">
        <h2 className="text-2xl font-thin">Mensagens</h2>
      </div>

      <div className="space-y-4 max-h-[70vh]">
        {messages.map((message) => (
          <div
            key={message.chatId}
            onClick={() => onSelectMessage(message.chatId)}
            className={`flex items-center pr-4 rounded-lg cursor-pointer relative shadow-md transition-all duration-300 ${
              selectedMessageId === message.chatId
                ? "bg-mainColor text-white"
                : "bg-gray-100"
            }`}
          >
            <img
              src={message.imagemAnuncio}
              alt={message.tituloAnuncio}
              className="rounded-lg object-cover h-24 w-24"
            />
            <div className="ml-4">
              <h3 className="text-md">{message.tituloAnuncio}</h3>
              <p className="text-xs mt-3">
              {message.lastMessage ? (
                id == message.lastMessageSenderId ? 
                  "Você:" : 
                  getFirstAndLastName(message.receiverUser.name)+":"
              ) : ""}
              </p>
              <p className="text-xs">{truncateString(message.lastMessage, 35)}</p>
              <p className="text-xs absolute right-2 bottom-2">{message.horarioUltimaMensagem == "" ? "" :
               formatarDataHora(message.horarioUltimaMensagem)}
               </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
