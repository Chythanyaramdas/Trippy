import React from'react';
import { useNavigate } from 'react-router-dom';

//==============================dynamic button========================


// function CreateButton({content,path,func,id}){
//     const navigate=useNavigate()
//     return(
//         <div >
//             <button className='bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-2xl '
//             onClick={()=> func(id)}
            
//             >
                
//                   {content}
//             </button>
//         </div>
//     );
// }

// export default CreateButton;

function CreateButton({content,path}) {
    const navigate = useNavigate()
  return (
    <div>
      <button
        className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-2xl absolute right-20  top-10"
        onClick={()=> navigate(path) }
      >
         {content}
      </button>
    </div>
  );
}

export default CreateButton;
