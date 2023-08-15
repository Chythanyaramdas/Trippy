import { createSlice } from "@reduxjs/toolkit";

const INITIAL_VALUES = {
    name:"",
    
    _id:"",
    notification:[{}]
}

const staffSlice = createSlice({
name:'staff',
initialState:INITIAL_VALUES,
reducers:{
    staffLogin(state,actions){
        const staffDetials = actions.payload
        state.name = staffDetials.name
        state.notification=staffDetials.notification
        state._id = staffDetials._id
    },
    staffLogout(state,actions){
        state.name = ""
        
        state._id = ""
    }

}
})

export const {staffLogin,staffLogout} = staffSlice.actions
export default staffSlice.reducer