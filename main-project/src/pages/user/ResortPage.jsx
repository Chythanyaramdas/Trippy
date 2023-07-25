import React, { useState,useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import { UserApi } from '../../utils/user/axiosUser';
import ResortPages from'../../components/User/ResortPage';



function ResortPage() {

  const[resort,setResort]=useState([])
  useEffect(()=>{

UserApi.get('/resortpage').then((response)=>{

  if(response.data.status){

    setResort([...response.data.resort])
  }
})

  },[])

  return (
    <div>

<ResortPages data={resort}/>

    </div>
  )
}

export default ResortPage;
