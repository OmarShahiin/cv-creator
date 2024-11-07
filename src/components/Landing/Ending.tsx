import { Box, Typography, Stack, Link, useTheme, useMediaQuery } from '@mui/material';
import AppLogo from '@/assets/appLogo.svg';
import { LinkedIn, X } from '@mui/icons-material';

const Ending = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        mt: '65px',
        width: isMobile ? '95%' : '100%',
        maxWidth: 'lg',
        position: 'relative',
        textAlign: 'left',
        fontSize: '16px',
        color: '#000',
        fontFamily: 'Poppins, sans-serif',
        marginBottom: isMobile ? '28px' : '145px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Box
          component="img"
          src={AppLogo}
          alt=""
          sx={{
            width: '113px',
            height: '50px',
            marginBottom: !isMobile ? '24px' : '0px',
          }}
        />
        <Typography
          sx={{
            fontSize: '14px',
            fontFamily: 'Roboto, sans-serif',
            marginTop: isMobile ? '24px' : '0px',
          }}
        >
          Stay up to date on the latest features and releases by joining our newsletter.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: isMobile ? '10px' : '80px',
          marginTop: isMobile ? '24px' : '0px',
        }}
      >
        <Box sx={{}}>
          <Typography sx={{ fontWeight: 600, fontSize: isMobile ? '14px' : '16px' }}>About Us</Typography>
          <Stack spacing={1} sx={{ marginTop: isMobile ? '10px' : '42px' }}>
            <Link color="#000" href="#" sx={{ fontSize: '12px' }}>
              Our Story
            </Link>
            <Link color="#000" href="#" sx={{ fontSize: '12px' }}>
              Contact Us
            </Link>
          </Stack>
        </Box>

        {/* Resources Section */}
        <Box sx={{}}>
          <Typography sx={{ fontWeight: 600, fontSize: isMobile ? '14px' : '16px' }}>Resources</Typography>
          <Stack spacing={1} sx={{ marginTop: isMobile ? '10px' : '42px' }}>
            <Link color="#000" href="#" sx={{ fontSize: '12px' }}>
              FAQ
            </Link>
            <Link color="#000" href="#" sx={{ fontSize: '12px' }}>
              Terms
            </Link>
            <Link color="#000" href="#" sx={{ fontSize: '12px' }}>
              Privacy
            </Link>
          </Stack>
        </Box>

        {/* Contact Section */}
        <Box sx={{}}>
          <Typography sx={{ fontWeight: 600, fontSize: isMobile ? '14px' : '16px' }}>Contact us</Typography>
          <Stack spacing={1} sx={{ marginTop: isMobile ? '10px' : '42px' }}>
            <Link color="#000" href="mailto:hello@relume.io" sx={{ fontSize: '12px' }}>
              hello@relume.io
            </Link>
          </Stack>
        </Box>

        {/* Follow Us Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: isMobile ? '14px' : '16px' }}>Follow Us</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: isMobile ? '10px' : '42px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <X sx={{ width: '18px', height: '18px' }} />
              <Typography sx={{ fontSize: '12px' }}>Twitter</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <LinkedIn sx={{ width: '18px', height: '18px', color: '#000' }} />
              <Typography sx={{ fontSize: '12px' }}>LinkedIn</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Ending;
