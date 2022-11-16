
import { useEffect, useState } from "react";
import { product } from "./product";



function App() {
  const [products,setProduct] = useState<product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5228/API/Products')
      .then(Response => Response.json())
      .then(data => setProduct(data))
  }, []);

  function addProduct() {
    setProduct(prevState =>
      [...prevState,{
        id: prevState.length + 101 ,
        name:'product' +(prevState.length+1), 
        price : (prevState.length *1000)+1000,
        brand: 'some brand',
        description: 'some decreption',
        pictureUrl: 'http://picsum.photos/200'
      }])
  }

  return (
    <div>
      <h1 style={{color:'red'}}>Re-Store</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - {product.price}</li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;
