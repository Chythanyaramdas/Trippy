import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from "react-router-dom";
import { UserApi } from "../../utils/user/axiosUser";
import Navbar from '../../components/navbar/navbar';
import Footer from"../Footer/UserFooter";
function CategoryPage() {
  // correct

    const { id } = useParams();
    const server_url = process.env.REACT_APP_BASE_URL;
    const navigate=useNavigate()
    const[category,setCategory]=useState([{}]);

    useEffect(()=>{

        if(id){

            console.log("categoryPage single");
            UserApi.get(`/categoryPage/${id}`).then((response)=>{

                if(response.data.status){

                    console.log("cat");

                    console.log(response.data.category);

                    setCategory([...response.data.category])
                }
            })
        }

    },[id])
  return (
    <div>

        <div>
        <Navbar/>
        </div>
        <div className='flex justify-center'>
        <p className='text-2xl font-serif'>Choose Your Stay</p>

       
        </div>

<div  className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-20 mt-10 overflow-x-scroll  ">

{category?.map((data)=>{

      return(
        
  
  <div className=" rounded-lg shadow-2xl overflow-hidden  text-center">
    
    <div className="h-72">
      <img
        src={server_url + "images/" + data.image}
        alt=""
        className="h-full w-full "
      />
    </div>
    <div className="p-2">
      <p className="mt-3">{data.name}</p>
      <button className="mt-2  bg-green-400" onClick={()=>navigate(`/resort/${data._id}`)}>Book Now</button>
    </div>
  </div>

  

      );

})}

</div>

<div  className="mt-64">
    <Footer/>
</div>
      
    </div>
  )
}

export default CategoryPage
