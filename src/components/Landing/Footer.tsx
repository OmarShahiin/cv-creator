import { Box, Typography, Link, Stack, useTheme, useMediaQuery } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: isMobile ? '95%' : '100%',
        maxWidth: 'lg',
        position: 'relative',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'start' : 'center',
        justifyContent: 'space-between',
        textAlign: 'left',
        fontSize: '12px',
        color: '#838291',
        fontFamily: 'Roboto, sans-serif',
        marginBottom: '22px',
        // padding: '10px 0', // Add padding for better spacing
      }}
    >
      <Typography sx={{ lineHeight: '150%', fontSize: isMobile ? '12px' : '12px' }}>
        © 2024 ToBe.expert. All rights reserved.
      </Typography>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        <Link
          href="#"
          underline="hover"
          color="inherit"
          sx={{ lineHeight: '150%', fontSize: isMobile ? '12px' : '12px' }}
        >
          Privacy Policy
        </Link>
        <Link
          href="#"
          underline="hover"
          color="inherit"
          sx={{ lineHeight: '150%', fontSize: isMobile ? '12px' : '12px' }}
        >
          Terms of Service
        </Link>
        <Link
          href="#"
          underline="hover"
          color="inherit"
          sx={{ lineHeight: '150%', fontSize: isMobile ? '12px' : '12px' }}
        >
          Cookie Settings
        </Link>
      </Stack>
    </Box>
  );
};

export default Footer;
