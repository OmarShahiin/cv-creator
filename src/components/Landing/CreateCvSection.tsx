import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import imageBG from '@/assets/images/imageCreateCV.png'; // Update the path to your image
import cvs from '@/assets/📄 Mockup.svg'; // Update the path to your image

const CreateCvSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: '100%',
        // height: isMobile ? '502px' : '434px',
        borderRadius: '23px',
        overflow: 'hidden',
        textAlign: 'left',
        fontSize: '58px',
        color: '#fff',
        fontFamily: 'Poppins',
        flexShrink: 0,
        display: 'flex',
        marginTop: isMobile ? '50px' : '200px',
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${imageBG})`,

          maxWidth: '1200px',
          margin: 'auto',
          width: isMobile ? '95%' : '1200px',
          // maxHeight: '434px',
          borderRadius: '24px',
          backgroundColor: '#0e41fc',
          paddingTop: isMobile ? '38px' : '58px',
          paddingInline: isMobile ? '33px' : '77px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          overflowY: 'hidden',
        }}
      >
        <Box p={0}>
          <Typography
            sx={{
              fontWeight: '900',
              // lineHeight: '131%',
              padding: 0,
              fontSize: isMobile ? '34px' : '58px',
              maxWidth: '416px',
            }}
          >
            Create Your CV Today!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: isMobile ? '' : '18px',
              // lineHeight: '146%',
              maxWidth: '416px',
              fontWeight: isMobile ? '' : '400',
              marginTop: '23px',
              // marginBottom: '34px',
            }}
          >
            Build a professional CV that stands out in the job market.
          </Typography>

          <Button
            variant="contained"
            sx={{
              fontWeight: isMobile ? '700' : 'bold',
              fontSize: isMobile ? '14' : '14px',
              paddingBlock: '14px',
              paddingInline: '20px',
              backgroundColor: '#FFF',
              fontFamily: 'Poppins',
              color: 'black',
              borderRadius: '13px',
              textTransform: 'none',
            }}
          >
            Create Your Resume
          </Button>
        </Box>
        <Box component="img" src={cvs} alt="" sx={{}} />
      </Box>
    </Box>
  );
};

export default CreateCvSection;
