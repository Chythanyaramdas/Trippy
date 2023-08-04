import {createSlice} from '@reduxjs/toolkit'
const initialState={
    name:'',
    id:'',
    email:'',
    phone:'',
    

}
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
       
        userLogin(state,actions){
            const userDetails=actions.payload
            state.name=userDetails.name
            state.id=userDetails._id
            state.email=userDetails.email
        },
        userLogout(state,actions){
            state.name=""
            state.id=""
            state.email=""
        }
    
    }
})
export const {userLogin,userLogout}=userSlice.actions;
export default userSlice.reducer;