'use client';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import React from 'react'
import Image from 'next/image';
import { toast } from 'sonner';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
const Table = ({ title, description }: { title: string; description: string; }) => {
  return(
  <div className='flex flex-col items-start gap-2 xl:flex-row'>
    <h1 className='text-base font-medium lg:text-xl xl:min-w-32 text-gray-400'>{ title }: </h1>
    <h1 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl'>{ description }</h1>
  </div>
  )
}

const PersonalRoom  = () => {
  const { data: session} = useSession();
  const meetingId = session?.user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`
  const { call } = useGetCallById(meetingId!);
  const  client  = useStreamVideoClient();
  const router = useRouter();

  const startRoom = async () => {
    if(!client || !session?.user) return;

    if(!call){
      const newCall = client.call('default', meetingId!)
      
      await newCall.getOrCreate({
        data:{
          starts_at: new Date().toISOString(),
        }
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`)
  }
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Personal Room</h1>

      <div className='flex flex-col w-full gap-8 xl:max-w-[900px]'>
        <Table title='Topic' description={`${session?.user?.name || session?.user?.email}'s Meeting Room`} />
        <Table title='Invite Link' description={`${meetingLink}`} />
        <Table title='Meeting ID' description={`${meetingId!}`}/>
      </div>
      <div className='flex gap-2'>
        <Button className='bg-[var(--color-isActive)] hover:bg-[var(--color-isActive-hover)] cursor-pointer' onClick={startRoom}>
        Start Meeting  
        </Button>

        <Button
            onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast("Link Copied");
            }}
            className="justify-center rounded-lg bg-[var(--button-background)] hover:bg-[var(--button-background-hover)] p-4 cursor-pointer"
        >
          <Image
          src="/icons/copy.svg"
          alt="feature"
          width={16}
          height={16}
          />
          Copy invite link</Button>
      </div>

      <hr />
      <div>
      <Button className='bg-[var(--color-isActive)] hover:bg-[var(--color-isActive-hover)] cursor-pointer' onClick={startRoom}>
        <Image
          src="/icons/add-meeting.svg"
          alt="feature"
          width={12}
          height={12}
          />
        Create a new room
      </Button>
      </div>
    </section>
  )
}

export default PersonalRoom 