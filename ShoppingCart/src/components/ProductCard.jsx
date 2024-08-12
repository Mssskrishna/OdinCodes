import { useState } from "react";
import PropTypes from "prop-types";
import vitelogo from "/6011.jpg"; // Consider using a dynamic prop for images instead of a hardcoded path

function ProductCard({ title, description, category, image, price }) {
  const [quantity, setQuantity] = useState(1); // Start quantity at 1

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1)); // Ensure quantity doesn't go below 1

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
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div>
        <img
          src={image || vitelogo}
          alt={title}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "200px",
            objectFit: "cover",
          }}
        />
      </div>
      <h3 style={{ margin: "8px 0" }}>{title}</h3>
      <div
        style={{
          maxHeight: "55px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: "center",
        }}
      >
        {description}
      </div>
      <div
        style={{
          textAlign: "center",
          margin: "8px 0",
        }}
      >
        <h4
          style={{
            margin: "4px 0",
            padding: "4px 8px",
            border: "1px solid gray",
            borderRadius: "10px",
          }}
        >
          {category}
        </h4>
        <h3 style={{ margin: "8px 0" }}>Price: ${price}</h3>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          borderTop: "2px solid grey",
          padding: "4px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <button onClick={decrementQuantity} style={buttonStyle}>
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(Number(e.target.value), 1))}
            style={{
              textAlign: "center",
              width: "50px",
              margin: "0 8px",
              padding: "4px",
            }}
          />
          <button onClick={incrementQuantity} style={buttonStyle}>
            +
          </button>
        </div>
        <button style={addToCartButtonStyle}>Add to Cart</button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "4px 8px",
  fontSize: "16px",
  cursor: "pointer",
  border: "1px solid #ddd",
  borderRadius: "4px",
  margin: "0 4px",
};

const addToCartButtonStyle = {
  padding: "8px 16px",
  fontSize: "16px",
  cursor: "pointer",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "#007bff",
  color: "#fff", // Space between quantity controls and "Add to Cart" button
};

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string,
  price: PropTypes.number.isRequired,
};

export default ProductCard;
