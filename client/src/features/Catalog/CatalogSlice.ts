import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { product } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productsAdapter  = createEntityAdapter<product>()

export const fetchProductsAsycn = createAsyncThunk<product[]>(
    'catalog/fetchProductsAsycn',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.list()
        } catch (error : any) {
            return thunkAPI.rejectWithValue({error : error.data})
        }
    }
) 

export const fetchProductAsycn = createAsyncThunk<product, number>(
    'catalog/fetchProductAsycn',
    async (productId,thunkAPI) => {
        try {
            return await agent.Catalog.details(productId)
        } catch (error : any) {
            return thunkAPI.rejectWithValue({error : error.data})
        }
    }
) 

export const catalogSlice = createSlice ({
    name : 'catalog',
    initialState : productsAdapter.getInitialState({
        productsLoaded : false,
        status : 'idle'
    }),
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchProductsAsycn.pending, (state) => {
            state.status = 'pendingFetchProducts'
        });
        builder.addCase(fetchProductsAsycn.fulfilled, (state,action) => {
            productsAdapter.setAll(state,action.payload)
            state.status = 'idle'
            state.productsLoaded = true 
        });
        builder.addCase(fetchProductsAsycn.rejected, (state,action) => {
            console.log(action.payload)
            state.status = 'idle'
        })


        builder.addCase(fetchProductAsycn.pending, (state) => {
            state.status = 'pendingFetchProduct'
        })
        builder.addCase(fetchProductAsycn.fulfilled, (state,action) => {
            productsAdapter.upsertOne(state, action.payload)
            state.status = 'idle'
        })
        builder.addCase(fetchProductAsycn.rejected, (state,action) => {
            console.log(action)
            state.status = 'idle'
        })
    }

})

export const productsSelector = productsAdapter.getSelectors((state : RootState) => state.catalog)