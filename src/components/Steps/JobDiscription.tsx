import React from 'react';
import { Typography, TextField, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const JobDescriptionForm: React.FC = () => {
  const navigation = useNavigate();
  return (
    <Container
      maxWidth="sm"
      style={{
        backgroundColor: '#FFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // height: '100vh',
        paddingBlock: '25px',
        borderRadius: '14px',
      }}
    >
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: '500',
          fontFamily: 'Poppins',
          //   color: '#838291',
          textAlign: 'center',
          //   marginBottom: '1.5rem',
        }}
        color="primary"
        gutterBottom
      >
        Tell us about your job
      </Typography>
      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'Poppins',
        }}
        fontWeight="bold"
        align="center"
        gutterBottom
      >
        Write your job discretion
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Write here"
        multiline
        rows={10}
        fullWidth
        style={{ marginBottom: '1.5rem' }}
      />
      <Button
        variant="contained"
        disableRipple
        color="primary"
        sx={{
          borderRadius: '8px',
          paddingBlock: '13px',
          fontSize: '14px',
          fontWeight: '600',
          textTransform: 'none',
          fontFamily: 'Roboto',
          '&:hover': {
            backgroundColor: 'rgba(14, 65, 252, 1)',
            color: '#fff',
          },
        }}
        fullWidth
        onClick={
          ()=>
          {
            navigation('name');
          }
        }
      >
        Next - Add your name
      </Button>
    </Container>
  );
};

export default JobDescriptionForm;
