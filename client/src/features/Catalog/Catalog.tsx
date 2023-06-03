import { useEffect } from "react";
import LoadingComponent from "../../layout/LoadingComponent";
import ProductList from "./ProductList";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsycn, productsSelector } from "./CatalogSlice";

export default function Catalog() {
 const products = useAppSelector(productsSelector.selectAll)
 const {productsLoaded, status} = useAppSelector(state => state.catalog)
 const dispatch = useAppDispatch()



  useEffect(() => {
   if(!productsLoaded) dispatch(fetchProductsAsycn());
  }, [productsLoaded,dispatch]);

  if(status.includes('pendingFetchProducts')) return <LoadingComponent message="Loading Products...."/>

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
