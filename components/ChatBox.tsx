"use client"
import React, { useState } from 'react'

type message = {
    content: string;
    sender: string;
}

const ChatBox = () => {
const [messages, setMessages] = useState<message[]>([
    
    {
        content: "Hello, how are you?",
        sender: "Loknath",
    },
    {
        content: "Hello there!",
        sender: "Arkajyoti",
    },
    {
        content: "kal?",
        sender: "Loknath",
    },
    {
        content: "Haa, kal dekhte hobe",
        sender: "Arkajyoti",
    },
    {
        content: "Hello, how are you?",
        sender: "Loknath",
    },
    {
        content: "Hello there!",
        sender: "Arkajyoti",
    },
    {
        content: "kal?",
        sender: "Loknath",
    },
    {
        content: "Haa, kal dekhte hobe",
        sender: "Arkajyoti",
    },
    {
        content: "Hello, how are you?",
        sender: "Loknath",
    },
    {
        content: "Hello there!",
        sender: "Arkajyoti",
    },
    {
        content: "kal?",
        sender: "Loknath",
    },
    {
        content: "Haa, kal dekhte hobe",
        sender: "Arkajyoti",
    },
]);

return (
<div>
    {/* Chats */}
    <div className='w-full p-2 bg-[var(--color-chat-room-primary-bg)] h-[calc(100vh-190px)] overflow-auto'>

        {messages.map((message, index)=>(
            <div key={index} className='p-2 bg-blue-600 max-w-[60%] xl:max-w-[20%] rounded-lg mx-2 mb-2'>
                <div className='pl-2'>
                    <div className='flex flex-col gap-1 '>
                    <div className='font-bold text-sm text-yellow-400'>{message.sender}</div>
                    <div className='font-bold text-lg'>{message.content}</div>
                </div>
                </div>
                
            </div>
        ))}

    </div>
</div>
)
}

export default ChatBox