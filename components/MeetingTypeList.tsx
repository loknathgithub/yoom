import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from "sonner"

const MeetingTypeList = () => {
    
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting'|'isJoiningMeeting'|'isInstantMeeting'|undefined>()
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description:'',
        link:'',
    });
    const [callDetails, setCallDetails] = useState<Call>();


    const createMeeting = async () => {
        if(!user || !client) return;

        try {
            if(!values.dateTime){
                toast("Please select a date and time");
                return;
            }

            const id = crypto.randomUUID();
            const call = client.call('default', id);
            if(!call) throw new Error("Failed to create meeting");

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant Meeting';

            await call.getOrCreate({
                data:{
                    starts_at: startsAt,
                    custom:{
                        description,
                    }
                }
            });

            setCallDetails(call);
            if(!values.description) router.push(`/meeting/${call.id}`);
            toast("Event has been created")

        } catch (error) {
            console.log(error);
            toast.error("Failed to create meeting");}
    }

    const router = useRouter();
    
return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
        <HomeCard 
            img='/icons/add-meeting.svg'
            title='New Meeting'
            description='Setup new meeting'
            handleClick={() => setMeetingState('isInstantMeeting')}
            className = 'bg-[#ff742e]'
        />
        
        <HomeCard 
            img='/icons/join-meeting.svg'
            title='Join Meeting'
            description='via invitation link'
            handleClick={() => setMeetingState('isJoiningMeeting')}
            className = 'bg-[#0E78F9]'
        />
        
        <HomeCard 
            img='/icons/schedule.svg'
            title='Schedule Meeting'
            description='Plan your meeting'
            handleClick={() => setMeetingState('isJoiningMeeting')}
            className = 'bg-[#830EF9]'
        />
        
        <HomeCard 
            img='/icons/recordings.svg'
            title='View Recordings'
            description='Meeting recordings'
            handleClick={() => router.push('/recodings')}
            className = 'bg-[#F9A90E]'
        />
        
        <MeetingModal
            isOpen={ meetingState === 'isInstantMeeting'}
            onClose={ ()=> setMeetingState(undefined)}
            title="Start an Instant Meeting"
            buttonText="Create now"
            className="text-center"
            handleClick={createMeeting}
        />
    </section>
  )
}

export default MeetingTypeList