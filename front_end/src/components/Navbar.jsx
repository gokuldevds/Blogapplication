import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Navbar = () => {

  let token = localStorage.getItem("token");
  let navigate = useNavigate();

  const removeToken = () => {
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/login");
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* You can add a menu icon here if needed */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Blog
            </Typography>
            {/* Show Login if NOT logged in */}
            {!token && (
              <Link to="/login">
                <Button sx={{ color: "#fff", background: "#1976d2", mx: 1, '&:hover': { background: "#1565c0" } }}>
                  Login
                </Button>
              </Link>
            )}
            {/* Show Home, Add Blog, Logout if logged in */}
            {token && (
              <>
                <Link to="/">
                  <Button sx={{ color: "#fff", background: "#1976d2", mx: 1, '&:hover': { background: "#1565c0" } }}>
                    Home
                  </Button>
                </Link>
                <Link to="/add-blog">
                  <Button sx={{ color: "#fff", background: "#1976d2", mx: 1, '&:hover': { background: "#1565c0" } }}>
                    Add Blog
                  </Button>
                </Link>

                  <Button sx={{ color: "#fff", background: "#1976d2", mx: 1, '&:hover': { background: "#1565c0" } }} onClick={removeToken}>
                    Logout
                   
                  </Button>
                
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center', marginTop: 2 }}>
        Welcome to the Blogs
      </Typography>
    </div>
  )
}

export default Navbar