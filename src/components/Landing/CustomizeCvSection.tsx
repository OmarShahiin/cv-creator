import { Box, Typography, Divider, useTheme, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';
import sideImage from '@/assets/sideImageCutomizeCV.svg';
import correct from '@/assets/correct.svg';
const CustomizeCvSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '1400px',
        marginTop: isMobile ? '' : '80px',
        justifyContent: 'space-between',
        // gap: '46px',
        paddingBottom: isMobile ? '70px' : '200px',
        width: '100%',
        paddingInline: isMobile ? '17px' : '',
      }}
    >
      <Box
        sx={{
          width: '100%',
          // position: 'relative',
          height: '587px',
          textAlign: 'left',
          fontFamily: 'Poppins',
          fontSize: '38px',
          color: '#2b2a44',
        }}
      >
        <Typography
          sx={{
            // position: 'absolute',
            marginTop: '76px',

            // lineHeight: '131%',
            fontWeight: isMobile ? 700 : 600,
            maxWidth: '626px',
            fontSize: isMobile ? '25px' : '38px',
            marginBottom: '38px',
            fontFamily: 'Poppins',
          }}
        >
          Customize Your CV to Match Your Career Goals
        </Typography>

        <Typography
          //   variant="body1"
          sx={{
            // position: 'absolute',
            top: '214px',
            // left: '50%',
            // transform: 'translateX(-50%)',
            fontSize: isMobile ? '14px' : '18px',
            lineHeight: '146%',
            color: '#838291',
            maxWidth: '626px',
            marginBottom: '40px',
            fontWeight: '400',
          }}
        >
          Tailor your CV to specific job descriptions, companies, job titles, or university experiences to showcase your
          qualifications.
        </Typography>

        <Box
          sx={{
            // position: 'absolute',

            borderRadius: '16px',
            backgroundColor: '#fff',
            maxWidth: '631px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
            width: '100%',
            // boxSizing: 'border-box',
            // fontSize: '20px',
          }}
        >
          <Grid container width={'100%'}>
            <Grid>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Box
                  component="img"
                  src={correct}
                  alt=""
                  sx={{ width: isMobile ? '18px' : '25px', height: isMobile ? '18px' : '23.1px' }}
                />
                <Typography
                  sx={{
                    lineHeight: '140%',
                    fontWeight: 500,
                    fontSize: isMobile ? '16px' : '20px',
                  }}
                >
                  Job Description-Based
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  marginTop: '8px',
                  fontSize: isMobile ? '12px' : '16px',
                  lineHeight: '150%',
                  color: '#838291',
                  fontFamily: 'Roboto',
                  maxWidth: '569px',
                }}
              >
                Highlight skills and experiences that make you the perfect candidate for the job.
              </Typography>
            </Grid>

            <Grid width={'100%'}>
              <Divider sx={{ borderColor: '#efeaea', maxWidth: '582px', width: '100%', marginBlock: '28px' }} />
            </Grid>

            <Grid>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Box
                  component="img"
                  src={correct}
                  alt=""
                  sx={{ width: isMobile ? '18px' : '25px', height: isMobile ? '18px' : '23.1px' }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{
                    lineHeight: '140%',
                    fontWeight: 500,
                    fontSize: isMobile ? '16px' : '20px',
                  }}
                >
                  Company and Department-Specific
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  marginTop: '8px',
                  fontSize: isMobile ? '12px' : '16px',
                  lineHeight: '150%',
                  color: '#838291',
                  fontFamily: 'Roboto',
                  maxWidth: '569px',
                }}
              >
                Customize your CV for a particular company and department to demonstrate targeted interest.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {!isMobile && (
        <Box
          component="img"
          src={sideImage}
          alt=""
          sx={{
            left: '679px',
            maxWidth: '524px',
            height: '587px',
          }}
        />
      )}
    </Box>
  );
};

export default CustomizeCvSection;
