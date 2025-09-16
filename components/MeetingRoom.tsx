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
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'
import Loader from './Loader'



type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const isPersonalRoom = !!useSearchParams().get('personal');
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const router = useRouter();
  const { useCallCallingState } = useCallStateHooks();   // exposing all the call hooks
  const callingState = useCallCallingState();

  if(callingState !== CallingState.JOINED) return <Loader/>

  const CallLayout = () => {
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
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex-center size-full'>
        <div className='flex size-full max-w-[1000px] items-center'>
          <CallLayout />
        </div>

        <div
          className={cn(
            'h-[calc(100vh-86px)] ml-2',
            showParticipants ? 'block' : 'hidden'
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>

      <div className='flex justify-center w-full items-center fixed bottom-0 pb-2 flex-wrap bg-gray-800 rounded-lg'>
        <CallControls onLeave={() => router.push('/')}/>

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