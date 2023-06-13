import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ProductParams, product } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { MetaData } from "../../app/models/pagination";


interface CatalogState {
    productsLoaded : boolean;
    filtersLoaded : boolean ;
    status : string;
    brands : string[];
    types : string[];
    productParams : ProductParams;
    metaData : MetaData | null;
}

const productsAdapter  = createEntityAdapter<product>()

function getAxiosParams(productParams : ProductParams) {
    const params =new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy);
    if(productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
    if(productParams.brands.length > 0) params.append('brands', productParams.brands.toString());
    if(productParams.types.length > 0) params.append('types', productParams.types.toString());
    return params ;

}

export const fetchProductsAsycn = createAsyncThunk<product[], void, {state : RootState}>(
    'catalog/fetchProductsAsycn',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
        try {
            const response =  await agent.Catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
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

export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async (_,thunkAPI) => {
        try {
            return agent.Catalog.fetchFilteras();
        } catch (error : any) {
            return thunkAPI.rejectWithValue({error : error.data})
        }
    }
)

function initParams() {
    return {
        pageNumber : 1,
        pageSize : 6,
        orderBy : 'name',
        brands : [],
        types : []
    }
}

export const catalogSlice = createSlice ({
    name : 'catalog',
    initialState : productsAdapter.getInitialState<CatalogState>({
        productsLoaded : false,
        filtersLoaded : false,
        status : 'idle',
        brands : [],
        types : [],
        productParams : initParams(),
        metaData : null
    }),
    reducers : {
        setProductParams : (state , action ) => {
            state.productsLoaded = false ;
            state.productParams = {...state.productParams, ...action.payload, pageNumber : 1};
        },
        setPageNumber : (state, action) => {
            state.productsLoaded = false ;
            state.productParams = {...state.productParams, ...action.payload};
        },
        setMetaData : (state,action) => {
            state.metaData = action.payload
        },
        resetProductParams : (state) => {
            state.productParams = initParams();
        }
    },
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

        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters'
        })
        builder.addCase(fetchFilters.fulfilled, (state,action) => {
            state.brands = action.payload.brands
            state.types = action.payload.types
            state.filtersLoaded = true 
            state.status = 'idle'
        })
        builder.addCase(fetchFilters.rejected, (state,action) => {
            state.status = 'idle'
            console.log(action.payload)
        })
    }

})

export const productsSelector = productsAdapter.getSelectors((state : RootState) => state.catalog);

export const {setProductParams, resetProductParams, setMetaData, setPageNumber} = catalogSlice.actions;