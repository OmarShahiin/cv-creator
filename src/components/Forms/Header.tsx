import React from 'react';
import { Box, Button, LinearProgress, Typography, Chip } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface ResumeHeaderProps {
  name: string;
  score: number;
  improvement: number;
}

const ResumeHeader: React.FC<ResumeHeaderProps> = ({ name, score, improvement }) => {
  return (
    <Box
      display="flex"
      //   alignItems="center"
      justifyContent="space-between"
      p={2}
      borderRadius={2}
      borderColor="divider"
      flexDirection={'column'}
      sx={{
        width: '100%',
        backgroundColor: '#fff',
      }}
    >
      {/* Left side: Name and progress */}
      <Typography
        sx={{
          fontSize: '18px',
          fontWeight: '700',
          fontFamily: 'Poppins',
        }}
        mb={'16px'}
      >
        {name}
      </Typography>
      <Box display="flex" alignItems="center" gap={2} flex={1} flexDirection={'row'}>
        <Box flex={1} flexDirection={'column'}>
          <Box display="flex" flexDirection={'row'} justifyContent="space-between" alignItems="center" width={'100%'}>
            <Box flexDirection={'row'} display={'flex'} columnGap={1} alignItems={'center'}>
              <Chip label={`${score}%`} color="primary" size="small" />
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: '400',
                  fonwFamily: 'Poppins',
                }}
              >
                Your resume score
              </Typography>
            </Box>
            <Box flexDirection={'row'} display={'flex'} columnGap={1} alignItems={'center'}>
              <Chip
                label={`+${improvement}% `}
                color="success"
                size="small"
                sx={{ backgroundColor: '#E3F8F2', color: '#00C48C' }}
              />
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: '400',
                  fonwFamily: 'Poppins',
                }}
              >
                Add employment history
              </Typography>
            </Box>
          </Box>
          <LinearProgress
            variant="determinate"
            value={75}
            sx={{ width: '100%', height: 2, borderRadius: 1, marginBlock: '8px' }}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowDropDownIcon />}
          sx={{
            borderRadius: '8px',
            paddingBlock: '7px',
          }}
        >
          + Add section
        </Button>
      </Box>

      {/* Right side: Button */}
    </Box>
  );
};

export default ResumeHeader;

// Usage
// <ResumeHeader name="Juliana Resumé" score={20} improvement={25} />
