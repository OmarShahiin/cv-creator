import React, { useEffect } from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import EnAppLogo from '@/assets/appLogo.svg';
import arAppLogo from '@/assets/appLogoAr.svg';
import TemporaryDrawer from './Drawer';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { setLanguage } from '@/features/user/userSlice';
import i18n from '@/i18n';
import { useTranslation } from 'react-i18next';
import { useJwt } from 'react-jwt';
import PersonIcon from '@mui/icons-material/Person';
const Header = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.user.language);
  const user = useAppSelector((state) => state.user);
  const { decodedToken, isExpired } = useJwt(user.accessToken ?? '');

  const handleChangeLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    dispatch(setLanguage(newLanguage));
    i18n.changeLanguage(newLanguage);

    // Change page direction
    document.documentElement.setAttribute('dir', newLanguage === 'en' ? 'ltr' : 'rtl');
  };

  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'en' ? 'ltr' : 'rtl');
  }, [language]);

  return (
    <Box
      sx={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.82)',
        height: 73,
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'Poppins',
        fontSize: 14,
        maxWidth: 'xl',
        paddingInline: isMobile ? '17px' : '',
      }}
    >
      {/* Logo */}
      <Box flex={0.5} display={'flex'} flexDirection={'row'} justifyContent={'center'}>
        <Box
          onClick={() => navigation('/')}
          component="img"
          src={i18n.dir() === 'ltr' ? EnAppLogo : arAppLogo}
          alt={t('appLogoAlt')}
          sx={{
            width: '73.7px',
            height: '32.6px',
            ':hover': {
              cursor: 'pointer',
            },
          }}
        />
      </Box>

      {/* Navigation Links */}
      {!isMobile && (
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          {[].map((key, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <Typography sx={{ lineHeight: '150%', color: '#2B2A44', cursor: 'pointer' }}>{t(key)}</Typography>
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

      {/* Language Switch and Profile or Get Started */}
      <Box
        sx={{
          flex: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        {!isMobile && (
          <Button onClick={handleChangeLanguage} sx={{ display: { md: 'inline-flex' } }}>
            {language === 'en' ? 'AR' : 'EN'}
          </Button>
        )}
        {decodedToken && !isExpired ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
              }}
            />
            <Typography sx={{ fontFamily: 'Poppins', fontSize: 14, fontWeight: 400, color: '#2B2A44' }}>
              {'user@gmail.com'}
            </Typography>
          </Box>
        ) : (
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
            {t('getStarted')}
          </Button>
        )}
        {isMobile && (
          <TemporaryDrawer open={open} toggleDrawer={toggleDrawer} onChangeLanguage={handleChangeLanguage} />
        )}
      </Box>
    </Box>
  );
};

export default Header;
