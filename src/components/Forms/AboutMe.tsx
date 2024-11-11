import { Box, TextField, Typography } from '@mui/material';

const AboutMe = () => {
  return (
    <Box
      p={2}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingBlock: '20px',
        backgroundColor: '#fff',
        borderRadius: '16px',
      }}
    >
      <Typography sx={{ fontSize: '18px', fontWeight: '600', fontFamily: 'Poppins' }} color="#2B2A44" mb={'10px'}>
        About Me
      </Typography>
      <TextField placeholder="Tell us about yourself" multiline rows={4} />
    </Box>
  );
};

export default AboutMe;
