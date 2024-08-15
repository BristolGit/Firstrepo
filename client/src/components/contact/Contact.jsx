import React from 'react';
import { Typography, Grid } from '@mui/material';
import Instagram from '@mui/icons-material/Instagram';
import MailOutline from '@mui/icons-material/MailOutline';
import LinkedIn from '@mui/icons-material/LinkedIn';
import './Contact.css';

const ContactPage = () => {
  return (
    <div className="rootContact">
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Contact Us
          </Typography>
        </Grid>

        <Grid
          container
          columns={{ xs: 2, sm: 8, md: 12 }}
          justifyContent="center"
          sx={{ marginTop: 5 }}
        >
          <Grid item xs={2} sx={{ marginY: 1 }}>
            <Instagram />
            <Typography
              fontFamily={'monospace'}
              fontWeight={500}
              letterSpacing={'.1rem'}
            >
              MedBudInsta
            </Typography>
          </Grid>

          <Grid item xs={2} sx={{ marginY: 1 }}>
            <LinkedIn />
            <Typography
              fontFamily={'monospace'}
              fontWeight={500}
              letterSpacing={'.1rem'}
            >
              MedBudCompany
            </Typography>
          </Grid>

          <Grid item xs={2} sx={{ marginY: 1 }}>
            <MailOutline />
            <Typography
              fontFamily={'monospace'}
              fontWeight={500}
              letterSpacing={'.1rem'}
            >
              contact@medbud.ca
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
          <a href="mailto:contact@medbud.ca">
            <button type="button" className="button">
              Send us an email
            </button>
          </a>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContactPage;
