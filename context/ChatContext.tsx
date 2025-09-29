"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ChatContextType {
  contextRoomId: string | null;
  setContextRoomId: (id: string | null) => void;
  connected: boolean;
  setConnected: (status: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [contextRoomId, setContextRoomId] = useState<string | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  return (
    <ChatContext.Provider value={{ contextRoomId, setContextRoomId, connected, setConnected }}>
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

export default useChatContext;
