import React from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import AppLogo from '@/assets/appLogo.svg';
import TemporaryDrawer from './Drawer';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigation = useNavigate();
  return (
    <Box
      sx={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.82)',
        height: 73,
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        // color: 'red',
        fontFamily: 'Poppins',
        fontSize: 14,
        maxWidth: 'xl',
        // padding: '0 20px', // add padding to control content spacing
        // zIndex: 3,
        paddingInline: isMobile ? '17px' : '',
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src={AppLogo}
        alt=""
        sx={{
          width: '73.7px',
          height: '32.6px',
        }}
      />

      {/* Navigation Links */}
      {!isMobile && (
        <Box
          sx={{
            display: 'flex',
            flex: 1, // take available space
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          {['CV Builder', 'Features', 'Pricing', 'About Us'].map((linkText, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <Typography sx={{ lineHeight: '150%', color: '#2B2A44', cursor: 'pointer' }}>{linkText}</Typography>
              {index < 3 && (
                <Box
                  sx={{
                    width: 3,
                    height: 3,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.26)',
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Get Started Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#0e41fc',
            borderRadius: '8px',
            padding: '7px 12px',
            fontWeight: 600,
            lineHeight: '150%',
            zIndex: 3,
          }}
          onClick={() => {
            navigation('/register');
          }}
        >
          Get Started
        </Button>
        {isMobile && <TemporaryDrawer open={open} toggleDrawer={toggleDrawer} />}
      </Box>
    </Box>
  );
};

export default Header;
