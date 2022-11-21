
import { useState, useEffect } from "react";
import { product } from "../../models/product";
import ProductList from "./ProductList";


export default function Catalog () {

  const [products,setProduct] = useState<product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5228/API/Products')
      .then(Response => Response.json())
      .then(data => setProduct(data))
  }, []);

    return (
       <>
       <ProductList products={products}/>
       </>
    )
}