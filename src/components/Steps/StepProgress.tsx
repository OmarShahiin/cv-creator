import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import bag from '@/assets/briefcaseG.svg';
import clipboard from '@/assets/clipboard.svg';
import note from '@/assets/note-2.svg';
import { useNavigate } from 'react-router-dom';
interface StepProgressProps {
  step: number;
  totalSteps: number;
  title: string;
}

export const StepProgress: React.FC<StepProgressProps> = ({ step, totalSteps, title }) => {
  const progressValue = (step / totalSteps) * 100;
  const navigete = useNavigate();
  useEffect(() => {
    navigete('/create/final-step');
    setTimeout(() => {}, 5000);
    return () => {};
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: '#fff',
        borderRadius: '14px',
        minWidth: '580px',
        paddingTop: '115px',
        paddingBottom: '96px',
      }}
    >
      <Box position="relative" display="inline-flex">
        <CircularProgress
          // variant="determinate"
          value={progressValue}
          size={100}
          thickness={0.9}
          sx={{
            transform: { rotate: 'revert' },
          }}
        ></CircularProgress>
        <Box
          component="img"
          src={bag}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <Box
          component="img"
          src={note}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '-100%',
            // transform: 'translate(-25%, -50%)',
          }}
        />
        <Box
          component="img"
          src={clipboard}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '150%',
            // transform: 'translate(-50%, -50%)',
          }}
        />
      </Box>
      <Typography color="primary" mt={2}>
        Step {step}/{totalSteps}
      </Typography>
      <Typography
        sx={{
          fontSize: '24px',
          color: '#2B2A44',
          fontWeight: '600',
          fontFamily: 'Poppins',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

// Usage example
