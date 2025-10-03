"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { joinChatUtils } from '@/lib/roomService';
import useChatContext from '@/context/ChatContext';
import { AxiosError } from 'axios';
import { Tailspin } from 'ldrs/react';
import 'ldrs/react/Tailspin.css';
import CreateChatModal from '@/components/CreateChatRoom';

interface JoinOrCreateDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const JoinOrCreateDialog = ({ isOpen, onClose }: JoinOrCreateDialogProps) => {
    const router = useRouter();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [roomName, setRoomName] = useState<string>("");
    const { setContextRoomId, setConnected } = useChatContext();
    const [loadingAction, setLoadingAction] = useState<'creating' | 'joining' | null>(null);

    function validateInput() { /* ... your validation logic ... */ return true; }

    async function joinChat() {
        if(validateInput()){
            setLoadingAction('joining'); 
            try {
                const response = await joinChatUtils(roomName);
                if(!response) {
                    toast.error("Something went wrong");
                    return;
                };
                setContextRoomId(response.roomId);
                setConnected(true);
                onClose(); // Close this dialog
                router.push(`/chat-room/${response.roomId}`);    
                toast.success("Room joined successfully");
            } catch (err) {
                // ... your error handling ...
            } finally {
                setLoadingAction(null); 
            }
        }
    }

    if (isCreateModalOpen) {
        return <CreateChatModal isOpen={isCreateModalOpen} onClose={() => {
            setIsCreateModalOpen(false);
            onClose(); // Also close the parent dialog
        }} />;
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='flex w-full max-w-[520px] flex-col gap-6  bg-[var(--color-sidebar-primary-bg)] border-none px-6 py-9 text-white'>
                <div className='flex flex-col gap-6 items-center'>
                    <Image src="/icons/chat-room-icon.svg" alt='image' width={72} height={72} />
                </div>
                <DialogTitle className='flex-center font-bold text-2xl'>Join or Create a Room</DialogTitle>
                <div className="flex flex-col items-start gap-1 w-full" >
                    <Input 
                        value={roomName} 
                        onChange={(event) => setRoomName(event.target.value)} 
                        placeholder='Enter Room ID to join' 
                        className='w-full'
                    />
                </div>
                <div className='flex justify-between gap-4'>
                    <Button className="bg-green-600 hover:bg-green-700" 
                        onClick={() => {
                            setRoomName("");
                            setIsCreateModalOpen(true);
                        }}
                        disabled={!!loadingAction}
                    >
                        Create Chat
                    </Button>
                    <Button className="bg-[var(--color-isActive)] hover:bg-[var(--color-isActive-hover)]" 
                        onClick={joinChat}
                        disabled={!!loadingAction || !roomName}
                    >
                        {loadingAction === 'joining' ? <p>Joining...</p> : "Join Chat"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default JoinOrCreateDialog;