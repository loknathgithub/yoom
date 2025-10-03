"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { createRoomUtils } from '@/lib/roomService';
import useChatContext from '@/context/ChatContext';
import { Tailspin } from 'ldrs/react';
import 'ldrs/react/Tailspin.css';
import MeetingModal from './MeetingModal';

interface CreateChatModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateChatModal = ({isOpen, onClose}: CreateChatModalProps) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [roomName, setRoomName] = useState<string>("");
    const { contextRoomId, setContextRoomId, setConnected } = useChatContext();
    const [loadingAction, setLoadingAction] = useState<'creating' | null>(null);

    function validateInput(){
        if(roomName.trim() === ""){
            toast.error("Room name cannot be empty");
            return false;
        }
        return true;
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
                setContextRoomId(response.roomId);
                setIsModalOpen(true); // Open the next modal
                setConnected(true);
                toast.success("Room created successfully");
            } catch (error) {
                console.error("Error occurred while creating room:", error);
                toast.error("Failed to create room");
            } finally {
                setLoadingAction(null);
            }
        }
    }

    const handleCopyRoomId = () => {
        if (!contextRoomId) return;

        navigator.clipboard.writeText(contextRoomId);
        toast.success("Room ID copied to clipboard!");
        setIsModalOpen(false); // Close the "copy" modal
        onClose(); // Close this "create" modal
        
        // ✨ This is now the only place that navigates for the create flow
        router.push(`/chat-room/${contextRoomId}`); 
    };
    
    return (
        <div>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className='flex w-full max-w-[520px] flex-col gap-6  bg-[var(--color-sidebar-primary-bg)] border-none px-6 py-9 text-white'>
                    <DialogTitle className='flex-center font-bold text-2xl'>Create room</DialogTitle>
                    <div className="flex flex-col items-start gap-1 w-full" >
                        <Input 
                            value={roomName} 
                            onChange={(event) => setRoomName(event.target.value)} 
                            placeholder='Enter a Room Name'
                            name='roomId' 
                            type='text'
                            className='w-full'
                        />
                    </div>
                    <div className='flex justify-center gap-4'>
                        <Button className="bg-green-600 hover:bg-green-700 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer text-lg items-center" 
                            onClick={createChat}
                            disabled={!!loadingAction}
                        >   
                            {loadingAction === 'creating' ? (
                                <div className='flex items-center gap-2'>
                                    <p>Creating</p>
                                    <Tailspin size="14" color="white" />
                                </div>
                            ) : "Create Chat"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <MeetingModal
                isOpen={ isModalOpen }
                onClose={ ()=> setIsModalOpen(false) }
                title="Chat room created"
                buttonText="Copy ID & Join Room"
                className="text-center"
                image="/icons/checked.svg"
                buttonIcon='/icons/copy.svg'
                handleClick={handleCopyRoomId}
            />
        </div>
    )
}

export default CreateChatModal;