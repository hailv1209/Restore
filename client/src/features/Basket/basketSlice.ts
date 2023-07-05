import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";
import { getCookie } from "../../app/util/util";

interface BasketState {
    basket : Basket | null ,
    status : string
}

const initialState : BasketState = {
    basket : null,
    status : "idle"
}

export const fetchBasketAsync = createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async (_,thunkAPI) => {
        try {
            return await agent.Basket.get();
        } catch (error : any) {
            return thunkAPI.rejectWithValue({error : error.data});
        }
    }, 
    {
        condition : () => {
            if(!getCookie('buyerID')) return false;
        }
    }
)

export const addBasketItemAsycn = createAsyncThunk<Basket, {productId : number, quantity? : number}>(
    'basket/addBasketItemAsycn',
    async ({productId,quantity = 1}, thunkAPI) => {
       try {
        return await agent.Basket.addItem(productId,quantity)
       } catch (error : any) {
           return thunkAPI.rejectWithValue({error : error.data})
       }
    }
)

export const removeBasketItemAsycn = createAsyncThunk<void, {productId : number, quantity : number, name? : string}>(
    'basket/removeBasketItemAsycn',
    async ({productId,quantity }, thunkAPI) => {
        try {
            await agent.Basket.removeItem(productId,quantity)
        } catch (error : any) {
            return thunkAPI.rejectWithValue({error : error.data})
        }
    }
)

export const basketSLice = createSlice ({
    name : 'basket',
    initialState,
    reducers : {
       setBasket : (state,action) => {
            state.basket = action.payload
       },
       clearBasket : (state) => {
        state.basket = null ;
       }
},
    extraReducers: (builder) => {
        //addBasketItem
        builder.addCase(addBasketItemAsycn.pending,(state,action) => {
            console.log(action)
            state.status = "pendingAddItem" + action.meta.arg.productId
        })

        //removeBasketItem 
        builder.addCase(removeBasketItemAsycn.pending,(state, action) => {
            console.log(action)
            state.status = "pendingRemoveItem" + action.meta.arg.productId + action.meta.arg.name
        })
        builder.addCase(removeBasketItemAsycn.fulfilled,(state,action) => {
            const {productId, quantity } = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);
            if( itemIndex === -1 || itemIndex === undefined) return ; 
            state.basket!.items[itemIndex].quantity -= quantity!;
            if(state.basket?.items[itemIndex].quantity === 0) 
                state.basket.items.splice(itemIndex, 1);           
            state.status = "idle"
         
        })
        builder.addCase(removeBasketItemAsycn.rejected,(state,action) => {
            console.log(action.payload)
            state.status = "idle"
        })
        builder.addMatcher(isAnyOf(addBasketItemAsycn.fulfilled, fetchBasketAsync.fulfilled) ,(state,action) => {
            state.status = "idle"
            state.basket = action.payload
        })
        builder.addMatcher(isAnyOf(addBasketItemAsycn.rejected, fetchBasketAsync.rejected) ,(state,action) => {
            console.log(action.payload)
            state.status = "idle"
        })
        
    }
})

export const {setBasket, clearBasket} = basketSLice.actions;