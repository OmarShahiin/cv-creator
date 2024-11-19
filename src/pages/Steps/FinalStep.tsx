import AboutMe from '@/components/Forms/AboutMe';
import Education from '@/components/Forms/Education';
import EmploymentHistory from '@/components/Forms/EmploymentHistory';
import ResumeHeader from '@/components/Forms/Header';
import PersonalDetailsForm from '@/components/Forms/PersonalDetailsForm';
import MultiSelectTags from '@/components/Forms/Skills';
import { Stack, Button, useMediaQuery, useTheme, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

const FinalStep = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1024));

  return (
    <Stack direction={isMobile ? 'column' : 'row'} width={'100%'} minHeight={'92vh'}>
      <Stack
        direction={'column'}
        sx={{
          justifyContent: 'flex-start',
          paddingInline: isMobile ? '0px' : '78px',
          paddingBlock: '50px',
          rowGap: '12px',
          paddingBottom: isMobile ? '100px' : 'unset',
        }}
        flex={1}
      >
        <ResumeHeader name="Juliana Resumé" score={20} improvement={25} />
        <PersonalDetailsForm />
        <AboutMe />
        <EmploymentHistory />
        <Education />
        <MultiSelectTags />
      </Stack>
      {isMobile ? undefined : <Stack flex={1} sx={{ backgroundColor: '#2B2A44' }}></Stack>}

      {isMobile && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<DescriptionIcon />}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '255px',
            marginInline: 'auto',
            zIndex: 1000, // Ensures it's on top of other content
            textTransform: 'none',
            borderRadius: '47px',
            padding: '16px 24px',
            backgroundColor: 'rgba(43, 42, 68, 1)',
            '&:hover': {
              backgroundColor: 'rgba(43, 42, 68, 0.9)',
            },
          }}
        >
          <Typography
            variant="button"
            sx={{
              fontFamily: 'Poppins, Helvetica',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 1)',
            }}
          >
            Preview the template
          </Typography>
        </Button>
      )}
    </Stack>
  );
};

export default FinalStep;
