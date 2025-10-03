'use client'

import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from '@/constants/index'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation'

const MobileNav = () => {
    const pathname = usePathname();

  return (
    <section className='w-full max-w-[264px]'>
        <Sheet>
        <SheetTrigger>
          <Image 
            src='/icons/hamburger.svg'
            width={36}
            height={36}
            alt='menu'
            className='cursor-pointer sm:hidden'
          />
        </SheetTrigger>
        <SheetContent side='right' className='border-none bg-[var(--color-sidebar-primary-bg)]'>
            <Link href='/' className='flex gap-1 items-center p-3'>
            <Image src='/icons/logo.svg' alt='Logo' width={30} height={30} className='max-sm:size-14'/>
            <p className='text-[26px] font-extrabold text-white '>Simple Meet</p> 
            {/* max-sm:hidden */}
            </Link>

            <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
              <SheetClose asChild>
                  <section className='flex h-full flex-col gap-6 pt-16 text-white px-2'>
                    {sidebarLinks.map((link) => {
                      const isActive = pathname === link.route //=== '/' ? pathname === '/' : pathname.startsWith(link.route)

                      return(
                        <SheetClose asChild key={link.route}>
                          <Link
                          href={link.route}
                          key={link.label}
                          className={cn('flex gap-2 items-center p-4 rounded-lg w-full max-w-60',
                                          { 'bg-[var(--color-isActive)]': isActive}
                          )}>
                              <Image src={link.imgURL} alt={link.label} width={18} height={18}/>
                              <p className='pl-1 text-lg font-semibold'>{link.label}</p>
                          </Link>
                        </SheetClose>
                          )
                      })}
                  </section>
              </SheetClose>
            </div>
        </SheetContent>
        </Sheet>
    </section>
  )
}

export default MobileNav