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
import enApplogo from '@/assets/appLogo.svg';
import arApplogo from '@/assets/appLogoAr.svg';
import google from '@/assets/Google.svg';
import linkedin from '@/assets/linkedin.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSendOtpMutation } from '@/features/user/authApiSlice';
import i18n from '@/i18n';
import { useTranslation } from 'react-i18next';

export const Rigister = () => {
  const { t } = useTranslation(); // Add translation hook
  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event: any) => {
    setChecked(event.target.checked);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1024));
  const isMobilexs = useMediaQuery(theme.breakpoints.down(376));

  const navigation = useNavigate();

  // Use the mutation hook
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const handleSendOtp = async () => {
    if (!email) {
      alert(t('errors.enterEmail')); // Translate alert
      return;
    }
    if (!checked) {
      alert(t('errors.agreeTerms')); // Translate alert
      return;
    }

    try {
      await sendOtp({ email }).unwrap();
      navigation('/OTP', { state: { email } }); // Pass email to the OTP screen
    } catch (error) {
      console.error('Failed to send OTP:', error);
      alert(t('errors.sendingOtp')); // Translate alert
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
        }}
      >
        <Box component={'img'} src={i18n.dir() === 'ltr' ? enApplogo : arApplogo} mb={'34px'} width={'81px'} />
        <Typography variant="h1" sx={{ fontSize: '24px', fontWeight: '700px' }}>
          {t('register.title')}
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
              width: '100%',
              maxWidth: '369px',
              marginTop: '26px',
              borderRadius: '8px',
              border: '1px solid var(--Border, #EFEAEA)',
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
              {t('register.googleButton')}
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
              border: '1px solid var(--Border, #EFEAEA)',
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
              {t('register.linkedinButton')}
            </Typography>
          </Button>
          <Divider sx={{ color: '#838291', marginBlockStart: '26px' }}>{t('register.or')}</Divider>
          <Box display="flex" flexDirection="column" alignItems="start" justifyContent="center" width="100%" mx="auto">
            <FormLabel sx={{ color: '#000', textAlign: 'start' }}>{t('register.emailLabel')}</FormLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder={t('register.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleCheckboxChange} color="primary" />}
              label={
                <Typography variant="body2" sx={{ cursor: 'text' }}>
                  {t('register.agreeTo')}{' '}
                  <Link href="#" color="primary">
                    {t('register.terms')}
                  </Link>{' '}
                  {t('register.and')}{' '}
                  <Link href="#" color="primary">
                    {t('register.privacy')}
                  </Link>
                  *
                </Typography>
              }
            />
            <Button
              variant="contained"
              color="primary"
              disableRipple
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
              onClick={handleSendOtp}
              disabled={isLoading || !checked}
            >
              {isLoading ? t('register.sendingOtp') : t('register.submitButton')}
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
            alignItems: 'center',
            paddingInline: '40px',
            paddingBlock: isMobilexs ? '20px' : '60px',
          }}
        >
          <Box component={'img'} src={side} />
        </Box>
      )}
    </Box>
  );
};

export default Rigister;
