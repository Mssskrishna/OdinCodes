import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import HeartIcon from "./HeartIcon"; // Import the HeartIcon component
import "./BlogPage.css";
import { AuthContext } from "./AuthProvider";

function BlogPage() {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const { id } = useParams(); // Get the blog ID from the URL parameters
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [login, setLogin] = useState(false);
  const [isLiked, setisLiked] = useState(false);
  useEffect(() => {
    async function fetchBlogContent() {
      if (!authToken) {
        setLogin(true); // If no token, set login to true (not authenticated)
        return;
      }
      const response = await fetch(`/api/blog/${id}`, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        setLogin(false);
      } else {
        const result = await response.json();
        setBlog(result);
        setLikes(result._count.likedBy);
        setLogin(false);
      }
    }
    fetchBlogContent();
  }, [id, authToken]);

  useEffect(() => {
    async function checkuserLiked() {
      const response = await fetch("/api/blog/checklike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ blogId: id }),
      });
      const result = await response.json();
      console.log(result);
      if (result.liked) setisLiked(true);
    }

    checkuserLiked();
  }, [likes]);
  async function handleLike() {
    // console.log(id)
    let url;
    if (!isLiked) {
      url = "/api/blog/likeinc";
    } else {
      url = "/api/blog/likedec";
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ blogId: id }),
    });
    // setLikes(response._count.likedBy);
    const result = await response.json();
    // console.log(result);
    setLikes(result.count);
    setisLiked(!isLiked);
  }
  if (!blog && !login) {
    return <p>Loading...</p>;
  }
  if (login) {
    return (
      <>
        <p>You need to log in to view the content.</p>
        <Link to="/login">Sign in</Link>
      </>
    );
  }

  return (
    <>
      <div className="blogpage">
        {/* Navigation Links */}
        <div className="side-bar">
          <ul className="sideul">
            <li>
              <a href="#introduction">Introduction</a>
            </li>
            <li>
              <a href="#content">Content</a>
            </li>
            <li>
              <a href="#conclusion">Conclusion</a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="blogdiv ">
          <h2 style={{ textAlign: "center" }}>{blog.title}</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <p>{blog.createdAt.substr(0, 10)}</p>
            <div
              style={{ display: "flex", gap: ".5rem", alignItems: "center" }}
            >
              <p>Likes: {likes}</p>
              <button
                onClick={handleLike}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HeartIcon isLiked={isLiked} />
              </button>
            </div>
          </div>
          <div>
            <h2 style={{ color: "yellow" }} id="introduction">
              Introduction
            </h2>
            <p>{blog.introduction}</p>

            <h2 id="content" style={{ color: "yellow" }}>
              Content
            </h2>
            {blog.body.map((paragraph, index) => (
              <p style={{ marginBottom: "20px" }} key={index}>
                {paragraph}
              </p>
            ))}
            {blog.body.map((paragraph, index) => (
              <p style={{ marginBottom: "20px" }} key={index}>
                {paragraph}
              </p>
            ))}
            {blog.body.map((paragraph, index) => (
              <p style={{ marginBottom: "20px" }} key={index}>
                {paragraph}
              </p>
            ))}

            <h2 id="conclusion" style={{ color: "yellow" }}>
              Conclusion
            </h2>
            <p>{blog.conclusion}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogPage;
