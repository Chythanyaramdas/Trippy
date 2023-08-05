import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name:"admin",
    initialState:{
        id:""
    },
    reducers:{
        adminLogin(state,actions){
            const {_id } = actions.payload
            state.id = _id
        },
        adminLogout(state,actions){
            state.id = ""
        }
    }
})

export const {adminLogin,adminLogout} = adminSlice.actions
export default adminSlice.reducer