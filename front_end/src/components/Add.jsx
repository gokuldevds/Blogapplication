import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import axiosInstance from '../axiosinteceptor'; // Importing the axios instance


const Add = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    author: '',
    imageurl: '',
  });
  

  let navigate = useNavigate();
    let location=useLocation()
    

    function submitForm(e) {
      e.preventDefault();
      if (location.state!=null){
        axiosInstance.put(`http://localhost:4000/blog/edit/${location.state.post._id}`,form)
        .then((res)=>{
            console.log('Blog updated:', res.data);
            alert('Blog updated successfully!')
            navigate('/')

        })
        .catch((err)=>{
            alert('Failed to update blog');

        })
      }
      else{
        axiosInstance.post('http://localhost:4000/blog/add', form)
            .then((res) => {
                console.log('Blog added:', res.data);
                alert('Blog added successfully!');
                // reset form
                setForm({ title: '', description: '', author: '', imageurl: '' });
                // navigate back to home
                navigate('/');
            })
            .catch((err) => {
                console.error(err);
                alert('Failed to add blog');
            });
        }
    }
    //update form values
    function valueUpdate(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    
    //if location state is not null, it means we are updating a blog
    //so we set the form values to the blog data
    
useEffect(() => {
    if (location.state !== null) {
        setForm({
            ...form,
            title: location.state.post.title,
            description: location.state.post.description,
            author: location.state.post.author,
            imageurl: location.state.post.imageurl
        });
    }
}, []);

  return (
    <div style={{ marginLeft: "200px", marginTop: "auto" }}>
      <h2 style={{ marginLeft: "auto" }}>My BLOG</h2>
      <Box
        component="form"
        onSubmit={submitForm}
        sx={{ '& > :not(style)': { m: 1, width: '150ch', height: '10ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Blog Title"
          name="title"
          variant="outlined"
          type="text"
          value={form.title}
          onChange={valueUpdate}
        />
        <TextField
          label="Blog Description"
          name="description"
          variant="outlined"
          type="text"
          value={form.description}
          onChange={valueUpdate}
        />
        <TextField
          label="Author"
          name="author"
          variant="outlined"
          type="text"
          value={form.author}
          onChange={valueUpdate}
        />
        <TextField
          label="Image URL"
          name="imageurl"
          variant="outlined"
          type="text"
          value={form.imageurl}
          onChange={valueUpdate}
        />
        <Button variant="contained" type="submit" style={{ backgroundColor: "green" }} onClick={submitForm}>
                    {location.state ? "Update Blog" : "ADD Blog"}
            </Button>
      </Box>
    </div>
  );
};

export default Add;

