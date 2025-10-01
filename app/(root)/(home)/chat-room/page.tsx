"use client"
import {usePathname, useRouter} from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { createRoomUtils, joinChatUtils } from '@/lib/roomService';
import useChatContext from '@/context/ChatContext';
import { AxiosError } from 'axios';

interface MeetingValues {
    dateTime: Date | null
    description: string
    link: string
    scheduledAt: string | null
}

const Page = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = React.useState<'isScheduleMeeting'|'isJoiningMeeting'|'isInstantMeeting'|undefined>()
    const [values, setValues] = useState<MeetingValues>({
            dateTime: new Date,
            description:'',
            link:'',
            scheduledAt: null,
        });
    const pathname = usePathname();
    const [roomId, setRoomId] = useState<string>("");
    const { contextRoomId, setContextRoomId, connected, setConnected } = useChatContext();

    function validateInput(){
        if(roomId.trim() === ""){
            toast.error("Room id cannot be empty");
            return false;
        }
        return true;
    }


    async function joinChat(){
        if(validateInput()){
            try {
            const response = await joinChatUtils(roomId);
            if(!response) {
                toast.error("Something went wrong, try again later");
                return;
            };

            console.log("Joined:", response);
            setContextRoomId(response.roomId);
            setConnected(true);
            toast.success("Room joined successfully");
            router.push(`/chat-room/${response.roomId}`);     
            } catch (err) {
            const error = err as AxiosError;
            if(error.status === 404){
                toast.error("Room not found");
            }
            console.error("Error occurred while joining room:", error);
            toast.error("Failed to joining room");
            }
        }
    }

    async function createChat(){
        if(validateInput()){
            try {
            const response = await createRoomUtils(roomId);
            
            if(!response) {
                toast.error("Something went wrong, try using another room id");
                return;
            };
            console.log("Room created:", response);
            setContextRoomId(response.roomId);
            setConnected(true);
            toast.success("Room created successfully");
            router.push(`/chat-room/${response.roomId}`);
            
        } catch (error) {
            console.error("Error occurred while creating room:", error);
            toast.error("Failed to create room");
        }
        }
    }
        
    useEffect(() => {
    if(connected)
        router.push(`/chat-room/${contextRoomId}`);
    }, [connected, contextRoomId, router]);
    
    return (
    <div>
        <Dialog open={true} onOpenChange={() => {router.push('/')}}>
        <DialogContent className='flex w-full max-w-[520px] flex-col gap-6  bg-[var(--color-sidebar-primary-bg)] border-none px-6 py-9 text-white'>
            <div className='flex flex-col gap-6 items-center'>
                <Image src="/icons/chat-room-icon.svg" alt='image' width={72} height={72} className='max-sm:size-18' />
            </div>

            <DialogTitle className='flex-center font-bold text-2xl'>Enter room id</DialogTitle>
            <h1 className='flex-center font-bold text-2xl leading-[42px]'>
                <Input value={roomId} onChange={(event) => setRoomId(event.target.value)} placeholder='Enter room id' name='roomId' type='text'></Input>
            </h1>

            <div className='flex justify-between gap-4'>
            {/* create */}
            <Button className="bg-green-600 hover:bg-green-700 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer text-lg items-center" 
            onClick={() => {
                createChat();
            }}>Create Chat</Button>

            {/* join */}
            <Button className="bg-[var(--color-isActive)] hover:bg-[var(--color-isActive-hover)] focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer text-lg items-center" onClick={() => {
                joinChat();
            }}>Join Chat</Button>

            </div>
        </DialogContent>
        </Dialog>
    </div>
    )
}


export default Page