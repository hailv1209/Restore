import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import NotFound from "../../app/Error/NotFound";
import { useStoreContext } from "../../context/StoreContext";
import LoadingComponent from "../../layout/LoadingComponent";
import { product } from "../../models/product";

export default function ProductDetails() {
    const {basket, setBasket, removeItem} = useStoreContext();
    const {id} = useParams<{id: string}>();
    const [product,setProduct] = useState<product | null>(null) 
    const [loading,SetLoading] = useState(true);
    const [quantity, SetQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const item = basket?.items.find(i => i.productId === product?.id);
    
   useEffect(() => {
        if(item) SetQuantity(item.quantity)
      agent.Catalog.details(parseInt(id!))
            .then(Response => setProduct(Response))
            .catch(error => console.log(error))
            .finally(() => SetLoading(false));
   },[id, item])
   
   function handleInputChange (event : any) {
        if(event.target.value >= 0) {
            SetQuantity(parseInt(event.target.value));
        }
   }

   function handleUpdateCart () {
        setSubmitting(true);
        if(!item || quantity > item.quantity ) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            agent.Basket.addItem(product?.id!, updatedQuantity)
                    .then(basket => setBasket(basket))
                    .catch(error => console.log(error))
                    .finally(() => setSubmitting(false))
        }else {
            const updatedQuantity = item.quantity - quantity ;
            agent.Basket.removeItem(product?.id!, updatedQuantity)
                    .then(() => removeItem(product?.id!, updatedQuantity))
                    .catch(error => console.log(error))
                    .finally(() => setSubmitting(false)) 
        }
   }

   if(loading) return <LoadingComponent message="Loading Product...."/>
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
                            disabled={item?.quantity === quantity || !item && quantity === 0}
                            loading={submitting}
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