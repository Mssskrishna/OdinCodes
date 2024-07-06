// 1. NavBar (Navigation Links)
// ------------------------------
// | Welcome to Our Online Store! |
// |------------------------------|
// | About Us                     |
// |------------------------------|
// | We are dedicated to providing|
// | high-quality products at     |
// | affordable prices. Our       |
// | mission is to ensure customer|
// | satisfaction with every      |
// | purchase.                    |
// ------------------------------
// | Featured Products            |
// |------------------------------|
// | (Product Image)              |
// | Product Name                 |
// | Short Description            |
// ------------------------------
// | Special Offers               |
// |------------------------------|
// | Don't miss our summer sale!  |
// | Up to 50% off on selected    |
// | items.                       |
// ------------------------------
// | Customer Testimonials        |
// |------------------------------|
// | "I love shopping here! Great |
// | products and excellent       |
// | customer service." - Jane Doe|
// ------------------------------
// | Stay Updated                 |
// |------------------------------|
// | Sign up for our newsletter to|
// | receive the latest news and  |
// | exclusive offers!            |
// | (Email Signup Form)          |
// ------------------------------
// | Contact Us                   |
// |------------------------------|
// | Have questions? Reach out to |
// | our customer support team at |
// | support@onlinestore.com or   |
// | call us at (123) 456-7890.   |
// ------------------------------

// import  from "react";
// import { Link } from "react-router-dom";
import NavBar from "./components/NavBar";

function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <NavBar />
      <div className="welcome">
        <h1> Welcome to our Online Store</h1>
        <a href="#">About us</a>
      </div>
      {/* <Link to={"/products"}}></Link> */}
      {/* <Link to={"/products"}>Products</Link> */}
      <div className="featured">
        <h3>Featured products</h3>
      </div>
      <div className="contact us">
        <h3>Contact us</h3>
      </div>
    </div>
  );
}

export default Home;
