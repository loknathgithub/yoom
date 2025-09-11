import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';

interface HomeCardProps{
    img: string;
    title: string;
    className: string;
    description: string
    handleClick: () => void;
}

const HomeCard = ({img, title, className, description, handleClick}: HomeCardProps) => {
  return (
        <div className={cn('bg-[#ff742e] px-4 py-6 flex flex-col justify-between w-full xl:max-w-full text-lg min-h-[260px] rounded-md cursor-pointer', className)} 
        onClick={() => {handleClick}}>
            <div className='flex-center glass size-12 rounded-md'>
            <Image src={img} alt='Logo' width={30} height={30} className='max-sm:size-18' />
            </div>

            <div>
                <p className='text-2xl font-medium'>{title}</p>
                <p className='text-lg'>{description}</p>
            </div>
        </div>
  )
}

export default HomeCard