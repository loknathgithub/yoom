'use client'

import React from 'react'
import { sidebarLinks } from '@/constants/index'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';


const Sidebar = () => {
    const pathname = usePathname();

  return (
    <>
      <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[var(--color-sidebar-primary-bg)] p-6 pt-28 md:pt-30 text-white max-sm:hidden lg:w-[264px]'>

        <div className='flex flex-1 flex-col gap-6'>         
            {sidebarLinks.map((link) => {
                const isActive = pathname === link.route

                return(
                    <Link
                    href={link.route}
                    key={link.label}
                    className={cn('flex gap-2 items-center p-4 rounded-lg justify-start',
                                    { 'bg-[var(--color-isActive)]': isActive}
                    )}>
                        <Image src={link.imgURL} alt={link.label} width={21} height={21}/>
                        <p className='pl-1 text-lg font-semibold max-lg:hidden'>{link.label}</p>
                    </Link>
                )
            })}
        </div>
      </section>
    </>
  )
}

export default Sidebar