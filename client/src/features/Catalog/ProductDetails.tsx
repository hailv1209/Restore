import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { product } from "../../models/product";

export default function ProductDetails() {
    const {id} = useParams<{id:string}>();
    const [product,setProduct] = useState<product | null>(null) 
    const [loading,SetLoading] = useState(true);
    
   useEffect(() => {
        axios.get(`http://localhost:5228/API/Products/${id}`)
            .then(Response => setProduct(Response.data))
            .catch(error => console.log(error))
            .finally(() => SetLoading(false));
   },[id])
   
   if(loading) return <h3>Loding.....</h3>
   if(!product) return <h3>Product No Found</h3>


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
            </Grid>
       </Grid>
    )
}