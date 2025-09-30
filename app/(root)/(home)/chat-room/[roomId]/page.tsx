"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { useParams, useRouter } from 'next/navigation';
import useChatContext from '@/context/ChatContext';
import SockJS from 'sockjs-client';
import { baseUrl } from '@/lib/axiosHelper';
import { CompatClient, Stomp } from "@stomp/stompjs";
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { getMessages } from '@/lib/roomService';

type message = {
    content: string;
    sender: string;
    // email: string;
}

const chatRoom = () => {    
    const { roomId } = useParams<{ roomId: string }>();
    const [input, setInput] = useState("");
    const stompClient = useRef<CompatClient | null>(null);
    const inputRef = useRef(null);
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const { contextRoomId, connected } = useChatContext();
    const [messages, setMessages] = useState<message[]>([]);

    // message init
    useEffect(() => {
        async function loadMessages(){
            const prevMessages = await getMessages(roomId);
            console.log(prevMessages)
            setMessages(prevMessages)
        }

        loadMessages();
    }, [roomId])

    //stomp client init
    useEffect(() => {
        if (!roomId || !isLoaded || !user) {
            return; // Guard against running before everything is ready
        }
        const client = Stomp.over(() => new SockJS(`${baseUrl}/chat`));

        // For production, you might want to disable the verbose console logs
        client.debug = () => {};

        client.connect({}, () => {
            console.log("STOMP connected ✅");
            
            // Assign the client to the ref's current property
            stompClient.current = client;

            // Subscribe to the room
            client.subscribe(`/topic/room/${roomId}`, (message) => {
                const newMessage = JSON.parse(message.body);
                setMessages((prev) => [...prev, newMessage]);
            });
        });

        // Cleanup function
        return () => {
            if (stompClient.current && stompClient.current.connected) {
                console.log("Disconnecting STOMP client...");
                stompClient.current.disconnect();
            }
        };
    }, [roomId, user?.id, isLoaded]);

    // 3. UPDATED sendMessage FUNCTION
    const sendMessage = () => {
        console.log("--- Send Message Clicked ---");

        // 1. Log the state of our checks
        console.log("Is client connected?", stompClient.current?.connected);
        console.log("Is input empty?", `'${input.trim()}'`);
        console.log("Is user loaded?", !!user);

        // 2. The main check to see if we can send
        if (stompClient.current?.connected && input.trim() && user) {
            console.log("✅ Conditions met. About to send message...");

            const message = {
                sender: user.fullName,
                content: input,
                roomId,
            };

            const destination = `/app/sendMessage/${roomId}`;
            console.log("Destination:", destination);
            console.log("Message Body:", JSON.stringify(message));

            // The actual send command
            stompClient.current.send(
                destination,
                {},
                JSON.stringify(message)
            );

            setInput("");
            console.log("--- Message sent successfully ---");
        } else {
            console.log("❌ Conditions not met. Message not sent.");
            console.log("--------------------------");
        }
    };


    useEffect(() => {
    if (chatBoxRef.current) {
        chatBoxRef.current.scroll({
            top: chatBoxRef.current.scrollHeight,
            behavior: "smooth",
        })

    }
    }, [messages]);

    return (
    <>
    <div className='w-full bg-[var(--color-chat-room-nav-bg)]'>
        {/* Navigation Bar */}
        <nav className="w-full  py-3 flex items-center justify-between border-b-[1px] border-b-gray-400 px-4">
        {/* Left side */}
        <div className="font-semibold text-sm xl:text-lg">
            {decodeURIComponent(roomId)}
        </div>

        {/* Right side */}
        <div className="flex gap-4">
            <Button className="bg-[var(--color-isActive)] hover:bg-[var(--color-isActive-hover)] cursor-pointer " onClick={() => {
                router.push(`/chat-room`);
            }}>
                {/* <img src="/icons/chat-add-icon.svg" alt="Join" className='hidden:md hidden:xl' width={14} height={14}/> */}
                <p>Join other room</p>
            </Button>
            <Button className="bg-red-500 hover:bg-red-700 cursor-pointer" onClick={() => {
                router.push('/chat-room');
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
                    <div className={`pl-2 p-2 ${message.sender !== user?.fullName ? 'bg-blue-600' : 'bg-purple-600' } max-w-[60%] xl:max-w-[30%] rounded-lg mx-2 mb-2`}>
                        <div className='flex flex-row gap-2'>
                            <div className='flex flex-col gap-1 mx-1'>
                                <span className='flex flex-row gap-3 justify-between'>
                                <p className='font-bold text-sm text-yellow-400'>{message.sender}</p>
                                {/* <p className='font-normal text-sm text-white'>{message.email}</p> */}
                                <hr />
                                </span>
                                <p className='font-bold text-lg'>{message.content}</p>
                                {/* <p>{message.}</p> */}
                                
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
                    e.preventDefault();
                    sendMessage();
                }
                }}
            />
            <Button className="bg-[var(--color-isActive)] h-[40px] hover:bg-[var(--color-isActive-hover)] cursor-pointer text-lg" 
            value={input}
            onClick={()=>{
                sendMessage();
            }}>
                <Image src="/icons/sendIcon.svg" alt="Send" width={18} height={18} />
            </Button>
        </div>
    </div>
    </>
    )
}

export default chatRoom;