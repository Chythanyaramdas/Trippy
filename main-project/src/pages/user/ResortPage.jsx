import React, { useState,useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import { UserApi } from '../../utils/user/axiosUser';
// import ResortPages from'../../components/User/ResortPage';
import Resorters from'../../components/User/Resorters';



function ResortPage() {

  

  return (


    <div>

<Navbar/>


<Resorters/>


    </div>
  )
}

export default ResortPage;
