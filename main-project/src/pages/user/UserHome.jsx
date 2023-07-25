import React, {useEffect,useState} from 'react';
import Navbar from '../../components/navbar/navbar';
import Banner from '../../components/BannerClient/Banner';
// import Cards from '../../components/Cards/Cards';
import CardsClient from '../../components/Cards/CardsClient';
import CardsResort from'../../components/Cards/CardsResort';
import {UserApi} from'../../utils/user/axiosUser';





const UserHome = () => {

const[category,setCategory]=useState([])
const[resort,setResort]=useState([])
useEffect(()=>{

  UserApi.get('/').then((response)=>{

    if(response.data.status){

      setCategory([...response.data.category])
      setResort([...response.data.resort])
    }
  })

},[])
  return (
    <div>

<Navbar/>

<div className='flex-w-full'>

<Banner/>

</div>

<div>

  <CardsClient data={category}/>
</div>

<div>

  <CardsResort data={resort}/>

</div>

</div>
  )
}
export default UserHome;
