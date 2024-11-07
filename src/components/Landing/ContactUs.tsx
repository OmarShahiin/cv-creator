import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';

const ContactUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        marginTop: '24px',
        width: isMobile ? '95%' : '100%',
        maxWidth: 'lg',
        position: 'relative',
        borderRadius: '16px',
        backgroundColor: '#2b2a44',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '0px 31px',
        boxSizing: 'border-box',
        textAlign: 'center',
        fontSize: '22px',
        color: '#fff',
      }}
    >
      <Box
        sx={{
          alignSelf: 'stretch',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'start' : 'center',
          justifyContent: isMobile ? '' : 'space-between',
          padding: '24px 0px',
          rowGap: '10px',
          textAlign: isMobile ? 'start' : '',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            // rowGap: '5px',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              lineHeight: '150%',
              fontWeight: 500,
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Still have questions?
          </Typography>
          <Typography
            sx={{
              fontSize: '18px',
              lineHeight: '150%',
              color: '#838291',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Contact our support team for further assistance.
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            width: '158px',
            borderRadius: '13px',
            backgroundColor: '#fff',
            color: '#2b2a44',
            fontSize: '14px',
            padding: '14px 20px',
            fontFamily: 'Poppins, sans-serif',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          Contact us
        </Button>
      </Box>
    </Box>
  );
};

export default ContactUs;
