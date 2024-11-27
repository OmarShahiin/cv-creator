import React, { useEffect } from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import EnAppLogo from '@/assets/appLogo.svg';
import arAppLogo from '@/assets/appLogoAr.svg';
import TemporaryDrawer from './Drawer';
import { useNavigate } from 'react-router-dom';
import TranslateIcon from '@mui/icons-material/Translate';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { setLanguage } from '@/features/user/userSlice';
import i18n from '@/i18n';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation(); // Add translation hook
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.user.language);

  const handleChangeLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    dispatch(setLanguage(newLanguage));
    i18n.changeLanguage(newLanguage);

    // Change page direction
    document.documentElement.setAttribute('dir', newLanguage === 'en' ? 'ltr' : 'rtl');
  };

  // Ensure direction is updated on initial render
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
      <Box
        component="img"
        src={i18n.dir() == "ltr" ? EnAppLogo : arAppLogo}
        alt={t('appLogoAlt')} // Add alt text for translation
        sx={{
          width: '73.7px',
          height: '32.6px',
        }}
      />

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
          {['cvBuilder', 'features.navtitle', 'pricing', 'aboutUs'].map((key, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <Typography sx={{ lineHeight: '150%', color: '#2B2A44', cursor: 'pointer' }}>
                {t(key)}
              </Typography>
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

      {/* Language Switch and Get Started Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {!isMobile && (
          <Button
            onClick={handleChangeLanguage}
            sx={{ display: { md: 'inline-flex' } }}
          >
            {language === 'en' ? 'AR' : 'EN'}
          </Button>
        )}
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
        {isMobile && (
          <TemporaryDrawer open={open} toggleDrawer={toggleDrawer} onChangeLanguage={handleChangeLanguage} />
        )}
      </Box>
    </Box>
  );
};

export default Header;
