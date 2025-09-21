'use client'
import React from 'react'
import { Button } from './ui/button'
import { logOut } from '@/lib/actions/auth'

const SignOut = () => {
    console.log("sign out button clicked")
  return (
    <div className=''>
        <Button className='cursor-pointer bg-red-600 hover:bg-red-700' onClick={() => logOut()}>Sign Out</Button>
    </div>
  )
}

export default SignOut