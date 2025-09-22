import { cn } from '@/lib/utils'
import { CallControls, CallingState, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import { CallParticipantsList } from '@stream-io/video-react-sdk'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'
import Loader from './Loader'
import { useIsMobile } from '@/hooks/useIsMobile'



type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const isPersonalRoom = !!useSearchParams().get('personal');
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const router = useRouter();
  const { useCallCallingState } = useCallStateHooks();   // exposing all the call hooks
  const callingState = useCallCallingState();
  const isMobile = useIsMobile();

  if(callingState !== CallingState.JOINED) return <Loader/>

  const CallLayout = () => {
    if(isMobile) return <SpeakerLayout participantsBarPosition='bottom' />;

    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition='right' />
      default:
        return <SpeakerLayout participantsBarPosition='left' />
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="flex size-full h-[calc(100vh-86px)] items-center justify-center gap-2">
          <div
            className={cn(
              "transition-all duration-300",
              showParticipants ? "w-[75%]" : "w-[93%]"
            )}
          >
            <CallLayout />
          </div>

          {/* Participants Panel */}
          {showParticipants && (
            <div className="w-[25%] h-full overflow-y-auto">
              <CallParticipantsList onClose={() => setShowParticipants(false)} />
            </div>
          )}

      <div className='fixed bottom-0 flex w-full items-center justify-center gap-2 bg-gray-800 flex-wrap'>
        <CallControls onLeave={() => router.push('/')}/>

      { !isMobile && (
        <DropdownMenu>

        <div className='flex items-center'>
        <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] gap-2 mx-4'>
          <LayoutList size={20} className='text-white'/>
        </DropdownMenuTrigger>
        </div>
        
        <DropdownMenuContent className='border-[var(--color-primary-bg)] bg-[var(--color-primary-bg)] text-white p-1'>
          {['Grid', 'Speaker-left', 'Speaker-right'].map((items, index) => (
            <div key={index}>
              <DropdownMenuItem className='cursor-pointer'
              onClick={()=>{
                setLayout(items.toLowerCase() as CallLayoutType)
              }}>
                {items}
              </DropdownMenuItem>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      )}
      <CallStatsButton />

      <Button onClick={() => setShowParticipants((prev)=> !prev)} className='bg-gray-800 hover:bg-gray-800' >
          <div className='cursor-pointer rounded-3xl bg-[#19232d] px-5 py-3 hover:bg-[#4c535b]'>
            <Users size={20} className='text-white'/>
          </div>  
      </Button>

      {!isPersonalRoom && <EndCallButton />}
      
      </div>
      </div>

    </section>
  )
}

export default MeetingRoom