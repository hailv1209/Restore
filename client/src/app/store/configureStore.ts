
import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/Contact/counterSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketSLice } from "../../features/Basket/basketSlice";
import { catalogSlice } from "../../features/Catalog/CatalogSlice";

// export function configureStore () {
//     return createStore(CounterReducer);
// }

export const store = configureStore({
    reducer : {
        counter : counterSlice.reducer,
        basket : basketSLice.reducer,
        catalog : catalogSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;

