import { Box, Typography, Button, Stack, useTheme, useMediaQuery } from '@mui/material';
import Star from '@/assets/star.svg';
import image1 from '@/assets/images/image1.png';
import image2 from '@/assets/images/image2.png';
import image3 from '@/assets/images/image3.png';
import correctSign from '@/assets/images/correctSign.svg';
import Header from './Header';
const TitleSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',

        overflow: 'hidden',
        textAlign: 'center',
        fontSize: '40px',
        color: '#2b2a44',
        fontFamily: 'Poppins',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Main Background Rectangle */}
      <Box
        sx={{
          position: 'relative',

          display: 'flex',
          borderRadius: '28px',
          backgroundColor: '#fff',
          width: '100%',
          height: '783px',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Header />
        {/* Blurred Circle */}
        <Box
          sx={{
            position: 'absolute',
            top: isMobile ? '-50px' : '282px',
            // left: 'calc(50% - 100px)',
            filter: 'blur(409.9px)',
            borderRadius: '50%',
            backgroundColor: 'rgba(14, 123, 252, 0.36)',
            width: '1017px',
            height: '1017px',
            // zIndex: 1,
          }}
        />
        {/* Images */}

        {/* Text Elements */}
        <Typography
          // variant="body2"
          sx={{
            // position: 'absolute',
            // top: '109px',
            // left: 'calc(50% - 107px)',
            fontSize: '12px',
            letterSpacing: '0.3em',
            lineHeight: '150%',
            fontWeight: 600,
            color: '#838291',
            fontFamily: 'Poppins',
            mt: '36px',
            zIndex: 2,
          }}
        >
          ONLINE RESUME BUILDER
        </Typography>
        <Typography
          // variant="h4"
          // component="b"
          sx={{
            // position: 'absolute',
            // top: '142px',
            // left: 'calc(50% - 353px)',
            lineHeight: '117%',
            // display: 'inline-block',
            width: isMobile ? '340px' : '706px',
            fontSize: isMobile ? '30px' : '40px',
            fontFamily: 'Poppins',
            color: '#2b2a44',
            fontWeight: '700',
            // backgroundColor: 'red',
            // zIndex: 999999,
            mt: '15px',
            zIndex: 2,
          }}
        >
          First step to be expert, build your resume
        </Typography>

        {/* Button */}
        <Button
          sx={{
            // position: 'absolute',
            // top: '260px',
            // left: 'calc(50% - 103px)',
            borderRadius: '13px',
            backgroundColor: '#0e41fc',
            padding: '14px 20px',
            width: '206px',
            textAlign: 'center',
            color: '#fff',
            mt: '24px',
            '&.MuiButton-text': {
              fontSize: '14px',
              fontWeight: isMobile ? '700' : '400',
              fontFamily: ' Poppins',
            },
          }}
        >
          Create Your Resume
        </Button>

        <Box sx={{}}>
          <Box
            component="img"
            src={image2}
            alt=""
            sx={{
              position: 'absolute',
              top: '491px',
              left: isMobile ? '-100px' : '439px',
              borderRadius: '16px',
              width: isMobile ? '260px' : '378px',
              height: isMobile ? '362px' : '527px',
              objectFit: 'cover',
              // zIndex: 9,
            }}
          />
          <Box
            component="img"
            src={image1}
            alt=""
            sx={{
              position: 'absolute',
              top: '491px',
              left: isMobile ? '250px' : '982px',
              borderRadius: '16px',
              width: isMobile ? '260px' : '378px',
              height: isMobile ? '362px' : '527px',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              // position: 'relative',
              position: 'absolute',
              top: isMobile ? '400px' : '364px',
              left: isMobile ? '50px' : '688px',
              width: isMobile ? '291px' : '423px',
              height: isMobile ? '406px' : '591px',
              objectFit: 'cover',
            }}
          >
            <Box
              component="img"
              src={image3}
              alt=""
              sx={{
                position: 'absolute',
                // top: '364px',
                left: '-10px',
                width: isMobile ? '291px' : '423px',
                height: isMobile ? '406px' : '591px',
                borderRadius: '16px',
              }}
            />
            <Box
              component="img"
              src={correctSign}
              alt=""
              sx={{
                position: 'absolute',
                top: '-18px',
                right: '-10px',
                borderRadius: '16px',
                // width: '423px',
                // height: '591px',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Box>
        {/* Rating Component */}
        <Box
          sx={{
            position: 'absolute',
            top: '646px',
            left: '324px',
            width: '212.2px',
            height: '58.6px',
          }}
        >
          {!isMobile && (
            <>
              <Box
                sx={{
                  boxShadow: '0px 4.041px 62.54px rgba(0, 0, 0, 0.15)',
                  borderRadius: '48px',
                  backgroundColor: '#fff',
                  width: '100%',
                  height: '100%',
                  paddingInline: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={
                    {
                      // position: 'absolute',
                      // top: '16.16px',
                      // left: '21.22px',
                    }
                  }
                >
                  {/* Star icons */}
                  {Array(5)
                    .fill(0)
                    .map((_, idx) => (
                      <Box component="img" key={idx} src={Star} alt="Star" sx={{ width: '26.4px', height: '26.4px' }} />
                    ))}
                </Stack>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TitleSection;
