'use client';
import { useUser } from '@clerk/nextjs';
import React, { use, useState } from 'react'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/Loader';

const Meeting = ({ params }: { params: Promise<{id: string}> }) => {
  const { id } = use(params);
  const { user, isLoaded } = useUser();
  const [isMeetingSetup, setIsMeetingSetup] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  if(!isLoaded || isCallLoading || !call) return <Loader />

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isMeetingSetup ? ( <MeetingSetup setIsMeetingSetup={setIsMeetingSetup}/> ) : ( <MeetingRoom /> )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting