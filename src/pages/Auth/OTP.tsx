import { Box, Button, Link, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import side from '@/assets/sideSvg.svg';
import Applogo from '@/assets/appLogo.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const OTP = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1024));
  const isMobilexs = useMediaQuery(theme.breakpoints.down(376));
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const navigation = useNavigate();

  const handleChange = (e: any, index: number) => {
    const value = e.target.value;
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input automatically
      if (value && index < otp.length - 1) {
        document?.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleResendCode = () => {
    console.log('Resend code clicked');
    // Handle resend code logic here
  };

  const handleSubmit = () => {
    console.log('Submitted OTP:', otp.join(''));
    // Handle OTP submission logic here
    navigation('/home');
  };
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
        <Typography variant="h1" sx={{ fontSize: '24px', fontWeight: '700px', marginBottom: '11px' }}>
          OTP Verification
        </Typography>
        <Box
          sx={{
            maxWidth: '369px',
          }}
        >
          <Box width={369} height={42}>
            <Typography
              variant="body2"
              component="p"
              style={{ fontFamily: 'Poppins, Helvetica', fontWeight: 'normal' }}
            >
              <span style={{ color: 'black' }}>We have sent the OTP to your email </span>
              <Link href="#" style={{ color: '#0e41fb' }}>
                Ghassanhani0@gmail.com{' '}
              </Link>
              <Link href="#" style={{ color: '#828291', textDecoration: 'underline' }}>
                Change?
              </Link>
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            maxWidth={360}
            // p={2}
            mx="auto"
          >
            <Box display="flex" justifyContent="space-between" marginBlock={2} width="100%">
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  id={`otp-${index}`}
                  variant="outlined"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  slotProps={{
                    input: {
                      sx: { textAlign: 'center' },
                      maxRows: 1,
                    },
                  }}
                  sx={{
                    width: '60px',
                    height: '47px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      paddingInline: '12px',
                    },
                  }}
                />
              ))}
            </Box>
            <Link href="#" onClick={handleResendCode} color="primary" underline="hover" mb={2} mr="auto">
              Send code again
            </Link>

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
              onClick={handleSubmit}
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

export default OTP;
