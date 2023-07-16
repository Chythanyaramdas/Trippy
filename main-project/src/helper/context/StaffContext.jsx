
// saving staff data globally then after register  only dashboard can see 
import {createContext,useState} from 'react'
export const staffContext=createContext(null)
export default function StaffContext({children}){
const[staff,setStaff]=useState('')
const[approved,setApproved]=useState(null)
const[id,setId]=useState('') //staff name nd details
return(
    <staffContext.Provider value={{staff,setStaff,approved,setApproved,id,setId}}>{children}</staffContext.Provider>
    
)

}