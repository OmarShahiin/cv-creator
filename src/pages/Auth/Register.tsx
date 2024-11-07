import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormLabel,
  Link,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import side from '@/assets/sideSvg.svg';
import Applogo from '@/assets/appLogo.svg';
import google from '@/assets/Google.svg';
import linkedin from '@/assets/linkedin.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const Rigister = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event: any) => {
    setChecked(event.target.checked);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1024));
  const isMobilexs = useMediaQuery(theme.breakpoints.down(376));

  const navigation = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: '#FFF',
        // borderRadius: 3,
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: isMobile ? 'flex-start' : 'space-between',
        // paddingInlineStart: isMobile ? '30px' : 'unset',

        height: '100vh',
      }}
    >
      <Box
        sx={{
          flex: 1,
          paddingBlock: '60px',
          // paddingInlineStart: isMobile ? 'unset' : '90px',
          marginInlineStart: isMobilexs ? '0px' : isMobile ? '30px' : '90px',
          paddingInline: isMobilexs ? '5px' : 'unset',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          // alignItems: isMobile ? 'center' : 'start',
        }}
      >
        <Box component={'img'} src={Applogo} mb={'34px'} width={'81px'} />
        <Typography variant="h1" sx={{ fontSize: '24px', fontWeight: '700px' }}>
          Login/Signup
        </Typography>
        <Box
          sx={{
            maxWidth: '369px',
          }}
        >
          <Button
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              columnGap: '8px',
              paddingBlock: '14px',
              minWidth: !isMobile ? '369px' : 'unset',
              width: '100%',
              maxWidth: '369px',
              marginTop: '26px',
              borderRadius: '8px',
              border: ' 1px solid var(--Border, #EFEAEA)',
            }}
          >
            <Box component={'img'} src={google} />
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#2B2A44',
                fontFamily: 'Roboto',
                textTransform: 'none',
              }}
            >
              Continue with Google account
            </Typography>
          </Button>
          <Button
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              columnGap: '8px',
              paddingBlock: '14px',
              width: '100%',
              maxWidth: '369px',
              marginTop: '10px',
              borderRadius: '8px',
              border: ' 1px solid var(--Border, #EFEAEA)',
            }}
          >
            <Box component={'img'} src={linkedin} />
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#2B2A44',
                fontFamily: 'Roboto',
                textTransform: 'none',
              }}
            >
              Continue with Linkedin
            </Typography>
          </Button>
          <Divider sx={{ color: '#838291', marginBlockStart: '26px' }}>or</Divider>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="start"
            justifyContent="center"
            width="100%"
            // maxWidth={360}
            // p={2}
            mx="auto"
          >
            <FormLabel sx={{ color: '#838291', textAlign: 'start' }}>Email</FormLabel>
            <TextField variant="outlined" fullWidth margin="normal" placeholder="Email" />
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleCheckboxChange} color="primary" />}
              label={
                <Typography variant="body2" sx={{ cursor: 'text' }}>
                  I agree to{' '}
                  <Link href="#" color="primary">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" color="primary">
                    Privacy Policy
                  </Link>
                  *
                </Typography>
              }
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                bgcolor: '#0056FF',
                color: '#FFFFFF',
                borderRadius: '8px',
                paddingBlock: '14px',
                fontSize: '14px',
                fontWeight: '600',
                textTransform: 'none',
              }}
              onClick={() => {
                navigation('/OTP');
              }}
            >
              Login/Signup
            </Button>
          </Box>
        </Box>
      </Box>
      {isMobile ? undefined : (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingInline: '40px',
          }}
        >
          <Box component={'img'} src={side} />
        </Box>
      )}
    </Box>
  );
};

export default Rigister;
