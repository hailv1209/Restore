import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsycn } from "../Basket/basketSlice";

interface Props {
  product: product;
}

export default function ProductCard({ product }: Props) {
  const {status} = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "secondary.main" },
        }}
      />

      <CardMedia
        sx={{ height: 140 , backgroundSize: "contain" , bgcolor: 'primary.main'}}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton 
          loading={status.includes('pendingAddItem' + product.id)} 
          onClick={() => dispatch(addBasketItemAsycn({productId : product.id}))}  
           size="small">Add To Cart
        </LoadingButton>
        <Button component={Link} to={`/Catalog/${product.id}`}  size="small">View</Button>
      </CardActions>
    </Card>
  );
}
