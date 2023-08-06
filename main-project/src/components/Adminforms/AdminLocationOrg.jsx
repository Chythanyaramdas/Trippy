
import React ,{useState} from 'react'
import { AdminApi }from "../../utils/admin/adminApi";

 const AdminLocation = () => {
    const[district,setDistrict]=useState('')
    const [image, setImage] = useState("");
    const [fields, setFields] = useState([{  }]);
    const [banner,setBanner] = React.useState(false)

    

    const addMoreField = () => {
        // console.log(fields);
      setFields([...fields, { }]);
    };

    const bannerSetting=(e)=>{
      setImage(e.target.files[0])
      setBanner(true) 
  }
  
    const handleInputChange = (index, e) => {
    
      const { name, value } = e.target;
      
      const updatedFields = [...fields];
      
      updatedFields[index][name] = value;
         
      setFields(updatedFields);
    };
  
    // const handleSubmit = (e) => {
    //   e.preventDefault();
     

    // AdminApi.post('/addLocation',{district:district,fields:fields}).then((response)=>{
    //     if(response.data.status==200){
    //         console.log('success');
    //     }
        
    // })
    // }


    const handleSubmit = (e) => {
      e.preventDefault();
     
      console.log(fields);
      AdminApi.post('/addLocation', {
        district,
        places:fields,
        image
      }).then((response) => {
        if (response.data.status === 200) {
          console.log('success');
        }
      });
    };
  
    return (
    

<div className="card mt-0 flex justify-center ">
  <div className="card-header flex justify-center items-center">
    <h5 className="text-xl font-semibold">Add Location</h5>
  </div>
  <div className="card-body">
    <form id="product_form" onSubmit={handleSubmit}>
      <div className="mb-4 ">
        <label className="block font-semibold">District</label>
        <input type="text" className="form-input w-60" placeholder="Enter district" value={district} onChange={(e)=>setDistrict(e.target.value)}  />
      </div>
      <input type="file" name="image" className='p-2 mt-4 w-60'  onChange={(e)=> setImage(e.target.files[0])} />
            <img className='w-96 p-2 mt-4' src={image?URL.createObjectURL(image):""} alt=""  />
      
      {fields.map((field, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-wrap -mx-2">
            <div className="w-fit px-2">
              <div className="mb-4">
                {/* <p>{field.productName}</p> */}
                <label className="block font-semibold">Place</label>
                <input

                
                  type="text"
                  name={`place`}
                  className="form-input w-60"
                  placeholder="place"
                  value={field.place}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
            </div>
            <div className="w-full px-2">
              <div className="mb-4 w-60">
                <label className="block font-semibold">Pincode</label>
                <input
                  type="number"
                  name={`pinCode`}
                  className="form-input w-60"
                  placeholder="pincode"
                  value={field.pincode}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
      <button
        className="bg-gray-800 text-white py-2 px-4 rounded float-right mt-2"
        type="button"
        onClick={addMoreField}
      >
        Add more +
      </button>
      <button className="bg-blue-500 text-white py-2 px-4 rounded mt-3" type="submit">
        Submit
      </button>
    </form>
  </div>
</div>



    );

 }

 export default AdminLocation;