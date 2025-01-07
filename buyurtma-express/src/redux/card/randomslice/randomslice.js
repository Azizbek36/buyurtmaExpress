import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cardItem: []
};

const randomSlice = createSlice({
  name: 'array',
  initialState,   
  reducers: {
    shuffle: (state, action) => {
      console.log(action.payload);
      const shuffledArray = [...action.payload]; // Используем данные из action.payload
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Переставляем элементы массива случайным образом
      }
     
      state.cardItem = shuffledArray; // Обновляем массив в состоянии
    },
  },
});

export const { shuffle } = randomSlice.actions;

export default randomSlice.reducer;
