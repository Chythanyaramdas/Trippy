import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const navigate = useNavigate()
  return (
    <div className='w-full h-full flex justify-center items-center flex-col font-serif' >
      <p className='text-lg' >Please complete Registeration  for Resort </p>
      <p className='text-sky-700 underline cursor-pointer' onClick={()=> navigate('/staff/resortRegister')} >Click here </p>
    </div>
  )
}

export default Dashboard;
