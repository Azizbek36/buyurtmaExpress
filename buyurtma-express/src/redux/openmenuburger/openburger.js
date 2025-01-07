import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menu: false
}

const OpenBureger = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setopenburger(state, action) {
            state.menu = action.payload
            if (state.menu) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        },
        clousmenu(state, action){
            state.menu = action.payload
            document.body.style.overflow = 'auto';
        }
    }
})
export const { setopenburger, clousmenu } = OpenBureger.actions
export default OpenBureger.reducer



