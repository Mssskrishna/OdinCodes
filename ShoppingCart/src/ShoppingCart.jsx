import  { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";

import NavBar from "./components/NavBar";
function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        console.log(json);
      });
  }, []); // Empty dependency array ensures useEffect runs only once
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1rem",
  };
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div style={gridStyle}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              category={product.category}
              image={product.image}
              price = {product.price}
            />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </>
  );
}

export default App;
