import React, { useState, useEffect } from 'react'
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

const Details = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    author: '',
    imageurl: '',
  });
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:4000/blog/details/${id}`)
      .then((res) => {
        setForm(res.data);
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
      });
  }, [id]);

  return (
    <div>
        <br />
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Blog Details
      </Typography>
      <Card sx={{ maxWidth: 800, margin: "auto" }}>
        <CardMedia
          component="img"
          alt={form.title}
          height="100%"
          width="100%"
          image={form.imageurl}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {form.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            By {form.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {form.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default Details