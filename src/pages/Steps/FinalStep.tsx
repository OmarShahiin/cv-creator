import { useState } from 'react';
import { Stack, Button, useMediaQuery, useTheme, Typography, Box } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { useLocation } from 'react-router-dom';
import AboutMe from '@/components/Forms/AboutMe';
import Education from '@/components/Forms/Education';
import EmploymentHistory from '@/components/Forms/EmploymentHistory';
import ResumeHeader from '@/components/Forms/Header';
import PersonalDetailsForm from '@/components/Forms/PersonalDetailsForm';
import MultiSelectTags from '@/components/Forms/Skills';
import response from './response.json';
const FinalStep = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1024));
  console.log('response', response);

  const [htmlPreviewVisible, setHtmlPreviewVisible] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  // const location = useLocation();
  // const response = location.state?.response;
  const decodedHtml = atob(response.file_base64);

  const skillsData: any = response.technical_skills.map((skill: any, index: number) => ({
    id: index + 1,
    label: skill.name,
  }));
  const initialSelectedSkills = skillsData.map((skill: any) => skill.id);

  const handlePreviewClick = () => {
    setHtmlPreviewVisible(!htmlPreviewVisible);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setHasChanges(false); // Hide button after success
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = () => {
    setHasChanges(true); // Mark as changed
  };

  return (
    <Stack direction={isMobile ? 'column' : 'row'} width={'100%'} minHeight={'92vh'}>
      <Stack
        direction={'column'}
        sx={{
          justifyContent: 'flex-start',
          // paddingInline: isMobile ? '0px' : '78px',
          paddingBlock: '50px',
          rowGap: '12px',
          paddingBottom: isMobile ? '100px' : '100px',
        }}
        flex={1}
      >
        <Box
          sx={{
            paddingInline: isMobile ? '0px' : '44px',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '12px',
          }}
        >
          <ResumeHeader name={response.full_name} score={20} improvement={25} />
          <PersonalDetailsForm
            initialData={{
              fullName: response.full_name,
              email: response.email,
              phone: response.phone,
              country: response.country,
              city: response.city,
              uploadImage: '',
            }}
          />
          <AboutMe aboutMe={response.summary} onUpdate={handleChange} />
          <EmploymentHistory initialData={response.work_experiences} onUpdate={handleChange} />

          <Education
            initialData={[
              {
                id: 1,
                School: 'Ain Shams University',
                Degree: 'Bachelor of Science',
                startDate: '2015-09',
                endDate: '2019-06',
                city: 'Cairo',
                description: 'Graduated with a focus in front-end development.',
              },
            ]}
            onUpdate={handleChange}
          />
          <MultiSelectTags
            initialSelectedSkills={initialSelectedSkills}
            skillsData={skillsData}
            onUpdate={handleChange}
          />
        </Box>
      </Stack>

      {isMobile ? undefined : (
        <Stack flex={1} sx={{ backgroundColor: '#2B2A44', padding: '16px', alignItems: 'center' }}>
          <Box
            sx={{
              width: '593px',
              height: '100px',
              backgroundColor: 'red',
            }}
          ></Box>
          <Box
            sx={{
              height: '827px',
              width: '593px',
              backgroundColor: '#ffffff',
              overflow: 'auto',
              borderRadius: '8px',
            }}
            dangerouslySetInnerHTML={{ __html: decodedHtml }}
          />
        </Stack>
      )}

      {/* Preview Button for Mobile */}
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
            zIndex: 1000,
            textTransform: 'none',
            borderRadius: '47px',
            padding: '16px 24px',
            backgroundColor: 'rgba(43, 42, 68, 1)',
            '&:hover': {
              backgroundColor: 'rgba(43, 42, 68, 0.9)',
            },
          }}
          onClick={handlePreviewClick}
        >
          <Typography
            variant="button"
            sx={{
              fontFamily: 'Poppins, Helvetica',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 1)',
            }}
          >
            {htmlPreviewVisible ? 'Hide Template' : 'Preview the Template'}
          </Typography>
        </Button>
      )}

      {/* Floating Save Button */}
      {hasChanges && (
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: 'fixed',
            bottom: isMobile ? 80 : 20,
            right: 'calc(50% - 12px)',
            zIndex: 1000,
            textTransform: 'none',
            borderRadius: '50%',
            padding: '16px',
            width: '56px',
            height: '56px',
            minWidth: 'unset',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isSaving ? 'gray' : 'rgba(43, 200, 68, 1)',
            '&:hover': {
              backgroundColor: isSaving ? 'gray' : 'rgba(43, 42, 68, 0.9)',
            },
          }}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? '...' : <DescriptionIcon sx={{ color: 'white' }} />}
        </Button>
      )}
    </Stack>
  );
};

export default FinalStep;
