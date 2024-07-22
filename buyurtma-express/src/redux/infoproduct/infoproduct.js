import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const searchCard = createAsyncThunk(
    "card/searchCard",
    async (id, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;
        try {
            const response = await axios.get("/card.json");
            const selectedCard = response.data.find(card => card.id === id);
            dispatch(addselectedCard([selectedCard]));
            dispatch(changeImg(selectedCard.colorPprduct[0].img))
            dispatch(setActiveImg(selectedCard.colorPprduct[0].colorImg))
            dispatch(changTextColor({ color: selectedCard.sizeStock[0].id, allColor: selectedCard.color }))
            dispatch(changeSize(selectedCard.sizeStock[0]))
            dispatch(chengStock({ number: "Выберите", index: "0" }))
        } catch (error) {
            // В случае ошибки передаем ошибку в обработчик rejectWithValue
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    selectedCard: [],
    objektsize: {},
    imgProduct: {},
    numberSocke: "0",
    sizeName: "Выберите",
    index: "0",
    color: "",
    textcolor: {},
    activeImg: ''
}


const infoProdict = createSlice({
    name: "infoProdict",
    initialState,
    reducers: {
        // передаеом весь обект для нахаодения внутри разеров 
        addselectedCard: (state, actions) => {
            state.selectedCard = actions.payload
        },
        // при нажатий на какойто цвет нахдим того цвета размеры и оставшися товары
        changeSize: (state, actions) => {
            let color = actions.payload.id
            const selectedColor = state.selectedCard[0].sizeStock.find(item => item.id === color);
            state.objektsize = selectedColor[color]
            state.numberSocke = state.objektsize[state.index].stock
        },
        // Изменения главно и то что внизу фото
        changeImg: (state, actions) => {
            state.imgProduct = actions.payload
        },

        // измения остаток товара
        chengStock: (state, actions) => {
            const { number, index } = actions.payload;
            state.numberSocke = state.objektsize[index].stock
            state.sizeName = number
        },
        // Изменения теста цвета
        changTextColor: (state, actions) => {
            let alltextColor = actions.payload.allColor
            let color = actions.payload.color
            const searchColor = alltextColor.filter(item => item.id === color)
            state.textcolor = searchColor

        },
        //ФОТО  которй будет пренесеон в корзину
        setActiveImg: (state, action) => {
            state.activeImg = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchCard.fulfilled, (state, action) => {
            console.log("fulfilled");
        })
        builder.addCase(searchCard.pending, (state, action) => {
            console.log("pending");
        })
        builder.addCase(searchCard.rejected, (state, action) => {
            console.log("rejected");
        })
    },
})

export const { setActiveImg, selectedCard, chengStock, changeSize, addselectedCard, changeImg, changTextColor } = infoProdict.actions

export default infoProdict.reducer
