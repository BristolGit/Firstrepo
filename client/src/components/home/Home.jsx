import React from 'react';
import { Typography, Grid } from '@mui/material';
import './Home.css';

const HomePage = () => {
  return (
    <div className='root'>
      <Grid direction='column'>
        <Grid container justify="center" alignItems="center">
          <Grid item sm={6} xs={12}>
            <img src="/logo.png" alt="MedBud Logo" className="logo" style={{ maxWidth: '70%', maxHeight: '200px' }}/>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Typography
              variant="h3"
              noWrap
              sx={{
                display: { xs: 'none', sm: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MEDBUD
            </Typography>
          </Grid>
        </Grid>
        <Grid item className="buttons" sx={{ marginTop: '20px' }}>
          <a href="/search">
            <button type="button" className="button">
              SEARCH DRUGS
            </button>
          </a>
          <a href="/faq">
            <button type="button" className="button">
              FAQ
            </button>
          </a>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
