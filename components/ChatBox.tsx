"use client"
import { useUser } from '@clerk/nextjs';
import React, { useRef, useState } from 'react'

type message = {
    content: string;
    sender: string;
}

const ChatBox = () => {
const [input, setInput] = useState("")
const [stompClient, setStompClient] = useState(null)
const inputRef = useRef(null)
const chatBoxRef = useRef(null)
const { isSignedIn, user, isLoaded } = useUser()
const [messages, setMessages] = useState<message[]>([
    
    {
        content: "Hello, how are you?",
        sender: "Loknath Saha",
    },
    {
        content: "Hello there!",
        sender: "Arkajyoti",
    },
    {
        content: "kal?",
        sender: "Loknath Saha",
    },
    {
        content: "Haa, kal dekhte hobe",
        sender: "Arkajyoti",
    },
    {
        content: "Hello, how are you?",
        sender: "Loknath Saha",
    },
    {
        content: "Hello there!",
        sender: "Arkajyoti",
    },
    {
        content: "kal?",
        sender: "Loknath Saha",
    },
    {
        content: "Haa, kal dekhte hobe",
        sender: "Arkajyoti",
    },
    {
        content: "Hello, how are you?",
        sender: "Loknath Saha",
    },
    {
        content: "Hello there!",
        sender: "Arkajyoti",
    },
    {
        content: "kal?",
        sender: "Loknath Saha",
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
            <div key={index} className={`flex mx-2 ${message.sender === user?.fullName ? 'justify-end' : 'justify-start' }`}>
                <div className={`pl-2 p-2 ${message.sender !== user?.fullName ? 'bg-blue-600' : 'bg-purple-600' } max-w-[60%] xl:max-w-[20%] rounded-lg mx-2 mb-2`}>
                    <div className='flex flex-row gap-2'>
                        <div className='flex flex-col gap-1 mx-1'>
                            <p className='font-bold text-sm text-yellow-400'>{message.sender}</p>
                            <p className='font-bold text-lg'>{message.content}</p>
                        </div>
                    </div>
                </div>
                
            </div>
        ))}

    </div>
</div>
)
}

export default ChatBox