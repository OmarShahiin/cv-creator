import React from 'react';
import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface ResumeHeaderProps {
  name: string;
  score: number;
  improvement: number;
}

const ResumeHeader: React.FC<ResumeHeaderProps> = ({ name, score, improvement }) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={isMobile ? 1 : 2}
      borderRadius={2}
      borderColor="divider"
      flexDirection={'column'}
      sx={{
        width: '100%',
        backgroundColor: '#fff',
        marginTop: isMobile ? '-96px' : '0px',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      {/* Left side: Name and progress */}
      <Typography
        sx={{
          fontSize: '18px',
          fontWeight: '700',
          fontFamily: 'Poppins',
          verticalAlign: 'middle',
        }}
      >
        {name}
      </Typography>
      <Box display="flex" alignItems="center" gap={2} flexDirection={'row'}>
        {!isMobile && (
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
        )}
      </Box>

      {/* Right side: Button */}
    </Box>
  );
};

export default ResumeHeader;

// Usage
// <ResumeHeader name="Juliana Resumé" score={20} improvement={25} />
