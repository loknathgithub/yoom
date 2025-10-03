import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
      <nav className='flex-between fixed z-50 w-full bg-[var(--color-sidebar-primary-bg)] px-6 py-4 lg:px-10'>
        <Link href='/' className='flex gap-1 items-center'>
          <Image src='/icons/logo.svg' alt='Yoom' width={30} height={30} className='max-sm:size-12 min-xl:size-9'/>
          <p className='text-[26px] font-extrabold text-white max-sm:hidden'>Simple Meet</p>
        </Link>

        <div className='flex-between justify-center items-center gap-2'>
            <SignedIn>
              <UserButton />
            </SignedIn>
            
        <MobileNav />
        </div>

      </nav>
  )
}

export default Navbar