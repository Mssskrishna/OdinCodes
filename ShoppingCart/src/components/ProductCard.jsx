import  { useState } from "react";
import PropTypes from "prop-types";
import vitelogo from "../../public/6011.jpg";
// ---------------------------
// |     Product Image       |
// ---------------------------
// |       Product Title     |
// ---------------------------
// | Product Description     |
// ---------------------------
// | Quantity: [-] [ 1 ] [+] |
// ---------------------------
// |       Add to Cart       |
// ---------------------------

function ProductCard({ title, description, category }) {
  const [quantity, setQuantity] = useState(0);
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(Math.max(quantity - 1, 0));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px",
        width: "300px",
      }}
    >
      <div>
        <img src={vitelogo} style={{ width: 200, height: 200 }} />
      </div>
      <h3>{title}</h3>
      <div
        style={{
          margin: "8px 0",
          maxHeight: "30px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {description}
      </div>
      <h4>{category}</h4>
      <div>
        <button onClick={decrementQuantity}>-</button>
        <input
          type="text"
          name=""
          id=""
          value={quantity}
          onChange={(e) => {
            setQuantity(Math.max(e.target.value, 1));
          }}
          style={{ textAlign: "center" }}
        />
        <button onClick={incrementQuantity}>+</button>
      </div>
      <div>
        <button style={{ margin: "10px" }}>addToCart</button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
};
export default ProductCard;
