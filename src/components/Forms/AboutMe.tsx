import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

interface AboutMeProps {
  aboutMe: string;
  onUpdate: (updatedAboutMe: string) => void;
}

const AboutMe: React.FC<AboutMeProps> = ({ aboutMe, onUpdate }) => {
  const [text, setText] = React.useState(aboutMe);

  // const handleSave = () => {
  //   onUpdate(text); // Pass the updated text back to the parent
  // };

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
      <Typography
        sx={{ fontSize: '18px', fontWeight: '600', fontFamily: 'Poppins', textAlign: 'left' }}
        color="#2B2A44"
        mb={'10px'}
      >
        About Me
      </Typography>
      <TextField
        placeholder="Tell us about yourself"
        multiline
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {/* <Button
        variant="contained"
        color="primary"
        sx={{
          marginTop: '12px',
          textTransform: 'none',
          alignSelf: 'flex-start',
        }}
        onClick={handleSave}
      >
        Save Changes
      </Button> */}
    </Box>
  );
};

export default AboutMe;
