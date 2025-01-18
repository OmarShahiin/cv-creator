import { useAppSelector } from '@/app/store';
import Header from '@/components/Landing/Header';
import { Box } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';

const CreateLayout = () => {
  const { accessToken } = useAppSelector((state) => state.userData);
  console.log('accessToken', accessToken);
  const user = localStorage.getItem('user') || null;
  console.log('user', user);
  console.log('user', user);

  // If user is not logged in, redirect to register (or login) page
  if (!user || !accessToken) {
    return <Navigate to="/register" replace />;
  }
  return (
    <Box
      sx={{
        width: '100%',
        // justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: '#F5F6F8',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Header bgColor="#fff" />
      </Box>

      <Outlet />
    </Box>
  );
};

export default CreateLayout;
