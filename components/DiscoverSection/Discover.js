import React from 'react';
import Container from '@mui/material/Container';

import { Button, Typography, useMediaQuery } from '@mui/material';

import { useTheme } from '@emotion/react';
import useStyles from './logo-style';
import Title from '../Title';


const logos = [
  '/images/logos/architect.png',
  '/images/logos/cloud.png',
  '/images/logos/coin.png',
  '/images/logos/mobile.png',
  '/images/logos/profile.png',
  '/images/logos/saas.png',
];

function Discover() {
  const { classes } = useStyles();
  const theme = useTheme();

  return (

    // <></>
<div style={{display:'flex',
alignContent:'center',
justifyContent:'center'
}}>
<div
  style={{
    width: '80%', // Set to 100% to make it responsive
    maxWidth: '1100px', // Limit maximum width
    height: '100vh', // Half of the viewport height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '25px',
    background: 'var(--White, #FFF)',
    boxShadow: '0px 4px 16px 0px rgba(165, 163, 174, 0.45)',
    padding: '20px',
    textAlign: 'center',
    margin:89
     // Center text within the div
  }}
>
  <Title align="center">
    <strong>Discover The Ease Of Booking Dei!</strong>
  </Title>
  <Typography display="block" component="h6" align="center">
    We know that selecting the right solution is crucial for your hotel, and we're here to make it effortless. With our all-in-one, user-friendly solution, you can effortlessly streamline your hotel operations. From managing room bookings and tracking financial transactions to staying ahead with real-time room status updates, you'll optimize decision-making and elevate your guests' experience with ease. Join us for a free demonstration, and see how Booking Dei can simplify your hotel operations, leaving a positive impact every step of the way!
  </Typography>
  <Button variant="contained" color="primary" size="large" className={classes.btn} style={{margin:40}}>
    CONNECT WITH US!
  </Button>
</div>
</div>

  );
}

export default Discover;
