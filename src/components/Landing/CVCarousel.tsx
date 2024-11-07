import { useRef } from 'react';
import { Box, Button, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from '@/assets/prev.svg';
import ArrowForwardIosIcon from '@/assets/next.svg';
import CenteredSwiper from './Swiper';
import certifaied from '@/assets/certified.svg';
const CVCarousel = () => {
  const scrollRef = useRef<any>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        textAlign: 'center',

        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFF',
        maxHeight: '558px',
        marginBottom: '80px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', maxWidth: 'lg' }}>
        <Box
          component={'img'}
          src={certifaied}
          sx={{
            marginTop: isMobile ? '-40px' : '-60px',
            marginBottom: '47px',
            width: isMobile ? '67px' : '150px',
            height: isMobile ? '67px' : '150px',
          }}
        />
      </Box>
      <Typography
        gutterBottom
        sx={{
          fontSize: isMobile ? '26px' : '38px',
          fontWeight: isMobile ? '700' : '600',
          maxWidth: isMobile ? '346px' : 'lg',
          paddingInline: '10px',
        }}
      >
        Create Your Perfect CV with ToBe.expert
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        gutterBottom
        sx={{
          fontSize: isMobile ? '14px' : '18px',
          fontWeight: isMobile ? '400' : '400',
          maxWidth: isMobile ? '346px' : 'lg',
          paddingInline: '10px',
          marginBottom: '20px',
          // backgroundColor: 'red',
        }}
      >
        Craft a tailored curriculum vitae that showcases your unique skills and experiences.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          // alignSelf: 'center',
          flexDirection: 'row',
          width: '100%',
          // height: '300px',
          justifyContent: 'space-between',
          maxWidth: 'lg',
          // mb: '30px',
          // backgroundColor: 'red',
          alignItems: 'center',
          marginBottom: '34px',
        }}
      >
        <IconButton
          // disableFocusRipple
          disableRipple
          onClick={() => scrollRef.current?.slidePrev()}
          sx={{
            minWidth: 'auto',

            display: isMobile ? 'none' : 'block',
          }}
        >
          <Box component={'img'} src={ArrowBackIosNewIcon} />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginInline: 'auto', paddingBlock: '14px', borderRadius: '13px' }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: isMobile ? '700' : '400',
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              lineHeight: '150%',
              textTransform: 'none',
            }}
          >
            Create Your Resume
          </Typography>
        </Button>
        <IconButton
          disableRipple
          onClick={() => scrollRef.current?.slideNext()}
          sx={{ minWidth: 'auto', display: isMobile ? 'none' : 'block' }}
        >
          <Box component={'img'} src={ArrowForwardIosIcon} />
        </IconButton>
      </Box>
      <Box sx={{ width: '100vw', marginBottom: '0px' }}>
        <CenteredSwiper ref={scrollRef} />
      </Box>
    </Box>
  );
};

export default CVCarousel;
