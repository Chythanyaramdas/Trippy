import React, { useEffect, useState } from 'react'
import CreateButton from '../Button/Button';
import { AdminApi } from '../../utils/admin/adminApi';
import Card from'../Cards/Cards';

function Categorey(){
    const updatePath='/admin/categoreyUpload'
    const[data,setData]= useState([])

    useEffect(()=>{
        AdminApi.get('/categoryManagement').then((response)=>{
            console.log('hello');
            if(response.data.status){
                console.log('hello');
                console.log(response.data.categorey)
                setData(response.data.Categorys)
            }
        })
    },[])

return (
<div>
         <div className="flex flex-col h-full bg-sky-50 w-full relative">
      
      <CreateButton  content='resort' path='/admin/categoreyUpload'/>
      <div className="mt-36 mx-20 flex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
       {
        data.length > 0 ?  data.map((data,index)=> <Card key={index} data={data} updatePath={updatePath}  /> )   : <p>No content</p>
       }
      </div>
      

      </div>
    </div>
  )
}
export default Categorey;

