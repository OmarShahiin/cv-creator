import { Box, Typography, Card, Grid2, useTheme, useMediaQuery } from '@mui/material';
import person from '@/assets/person.svg';
import heart from '@/assets/heart.svg';
import medal from '@/assets/medal.svg';
import getSelected from '@/assets/getSelected.svg';
const FeaturesSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        // height: 438,
        textAlign: 'center',
        fontSize: 38,
        color: '#2b2a44',
        fontFamily: 'Poppins',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '36px',
        // paddingInline: isMobile ? '17px' : '',
      }}
    >
      <Typography
        sx={{
          // position: 'absolute',
          // top: 36,
          // left: '50%',
          // transform: 'translateX(-50%)',
          fontWeight: isMobile ? 700 : 600,
          lineHeight: '117%',
          maxWidth: '793px',
          fontSize: isMobile ? '26px' : '38px',
          fontFamily: 'Poppins',
          marginBottom: '36px',
        }}
      >
        Features designed to help you win your dream job
      </Typography>

      <Box
        sx={{
          // position: 'absolute',
          // top: 164,
          // left: 0,
          // right: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid2
          container
          rowGap={'23px'}
          spacing={isMobile ? '23px' : '35px'}
          sx={{ maxWidth: 1200 }}
          size={12}
          paddingInline={1}
        >
          {[
            {
              title: 'Create Personalized CVs',
              description: 'Effortlessly import data and customize your CV based on your career goals',
              icon: person,
            },
            {
              title: 'User-Friendly Interface',
              description: 'Step-by-step guidance to build your CV with ease',
              icon: heart,
            },
            {
              title: 'Stand Out',
              description: 'Generate a polished, professional CV tailored to your target opportunities',
              icon: medal,
            },
            {
              title: 'Get Hired',
              description: 'Increase your chances of landing your dream job with a standout CV',
              icon: getSelected,
            },
          ].map((item, index) => (
            <Grid2 key={index} size={isMobile ? 6 : 3}>
              <Card
                sx={{
                  // width: isMobile ? 174 : 274,
                  // height: isMobile ? 174 : 274,
                  borderRadius: 2,
                  position: 'relative',
                  backgroundColor: '#fff',
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  paddingInline: isMobile ? '12px' : '24px',
                  paddingBlock: isMobile ? '0px' : '24px',
                  paddingTop: isMobile ? '12px' : '24px',
                  paddingInlineStart: isMobile ? '12px' : '24px',
                  // gap: '12px',
                }}
              >
                <Box
                  component="img"
                  src={item.icon}
                  alt=""
                  sx={{
                    width: '64px',
                    height: '64px',
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 600,
                    lineHeight: '140%',
                    // width: '189px',
                    fontSize: isMobile ? '14.1px' : '16px',

                    // marginBottom: '40px',
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    textAlign: 'start',
                    fontSize: isMobile ? '12px' : '16px',
                    lineHeight: '150%',
                    color: '#838291',
                    maxWidth: '228px',
                    minHeight: '91px',
                  }}
                >
                  {item.description}
                </Typography>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};

export default FeaturesSection;
