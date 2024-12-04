import { Box, Button, Typography } from '@mui/material';
import linkedin from '@/assets/linkedin.svg';
import { useTranslation } from 'react-i18next';
import { GoogleLogin } from '@react-oauth/google';
import { useLinkedIn } from 'react-linkedin-login-oauth2';

export const SocialLoginButtons = () => {
  const { t } = useTranslation();
  const buttonStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: '8px',
    paddingBlock: '14px',
    width: '100%',
    maxWidth: '369px',
    marginTop: '30px',
    borderRadius: '8px',
    border: '1px solid var(--Border, #EFEAEA)',
  };

  const handleGoogleSuccess = (response: any) => {
    console.log('Google Login Success:', response);
  };

  const handleGoogleError = () => {
    console.error('Google Login Failed');
  };

  const { linkedInLogin } = useLinkedIn({
    clientId: '77lkct289wyhjo',
    redirectUri: `${window.location.origin}/linkedin`, // Ensure this matches your LinkedIn app settings
    onSuccess: (code) => {
      console.log('LinkedIn Authorization Code:', code);
      // Handle token exchange on your backend
    },
    onError: (error) => {
      console.error('LinkedIn Login Failed:', error);
    },
  });

  return (
    <>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        logo_alignment="center"
        containerProps={{
          style: {
            paddingBlock: '13px',
          },
        }}
      />

      <Button variant="outlined" sx={buttonStyles} onClick={linkedInLogin}>
        <Box component={'img'} src={linkedin} alt="LinkedIn Logo" />
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#2B2A44',
            fontFamily: 'Roboto',
            textTransform: 'none',
          }}
        >
          {t('register.linkedinButton')}
        </Typography>
      </Button>
    </>
  );
};
