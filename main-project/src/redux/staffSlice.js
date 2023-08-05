import { createSlice } from "@reduxjs/toolkit";

const INITIAL_VALUES = {
    name:"",
    
    id:""
}

const staffSlice = createSlice({
name:'staff',
initialState:INITIAL_VALUES,
reducers:{
    staffLogin(state,actions){
        const staffDetials = actions.payload
        state.name = staffDetials.name
       
        state.id = staffDetials._id
    },
    staffLogout(state,actions){
        state.name = ""
        
        state.id = ""
    }

}
})

export const {doctorLogin,doctorLogout} = staffSlice.actions
export default staffSlice.reducer