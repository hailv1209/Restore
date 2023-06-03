import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {  Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import BasketSummary from "./BasketSummary";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsycn, removeBasketItemAsycn } from "./basketSlice";

export default function BasketPage () {
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch()

  

    if(!basket) return <Typography variant="h2">Your Basket is empty.....</Typography> 

    return (
      <>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} >
        <TableHead>
          <TableRow>
            <TableCell align="left">Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display='flex' alignItems='center'>
                    <img src={item.pictureUrl} alt={item.name} style={{height:50 , marginRight:20}}/>
                    <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">${(item.price/100).toFixed(2)}</TableCell>
              <TableCell align="center">
                <LoadingButton 
                    loading={status.includes('pendingAddItem' + item.productId)} 
                    onClick={() => dispatch(addBasketItemAsycn({productId : item.productId}))} 
                    color="secondary">
                  <Add/>
                </LoadingButton>
                {item.quantity}
                <LoadingButton 
                    loading={status.includes('pendingRemoveItem' + item.productId + 'rem')} 
                    onClick={() => dispatch(removeBasketItemAsycn({productId : item.productId, quantity : 1, name : 'rem'}))} 
                    color="error">
                  <Remove/>
                </LoadingButton>
                
                </TableCell>
              <TableCell align="right">${((item.price/100) * item.quantity).toFixed(2)}</TableCell>
              <TableCell align="right">
                <LoadingButton 
                    loading={status.includes('pendingRemoveItem' + item.productId + 'del')} 
                    onClick={() => dispatch(removeBasketItemAsycn({productId : item.productId, quantity : item.quantity, name : 'del'}))} 
                    color="error">
                    <Delete/>
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Grid container>
      <Grid item xs={6}/>
      <Grid item xs={6}>
        <BasketSummary/>
        <Button 
          component={Link}
          to={'/checkout'}
          variant='contained'
          fullWidth
          size="large"
        >
          Checkout
        </Button>
      </Grid>
    </Grid >
      </>
        
    )
}