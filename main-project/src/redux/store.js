import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice';
import adminSlice from "./adminSlice";
import staffSlice from "./staffSlice";
import { alertSlice } from "./alertSlice";

export const store = configureStore({ reducer: {
    user:userSlice,
    admin:adminSlice,
    staff:staffSlice,
    alerts: alertSlice.reducer

}})