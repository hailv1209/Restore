import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../layout/LoadingComponent";
import { product } from "../../models/product";
import ProductList from "./ProductList";

export default function Catalog() {
  const [products, setProduct] = useState<product[]>([]);
  const [loading,SetLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProduct(products))
      .catch(error => console.log(error))
      .finally(() => SetLoading(false));

  }, []);

  if(loading) return <LoadingComponent message="Loading Products...."/>

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
