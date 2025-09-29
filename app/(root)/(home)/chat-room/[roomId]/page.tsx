"use client"
import React, { useEffect, useRef, useState } from 'react'
// import page from '../page'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// import ChatBox from '@/components/ChatBox';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';


type message = {
    content: string;
    sender: string;
}


const chatRoom = () => {    
    const [roomId, setRoomId] = useState<string>("Unknown Room");
    const [input, setInput] = useState("");
    const [stompClient, setStompClient] = useState(null);
    const inputRef = useRef(null);
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const { isSignedIn, user, isLoaded } = useUser();
    const router = useRouter();
    
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
    

    useEffect(() => {
    if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
    }, [messages]);

    return (
    <>
    <div className='w-full bg-[var(--color-chat-room-nav-bg)]'>
        {/* Navigation Bar */}
        <nav className="w-full  py-3 flex items-center justify-between border-b-[1px] border-b-gray-400 px-4">
        {/* Left side */}
        <div className="font-semibold text-sm xl:text-lg">
            {roomId}
        </div>

        {/* Right side */}
        <div className="flex gap-4">
            <Button className="bg-[var(--color-isActive)] hover:bg-[var(--color-isActive-hover)] cursor-pointer " onClick={() => {
                router.push(`/chat-room/${roomId}`);
            }}>
                {/* <img src="/icons/chat-add-icon.svg" alt="Join" className='hidden:md hidden:xl' width={14} height={14}/> */}
                <p>Join other room</p>
            </Button>
            <Button className="bg-red-500 hover:bg-red-700 cursor-pointer" onClick={() => {
                router.push('/');
            }}>
                {/* <img src="/icons/subtract-color-icon.svg" alt="Leave" className='hidden:md hidden:xl' width={14} height={14}/> */}
                <p>Leave room</p>
            </Button>
        </div>
        </nav>

        
    <div>
        {/* Chats */}
        <div ref={chatBoxRef} className='w-full p-2 bg-[var(--color-chat-room-primary-bg)] h-[calc(100vh-190px)] overflow-auto'>

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
        
        {/* Inputs */}
        <div className='flex items-end'>
            <Input className="h-[40px] border-none focus-visible:ring-[0px] bg-gray-900 placeholder:text-lg" placeholder="Type a message"
            value={input} 
            onChange={(e) => {
                setInput(e.target.value)}
            }
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault(); // prevent form submit or newline
                    setMessages([...messages, {content: input, sender: user?.fullName || "Unknown User"}]); 
                    setInput("");
                }
                }}
            />
            <Button className="bg-[var(--color-isActive)] h-[40px] hover:bg-[var(--color-isActive-hover)] cursor-pointer text-lg" 
            value={input}
            onClick={()=>{
                setMessages([...messages, {content: input, sender: user?.fullName || "Unknown User"}]); 
                setInput("");
            }}>
                <Image src="/icons/sendIcon.svg" alt="Send" width={18} height={18} />
            </Button>
        </div>
    </div>
    </>
    )
}

export default chatRoom;