import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    postQuerty: {},
    suggestions: [],
    isOpen: false,
    inputText: ""
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        //прередаеот URL товарай котрый нужно найти
        nameSearchURL: (state, action) => {
                state.postQuerty = action.payload;
            
        },
        // предаеот филтровуную имя товара который похож на тот который вели в search input поиска
        addSearchCards: (state, action) => {
            state.suggestions = action.payload
        },
        // Открывает и защкрывает подсказки внизу input поиска
        setisOpen: (state, action) => {
            state.isOpen = action.payload
        },


    },
});

export const { nameSearchURL, addSearchCards, setisOpen, setInputText } = searchSlice.actions;
export default searchSlice.reducer;
