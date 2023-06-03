import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/Error/NotFound";
import LoadingComponent from "../../layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {addBasketItemAsycn, removeBasketItemAsycn } from "../Basket/basketSlice";
import { fetchProductAsycn, productsSelector } from "./CatalogSlice";

export default function ProductDetails() {
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const {id} = useParams<{id: string}>();
    const product = useAppSelector(state => productsSelector.selectById(state,id!))
    const [quantity, SetQuantity] = useState(0);
    const item = basket?.items.find(i => i.productId === product?.id);
    const {status : productStatus} = useAppSelector(state => state.catalog)
    
   useEffect(() => {
        if(item) SetQuantity(item.quantity)
     if(!product) dispatch(fetchProductAsycn(parseInt(id!)))
   },[id, item,product,dispatch])
   
   function handleInputChange (event : any) {
        if(event.target.value >= 0) {
            SetQuantity(parseInt(event.target.value));
        }
   }

   function handleUpdateCart () {
        if(!item || quantity > item.quantity ) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsycn({productId : product?.id! , quantity : updatedQuantity}))
        }else {
            const updatedQuantity = item.quantity - quantity ;
            dispatch(removeBasketItemAsycn({productId : product?.id! , quantity : updatedQuantity}))
        }
   }

   if(productStatus.includes('pending')) return <LoadingComponent message="Loading Product...."/>
   if(!product) return <NotFound/>


    return (
       <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width : '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{ mb : 2}} />
                <Typography variant="h4" sx={{ color : 'secondary.main' }}>{product.price}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                 <TableCell>Name</TableCell>
                                 <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                 <TableCell>Descreption</TableCell>
                                 <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                 <TableCell>Brand</TableCell>
                                 <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                 <TableCell>Type</TableCell>
                                 <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                 <TableCell>QuantityInStock</TableCell>
                                 <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                           
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}> 
                        <TextField 
                            onChange={handleInputChange}
                            variant="outlined"
                            type='number'
                            label='Quantity in Cart'
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity}
                            loading={status.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{ height: '55px' }}
                            color='primary'
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>

                    </Grid>
                </Grid>
            </Grid>
       </Grid>
    )
}