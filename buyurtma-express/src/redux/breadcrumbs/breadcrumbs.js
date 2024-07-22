import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cotegoty: {},
    subcotegoty: {},
}


const Breadcrumbs = createSlice({
    name: "breadcrumbs",
    initialState,
    reducers: {
        breadcrumbs(state, action) {
            const { cotegoty } = action.payload
            state.cotegoty = cotegoty
        },
        subbreadcrumbs(state, action) {
            state.subcotegoty = action.payload
        }
    },
})

export const { breadcrumbs, subbreadcrumbs } = Breadcrumbs.actions

export default Breadcrumbs.reducer
