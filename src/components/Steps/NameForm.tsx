import React, { useState } from 'react';
import { Typography, TextField, Button, Container, useTheme, useMediaQuery } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LayoutWrapper from './LayoutWrapper';

const NameForm: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigation = useNavigate();
  const [name, setName] = useState<string>('');
  const location = useLocation();
  const { state } = location;
  const { templateId, jobDescription } = state || {};

  return (
    <LayoutWrapper>
      <Container
        maxWidth="sm"
        style={{
          backgroundColor: '#FFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: isMobile ? 'flex-start' : 'center',
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
          Tell us your Name
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
          Write your Name{' '}
        </Typography>
        <TextField
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Write here"
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
          onClick={() => {
            navigation('/Loading', { state: { templateId, jobDescription, name } });
          }}
        >
          Create Your Resume
        </Button>
      </Container>
    </LayoutWrapper>
  );
};

export default NameForm;
