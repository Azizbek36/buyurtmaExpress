import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchSecond = createAsyncThunk(
    "card/fetchSecond",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.get("/card.json");

            dispatch(allcards(response.data)) // Возвращаем только данные из ответа
        } catch (error) {
            // В случае ошибки передаем ошибку в обработчик rejectWithValue
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    cardItem: [],
};

const allcard = createSlice({
    name: "card",
    initialState,
    reducers: {
        allcards: (state, action) => {
            state.cardItem = action.payload;
        },
        // choosecategory: (state, action) => { 
        //    state.chooscard.itmsCards.cardItms = state.cardItem.itmsCards.cardItms.filter((el) => el.nameSearch === action.payload.id)
        //    console.log(state.chooscard);
        // },
        // allreturn: (state)=>{
        //  state.chooscard = state.cardItem
        // }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchSecond.fulfilled, (state, action) => {
        })
        builder.addCase(fetchSecond.pending, (state, action) => {
        })
        builder.addCase(fetchSecond.rejected, (state, action) => {
        })
    },
});

export const { allcards } = allcard.actions;
export default allcard.reducer