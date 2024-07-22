import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    item: [],
    allitem: [],
    rimend: false
}


const OpenSubMenu = createSlice({
    name: "submenu",
    initialState,
    reducers: {
        submenu(state, action) {
            state.item = action.payload.children
            state.allitem = action.payload.subcotegoty
            state.rimend = true
        },
        cloussubmenu(state, action) {
            state.allitem =action.payload
            state.rimend = false
        }
    },
})

export const { submenu, cloussubmenu } = OpenSubMenu.actions

export default OpenSubMenu.reducer
