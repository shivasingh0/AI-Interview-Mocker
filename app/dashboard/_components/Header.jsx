'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const Header = () => {

    const pathName = usePathname()

    // useEffect(()=>{

    // },[])

  return (
    <div className='flex py-2 px-8 justify-between items-center bg-secondary shadow-sm'>
        <Image src={"/logo.svg"} width={180} height={100} />
        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-blue-800 cursor-pointer hover:font-bold transition-all ${pathName == '/dashboard' && 'text-blue-800 font-bold'}`}>Dashboard</li>
            <li className={`hover:text-blue-800 cursor-pointer hover:font-bold transition-all ${pathName == '/dashboard/questions' && 'text-blue-800 font-bold'}`}>Questions</li>
            <li className={`hover:text-blue-800 cursor-pointer hover:font-bold transition-all ${pathName == '/dashboard/upgrade' && 'text-blue-800 font-bold'}`}>Upgrade</li>
            <li className={`hover:text-blue-800 cursor-pointer hover:font-bold transition-all ${pathName == '/dashboard/how' && 'text-blue-800 font-bold'}`}>How it works</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header