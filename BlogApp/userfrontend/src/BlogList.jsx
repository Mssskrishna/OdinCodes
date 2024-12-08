import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
          // console.error(response)
        }
        console.log(response)
        const result = await response.json();
        // console.log(result);
        setBlogs(result); // Uncomment to set blogs
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    }
    fetchBlogs();
  }, []);
  

  return (
    <div>
      <h1>Blog List</h1>
      {blogs.map((blog) => (
        <div key={blog.id}>
          {/* Link to navigate to the blog details page */}
          <Link to={`/blog/${blog.id}`} style={{color:"#93c5fd",fontSize:"1.5rem"}}>{blog.title}</Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
