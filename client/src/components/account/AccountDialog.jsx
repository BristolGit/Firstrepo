import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from '@mui/material';


const AccountDialog = ({ isOpen, onClose, onModalSubmit }) => {

  const [isLogin, setIsLogin] = useState(true);
  const [userInfo, setUserInfo] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setUserInfo({ ...userInfo, username: '', password: '' });

    if (!isLogin) {
      setUserInfo({ ...userInfo, firstName: '', lastName: '', email: '' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLogin) {
      // Make a login request
      await fetch('http://localhost:8885/login_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: userInfo.username,
          password: userInfo.password,
        }),
      })
        // Persist the login by storing something locally
        .then(response => {
          if(response.status === 200) {
            localStorage.setItem('username', userInfo.username);
            // Send user to the home page
            onClose();
            onModalSubmit();
          } else {
            window.alert("Invalid username or password");
          }
        });
    } else {
      // Make a signup request
      await fetch('http://localhost:8885/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: userInfo.username,
          email: userInfo.email,
          first_name: userInfo.firstName,
          last_name: userInfo.lastName,
          password: userInfo.password,
        }),
      })
        .then(response => response.json())
        .then(localStorage.setItem('username', userInfo.username));
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{isLogin ? 'Login' : 'Signup'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            value={userInfo.username}
            onChange={(event) =>
              setUserInfo({ ...userInfo, username: event.target.value })
            }
            fullWidth
          />
          {!isLogin && (
            <>
              <TextField
                margin="dense"
                label="Email"
                type="email"
                value={userInfo.email}
                onChange={(event) =>
                  setUserInfo({ ...userInfo, email: event.target.value })
                }
                fullWidth
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    label="First Name"
                    type="text"
                    value={userInfo.firstName}
                    onChange={(event) =>
                      setUserInfo({
                        ...userInfo,
                        firstName: event.target.value,
                      })
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    label="Last Name"
                    type="text"
                    value={userInfo.lastName}
                    onChange={(event) =>
                      setUserInfo({
                        ...userInfo,
                        lastName: event.target.value,
                      })
                    }
                    fullWidth
                  />
                </Grid>
              </Grid>
            </>
          )}
          <TextField
            margin="dense"
            label="Password"
            type="password"
            value={userInfo.password}
            onChange={(event) =>
              setUserInfo({ ...userInfo, password: event.target.value })
            }
            fullWidth
          />
          <DialogActions>
            <Button onClick={handleToggle} color="primary">
              {isLogin ? 'Create account' : 'Login'}
            </Button>
            <Button type="submit" color="primary">
              {isLogin ? 'Login' : 'Create account'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountDialog;