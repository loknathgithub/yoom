import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from "sonner"
import { Textarea } from './ui/textarea'
import DatePicker  from '@/components/DatePicker'
import { scheduler } from 'timers/promises'
import { Input } from './ui/input'

interface MeetingValues {
    dateTime: Date | null
    description: string
    link: string
    scheduledAt: string | null
}

const MeetingTypeList = () => {
    
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting'|'isJoiningMeeting'|'isInstantMeeting'|undefined>()
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState<MeetingValues>({
        dateTime: new Date,
        description:'',
        link:'',
        scheduledAt: null,
    });
    const [callDetails, setCallDetails] = useState<Call>();

    const createMeeting = async () => {
        if(!user || !client) return;

        try {
            if(!values.dateTime){
                console.log(values)
                toast("Please select a date and time");
                return;
            }

            console.log("createMeeting -> using values:", values);
            const id = crypto.randomUUID();
            const call = client.call('default', id);
            if(!call) throw new Error("Failed to create meeting");

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            console.log("createMeeting -> startsAt being sent:", startsAt);
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

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
    
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
            handleClick={() => setMeetingState('isScheduleMeeting')}
            className = 'bg-[#830EF9]'
        />
        
        <HomeCard 
            img='/icons/recordings.svg'
            title='View Recordings'
            description='Meeting recordings'
            handleClick={() => router.push('/recordings')}
            className = 'bg-[#F9A90E]'
        />
        
        {!callDetails ? (
        <MeetingModal
            isOpen={ meetingState === 'isScheduleMeeting'}
            onClose={ ()=> setMeetingState(undefined)}
            title="Create Meeting"
            handleClick={createMeeting}>
        <div className='flex flex-col w-full gap-5'>
                <div className='flex justify-start flex-col gap-2.5 w-full '>
                    
                    <label className='text-base text-normal leading-5 justify-start text-[#ECF0FF] font-normal'>Add a description</label>
                    <Textarea className='border-none bg-[#252A41]' 
                    onChange={(e) => {
                        setValues({...values, description: e.target.value})
                    }}/>
                </div>
                <div className='flex justify-start flex-col gap-2.5 w-full '>
                    <label className='text-base text-normal leading-5 justify-start text-[#ECF0FF] font-normal'>Select Date and Time</label>
                    <DatePicker 
                    value = {values.scheduledAt}
                    onChange={(iso) => {
                            console.log("Parent onChange received:", iso);
                            setValues(prev => ({
                                ...prev,
                                scheduledAt: iso,
                                dateTime: iso ? new Date(iso) : null
                            }))}}/>
                    
                </div>
            </div>
        </MeetingModal>
        ) : (
        <MeetingModal
            isOpen={ meetingState === 'isScheduleMeeting'}
            onClose={ ()=> setMeetingState(undefined)}
            title="Meeting Created"
            className="text-center"
            handleClick={() => {
                navigator.clipboard.writeText(meetingLink);
                toast('Link Copied')
            }}
            image="/icons/checked.svg"
            buttonIcon='/icons/copy.svg'
            buttonText='Copy meeting link'
            />
            )}


        <MeetingModal
            isOpen={ meetingState === 'isInstantMeeting'}
            onClose={ ()=> setMeetingState(undefined)}
            title="Start an Instant Meeting"
            buttonText="Create now"
            className="text-center"
            handleClick={createMeeting}/>


        {/* Join meeting modal */}
        <MeetingModal
            isOpen={ meetingState === 'isJoiningMeeting'}
            onClose={ ()=> setMeetingState(undefined)}
            title="Enter meeting link"
            buttonText="Join now"
            className="text-center"
            handleClick={()=> router.push(values.link)}>
            
            <Input 
            placeholder='Enter meeting link'
            className='border-none bg-[var(--color-primary-bg) hover:bg-[var(--color-sidebar-primary-bg)]'
            onChange={(e) => setValues({...values, link:e.target.value})}/>
        
        </MeetingModal>
    </section>
  )
}

export default MeetingTypeList