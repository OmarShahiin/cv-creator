import AboutMe from '@/components/Forms/AboutMe';
import EmploymentHistory from '@/components/Forms/EmploymentHistory';
import ResumeHeader from '@/components/Forms/Header';
import PersonalDetailsForm from '@/components/Forms/PersonalDetailsForm';
import { Stack } from '@mui/material';

const FinalStep = () => {
  return (
    <Stack direction={'row'} width={'100%'} minHeight={'92vh'}>
      <Stack
        direction={'column'}
        sx={{
          //   overflow: 'scroll',
          justifyContent: 'flex-start',
          paddingInline: '78px',
          paddingBlock: '50px',
          rowGap: '12px',
        }}
        flex={1}
      >
        <ResumeHeader name="Juliana Resumé" score={20} improvement={25} />
        <PersonalDetailsForm />
        <AboutMe />
        <EmploymentHistory />
      </Stack>
      <Stack flex={1} sx={{ backgroundColor: '#2B2A44' }}></Stack>
    </Stack>
  );
};

export default FinalStep;
