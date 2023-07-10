import {createSlice} from '@reduxjs/toolkit'
const initialState={
    name:'',
    id:'',
    email:'',
    phone:'',
    image:'',
    token:''

}
const userSlice=createSlice({
    name:'userz',
    initialState,
    reducers:{
        setUserDetails:(state,action)=>{
            state.id=action.payload.id;
            state.name=action.payload.name;
            state.email=action.payload.email;
            state.phone=action.payload.phone;
            // state.image=action.payload.image;
            state.token=action.payload.token;
        },
        userlogin:(state,action)=>{
            // console.log(action.payload,"mmmmm")
            state.value={...action.payload,
            isUserAuth:true}
        },
        userlogout:(state)=>{
            state.value={
                isUserAuth:false,
                userz:null
            }
        }
    
    }
})
export const {setUserDetails,userlogin,userlogout}=userSlice.actions;
export default userSlice.reducer;