'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {

    const pathName = usePathname()


  return (
    <div className='flex py-2 px-8 justify-between items-center bg-secondary shadow-sm'>
        <Image src={"/logo.svg"} width={180} height={100} alt='img' />
        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-blue-800 cursor-pointer hover:font-bold transition-all ${pathName == '/dashboard' && 'text-blue-800 font-bold'}`}>
            <Link href={'/dashboard'} >Dashboard</Link>
            </li>
            <li className={`hover:text-blue-800 cursor-pointer hover:font-bold transition-all ${pathName == '/dashboard/questions' && 'text-blue-800 font-bold'}`}>Questions</li>
            <li className={`hover:text-blue-800 cursor-pointer hover:font-bold transition-all ${pathName == '/dashboard/upgrade' && 'text-blue-800 font-bold'}`}>Upgrade</li>
            <li className={`hover:text-blue-800 cursor-pointer hover:font-bold transition-all ${pathName == '/dashboard/how' && 'text-blue-800 font-bold'}`}>How it works</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header