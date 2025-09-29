'use client'
import CallList from '@/components/CallList';
import MeetingTypeList from '@/components/MeetingTypeList';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Home = () => {

  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(()=>{

    const updateDateTime = () =>{
      setCurrentDate(new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long', 
        year: 'numeric'
      }));
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      }));
    }

  updateDateTime();
  const interval = setInterval(updateDateTime, 1000);

  return () => clearInterval(interval);

  }, [])

  return (
    <section className='flex size-full flex-col gap-10 text-white'>

      {/* banner */}
      <div className='h-[800px] w-full rounded-[20px] bg-hero bg-cover bg-center'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glass max-w-[270px] text-center text-base py-1'>Upcoming Meeting at: 12:30</h2>

          <div>
            <h1 className='text-6xl font-bold md:text-5xl lg:text-7xl'>{currentTime}</h1>
            <p className='text-xl font-normal lg:text-2xl text-gray-400 gap-2'>{currentDate}</p>
          </div>
        </div>
      </div>



      <MeetingTypeList />

      <section className="flex size-full flex-col gap-10 text-white pt-6">
      <h1 className="text-3xl font-bold">Upcoming Meetings</h1>

      <CallList type="upcoming" />
    </section>
    </section>
  )
}

export default Home