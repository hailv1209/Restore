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
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../context/StoreContext";
import { product } from "../../models/product";

interface Props {
  product: product;
}

export default function ProductCard({ product }: Props) {
  const [loading,SetLoading] = useState(false);
  const {setBasket} = useStoreContext();

  function handleAddItem(productId : number) {
    SetLoading(true);
    agent.Basket.addItem(productId)
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => SetLoading(false))
  }


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
        <LoadingButton loading={loading} onClick={() => handleAddItem(product.id)}  size="small">Add To Cart</LoadingButton>
        <Button component={Link} to={`/Catalog/${product.id}`}  size="small">View</Button>
      </CardActions>
    </Card>
  );
}
