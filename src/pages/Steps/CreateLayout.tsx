import Header from '@/components/Landing/Header';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

const CreateLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        width: '100%',
        // justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <Box sx={{ maxWidth: 'lg', width: '100%' }}>
        <Header />
      </Box>
      <Box
        sx={{
          backgroundColor: '#F5F6F8',
          width: '100%',
          // justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          display: 'flex',
          flex: 1,
          minHeight: '92vh',
          justifyContent: isMobile ? 'flex-start' : 'center',
          paddingTop: isMobile ? '66px' : '0px',
          paddingInline: '5px',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default CreateLayout;
