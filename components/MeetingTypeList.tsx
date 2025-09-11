import React, { useState } from 'react'
// import Image from 'next/image'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'

const MeetingTypeList = () => {
    
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()

    const router = useRouter();
    
return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
        <HomeCard 
            img='/icons/add-meeting.svg'
            title='New Meeting'
            description='Setup new meeting'
            handleClick={() => setMeetingState('isJoiningMeeting')}
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
        
    </section>
  )
}

export default MeetingTypeList