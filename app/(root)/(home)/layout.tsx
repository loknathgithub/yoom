"use client"
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation';

const HomeLayout = ({ children }: {children: ReactNode}) => {

  const pathname = usePathname();
  const isChatRoom = pathname?.includes('/chat-room');

  return (
    <main className='relative'>
        <Navbar />
        <div className='flex'>
            <Sidebar />
            <section className={`flex flex-1 min-h-screen flex-col ${isChatRoom ? 'w-full pb-3 pt-22 max-md:pb-14 md:px-0 md:pt-16 sm:px-14 xl:pt-16 xl:px-0' : 'px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'}`}>
                <div className='w-full'>
                    { children }
                </div>
            </section>
        </div>
    </main>
  )
}

export default HomeLayout