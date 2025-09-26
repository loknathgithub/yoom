"use client"
import React, { useState } from 'react'
import page from '../page'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ChatBox from '@/components/ChatBox';

const chatRoom = () => {
    
    const [roomId, setRoomId] = useState<string>("Unknown Room");
    return (
    <>
    <div className='w-full bg-[var(--color-chat-room-nav-bg)]'>
        {/* Navigation Bar */}
        <nav className="w-full  py-3 flex items-center justify-between border-b-[1px] border-b-gray-300 px-4">
        {/* Left side */}
        <div className="font-semibold text-sm xl:text-lg">
            {roomId}
        </div>

        {/* Right side */}
        <div className="flex gap-4">
            <Button className="bg-[var(--color-isActive)] hover:bg-[var(--color-isActive-hover)] cursor-pointer">
            Join other room
            </Button>
            <Button className="bg-red-500 hover:bg-red-700 cursor-pointer">
            Leave room
            </Button>
        </div>
        </nav>

        
        <ChatBox />
        
        {/* Inputs */}
        <div className='flex'>
            <Input className="h-[50px] border-none focus-visible:ring-[0px] bg-gray-900 placeholder:text-lg" placeholder="Type a message" />
            <Button className="bg-[var(--color-isActive)] h-[50px] hover:bg-[var(--color-isActive-hover)] cursor-pointer text-lg">Send</Button>
        </div>
    </div>
    </>
    )
}

export default chatRoom;