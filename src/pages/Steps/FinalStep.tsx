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
        }}
        flex={1}
      >
        <PersonalDetailsForm />
      </Stack>
      <Stack flex={1} sx={{ backgroundColor: '#2B2A44' }}></Stack>
    </Stack>
  );
};

export default FinalStep;
