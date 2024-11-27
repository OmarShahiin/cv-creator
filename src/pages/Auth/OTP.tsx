import { Box, Button, Link, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import side from '@/assets/sideSvg.svg';
import Applogo from '@/assets/appLogo.svg';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSendOtpMutation, useValidateOtpMutation } from '@/features/user/authApiSlice';
import { useAppDispatch } from '@/app/store';
import { setCredentials } from '@/features/user/userSlice';

export const OTP = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1024));
  const isMobilexs = useMediaQuery(theme.breakpoints.down(376));
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const dispatch = useAppDispatch();
  // Use the mutation hooks
  const [validateOtp, { isLoading: isValidating }] = useValidateOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useSendOtpMutation();

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

  const handleResendCode = async () => {
    try {
      await resendOtp({ email }).unwrap();
      alert('OTP has been resent to your email');
    } catch (error) {
      console.error('Error resending OTP:', error);
      alert('Failed to resend OTP. Please try again.');
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 5) {
      alert('Please enter a valid 5-digit OTP');
      return;
    }

    try {
      const datares: any = await validateOtp({ email, otp: '518700' }).unwrap();
      console.log('datares', datares);
      dispatch(
        setCredentials({
          accessToken: datares.access,
          refreshToken: datares.refresh,
        }),
      );
      alert('OTP validated successfully');
      navigate('/home'); // Navigate to the home screen or desired destination
    } catch (error) {
      console.error('Error validating OTP:', error);
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#FFF',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: isMobile ? 'flex-start' : 'space-between',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          flex: 1,
          paddingBlock: isMobilexs ? '20px' : '60px',
          marginInlineStart: isMobilexs ? '0px' : isMobile ? '30px' : '90px',
          paddingInline: isMobilexs ? '5px' : 'unset',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isMobilexs ? 'flex-start' : 'center',
        }}
      >
        <Box component={'img'} src={Applogo} mb={'34px'} width={'81px'} />
        <Typography variant="h1" sx={{ fontSize: '24px', fontWeight: '700px', marginBottom: '11px' }}>
          OTP Verification
        </Typography>
        <Box sx={{ maxWidth: '369px' }}>
          <Box maxWidth={369} width="100%" height={42}>
            <Typography
              variant="body2"
              component="p"
              style={{ fontFamily: 'Poppins, Helvetica', fontWeight: 'normal' }}
            >
              <span style={{ color: 'black' }}>We have sent the OTP to your email </span>
              <Link href="#" style={{ color: '#0e41fb' }}>
                {email}{' '}
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
          >
            <Box display="flex" justifyContent="space-between" columnGap={2} marginBlock={2} width="100%">
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  id={`otp-${index}`}
                  variant="outlined"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: 'center' },
                  }}
                  sx={{
                    width: '60px',
                    height: '47px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      paddingInline: isMobilexs ? '8px' : '12px',
                    },
                  }}
                />
              ))}
            </Box>
            <Link
              href="#"
              onClick={handleResendCode}
              color="primary"
              underline="hover"
              mb={2}
              mr="auto"
              sx={{ cursor: isResending ? 'not-allowed' : 'pointer' }}
            >
              {isResending ? 'Resending...' : 'Send code again'}
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
              disabled={isValidating}
            >
              {isValidating ? 'Validating...' : 'Login/Signup'}
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
