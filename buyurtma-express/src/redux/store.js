import { configureStore } from '@reduxjs/toolkit'
import randomSlce from './card/randomslice/randomslice'
import shoping from './shoping/shoping'
import allcard from "./card/card"
import opensubmenu from "./submenu/submenu"
import openburger from './openmenuburger/openburger'
import searchSlice from './search/search'
import infoproduct from './infoproduct/infoproduct'
import breadcrumbs from './breadcrumbs/breadcrumbs'
export const store = configureStore({
    reducer: {
        allcard: allcard,
        randomSlice: randomSlce,
        shoping: shoping,
        opensubmenu: opensubmenu,
        openburger: openburger,
        search: searchSlice,
        infoproduct: infoproduct,
        breadcrumbs: breadcrumbs
    },

})
