import React from "react";

interface MessageProps {
  content: string;
  senderId: number;
  currentUserId: number;
}

const Mensagem: React.FC<MessageProps> = ({ content, senderId, currentUserId }) => {
  const isSender = senderId === currentUserId;

  return (
    <div
      className={`flex mb-2 ${isSender ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`rounded-t-3xl break-words max-w-sm px-6 py-3 ${
          isSender
            ? "bg-mainColor text-white rounded-bl-3xl"
            : "bg-gray-200 text-gray-800 rounded-br-3xl"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Mensagem;
