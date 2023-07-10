import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Banner from '../../components/BannerClient/Banner';
import Cards from '../../components/Cards/Cards';


const UserHome = () => {
  return (
    <div>

<Navbar/>

<div className='flex-w-full'>

<Banner/>

</div>

<div>

<Cards/>
</div>

</div>
  )
}
export default UserHome;
