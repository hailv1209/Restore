import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import NotFound from "../../app/Error/NotFound";
import LoadingComponent from "../../layout/LoadingComponent";
import { product } from "../../models/product";

export default function ProductDetails() {
    const {id} = useParams<{id: string}>();
    const [product,setProduct] = useState<product | null>(null) 
    const [loading,SetLoading] = useState(true);
    
   useEffect(() => {
      agent.Catalog.details(parseInt(id!))
            .then(Response => setProduct(Response))
            .catch(error => console.log(error))
            .finally(() => SetLoading(false));
   },[id])
   
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
            </Grid>
       </Grid>
    )
}