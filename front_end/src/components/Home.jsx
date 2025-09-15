import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosinteceptor"; // Importing the axios instance


const Home = () => {
  let token = localStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  


  useEffect(() => {
   axios.get("/api/blog/")  //  correct backend URL

      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  }, []);
  const deleteblog = (id) => {
    axiosInstance.delete(`/blog/delete/${id}`)
      .then((res) => {
       window.location.reload();

      })
      .catch((err) => {
        console.error("Error deleting blog:", err);
      });
  };

 let navigate = useNavigate();
  let updateBlog = (post) => {
    navigate('/add-blog', { state:{ post } });
  };
  let viewDetails = (post) => {
  navigate(`/details/${post._id}`);
};
  return (
    <Box
  display="flex"
  flexWrap="wrap"
  justifyContent="center"
  gap={4}
  marginTop={5}
>
  {posts.map((post, index) => (
    <Card
      key={index}
      sx={{
        width: "600px",
        borderRadius: 4,
        boxShadow: 6,
        display: "flex",
        flexDirection: "column",
        minHeight: 520,
        background: "#fff",
      }}
    >
      <Box display="flex" alignItems="center" px={2} pt={2}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "#e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 20,
            color: "#1976d2",
            mr: 2,
          }}
        >
          {post.author ? post.author[0]?.toUpperCase() : "U"}
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            {post.author || "Unknown Author"}
          </Typography>
          <Typography variant="caption" color="text.disabled">
            {post.username || "Blog User"}
          </Typography>
        </Box>
      </Box>

      <CardMedia
  sx={{
    height: 300, // Adjust height as needed
    width: "100%",
    objectFit: "cover",
    borderRadius: "0 0 8px 8px", // matches card bottom corners
    backgroundColor: "#f5f5f5",
    mt: 2,
  }}
  component="img"
  image={post.imageurl || "https://source.unsplash.com/random/1200x300?blog"}
  alt={post.title || "Blog image"}
/>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {post.description?.length > 120
            ? post.description.slice(0, 120) + "..."
            : post.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        { token && (
                            <>
                        <Button size="small" color="primary" onClick={() => updateBlog(blog)}>
                            Edit
                        </Button>
                        <Button size="small" color="error" onClick={() => {
                            deleteblog(blog._id)
                        }}>
                            Delete
                        </Button>
                        <Button size="small" sx={{ color: "#e53935" }}>
          ❤️
        </Button>
                            </>
                        )}

        <Button size="small" variant="outlined" onClick={() => viewDetails(post)}>
          Learn More
        </Button>
        
      </CardActions>
    </Card>
  ))}
</Box>
  );
};

export default Home;


