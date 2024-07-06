// import React from "react";
import { Link } from "react-router-dom";
import cart from "../assets/shopping-cart.png";
function NavBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Link to={"/"}>home</Link>
      <Link to={"/products"}>Products</Link>
      <img src={cart} width={20} height={20} />
    </div>
  );
}

export default NavBar;
