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
import { Tailspin } from 'ldrs/react'
import 'ldrs/react/Tailspin.css'

interface MeetingValues {
    dateTime: Date | null
    description: string
    link: string
    scheduledAt: string | null
}

const Page = () => {
    const router = useRouter();
    // const [meetingState, setMeetingState] = React.useState<'isScheduleMeeting'|'isJoiningMeeting'|'isInstantMeeting'|undefined>()
    // const [values, setValues] = useState<MeetingValues>({
    //         dateTime: new Date,
    //         description:'',
    //         link:'',
    //         scheduledAt: null,
    //     });
    // const pathname = usePathname();

    const [isChatJoinOrCreate, setIsChatJoinOrCreate] = useState<boolean>(false);
    // const [roomId, setRoomId] = useState<string>("");
    const [roomName, setRoomName] = useState<string>("");
    const { contextRoomId, setContextRoomId, connected, setConnected } = useChatContext();
    const [loadingAction, setLoadingAction] = useState<'creating' | 'joining' | null>(null);

    function validateInput(){
        if(roomName.trim() === ""){
            toast.error("Room id cannot be empty");
            return false;
        }
        return true;
    }


    async function joinChat(){
        console.log("Join Chat clicked")
        setLoadingAction('joining'); 
        if(validateInput()){
            try {
            const response = await joinChatUtils(roomName);
            if(!response) {
                toast.error("Something went wrong, try again later");
                return;
            };

            console.log("Joined:", response);
            setContextRoomId(response.roomId);
            setConnected(true);
            router.push(`/chat-room/${response.roomId}`);     
            toast.success("Room joined successfully");
            console.log("room id ",response.roomId)
            } catch (err) {
            const error = err as AxiosError;
            if(error.response?.status === 404){
                toast.error("Room not found");
            }else{
                toast.error("Failed to joining room");
            }
            console.error("Error occurred while joining room:", error);
            }finally {
            // no matter what happens in try/catch, finally block executes definitely
            setLoadingAction(null); 
            }
        }else{
            setLoadingAction(null);
        }        
        
    }

    async function createChat(){
        setLoadingAction('creating');
        if(validateInput()){
            try {
            const response = await createRoomUtils(roomName);
            
            if(!response) {
                toast.error("Something went wrong, try using another room name");
                return;
            };
            console.log("Room created:", response);
            setContextRoomId(response.roomId);
            setConnected(true);
            toast.success("Room created successfully");
            setIsChatJoinOrCreate(false)
            router.push(`/chat-room/${response.roomId}`);
            
        } catch (error) {
            console.error("Error occurred while creating room:", error);
            setIsChatJoinOrCreate(false)
            toast.error("Failed to create room");
        }finally {
        // no matter what happens in try/catch, finally block executes definitely
        setLoadingAction(null);
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

            <div>
                
            </div>
            <DialogTitle className='flex-center font-bold text-2xl'>Join or Create room</DialogTitle>
            <div className="flex flex-col items-start gap-1 w-full" >
                <h1 className='font-bold text-2xl w-full'>
                    <Input 
                    value={roomName} 
                    onChange={(event) => setRoomName(event.target.value)} 
                    placeholder='Room name or ID' 
                    name='roomId' 
                    type='text'
                    className='w-full'
                    />
                </h1> 
                
                {/* Changed to a <p> tag for better semantics */}
                <p className='text-sm text-gray-500'>
                    **Enter a room name to create or a room ID to join.
                </p>
                </div>
            <div className='flex justify-between gap-4'>
            {/* create */}
            <Button className="bg-green-600 hover:bg-green-700 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer text-lg items-center" 
            onClick={() => {
                createChat();
            }}
            disabled={!!loadingAction}
            >  
                {loadingAction === 'creating' ? (
                    <div className='flex items-center gap-2'>
                        <p>Creating</p>
                        <Tailspin
                        size="14"
                        stroke="4"
                        speed="0.9"
                        color="white" 
                />
                    </div>
                ) : "Create Chat"}
                
            </Button>

            {/* join */}
            <Button className="bg-[var(--color-isActive)] hover:bg-[var(--color-isActive-hover)] focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer text-lg items-center" onClick={() => {
                joinChat();
            }}
            disabled={!!loadingAction}>
                {loadingAction === 'joining' ? (
                    <div className='flex items-center gap-2'>
                        <p>Joining</p>
                        <Tailspin
                        size="14"
                        stroke="4"
                        speed="0.9"
                        color="white" 
                        />
                    </div>
                ) : "Join Chat"}
            </Button>

            </div>
        </DialogContent>
        </Dialog>
    </div>
    )
}


export default Page