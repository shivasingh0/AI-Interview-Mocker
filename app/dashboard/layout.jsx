import React from 'react'
import Header from './_components/Header'
import { Toaster } from 'sonner'

const DashboardLayout = ({children}) => {
  return (
    <div>
      <Header/>
      <div>
      {children}
      <Toaster />
      </div>
    </div>
  )
}

export default DashboardLayout