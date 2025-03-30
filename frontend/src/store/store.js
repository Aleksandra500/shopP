import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import favoriteSlice from "./favoriteSlice";
import loaderSlice from './loaderSlice'
import loginRegisterSLice from './loginRegisterSlice'
import userSlice from './userSlice'
const store = configureStore({
    reducer: {
        categoryStore: categorySlice,
        productStore: productSlice,
        cartStore: cartSlice,
        favoriteStore: favoriteSlice,
        loaderStore: loaderSlice,
        loginRegisterStore: loginRegisterSLice,
        userStore: userSlice
    }
})

export default store;