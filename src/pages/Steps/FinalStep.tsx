import AboutMe from '@/components/Forms/AboutMe';
import Education from '@/components/Forms/Education';
import EmploymentHistory from '@/components/Forms/EmploymentHistory';
import ResumeHeader from '@/components/Forms/Header';
import PersonalDetailsForm from '@/components/Forms/PersonalDetailsForm';
import MultiSelectTags from '@/components/Forms/Skills';
import { Stack, Button, useMediaQuery, useTheme, Typography, Box } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const FinalStep = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1024));

  const [htmlPreviewVisible, setHtmlPreviewVisible] = useState(false);
const location = useLocation();
const response = location.state?.response;
  // Decode the base64 HTML content
  const decodedHtml = atob(response.file_base64);
  console.log('decodedHtml', decodedHtml)

  const handlePreviewClick = () => {
    setHtmlPreviewVisible(!htmlPreviewVisible);
  };

  const skillsData:any = response.technical_skills.map((skill:any, index:number) => ({
    id: index + 1, // Assign a unique ID to each skill
    label: skill.name,
  }));
  const initialSelectedSkills = skillsData.map((skill:any) => skill.id);

  return (
    <Stack direction={isMobile ? 'column' : 'row'} width={'100%'} minHeight={'92vh'}>
      <Stack
        direction={'column'}
        sx={{
          justifyContent: 'flex-start',
          paddingInline: isMobile ? '0px' : '78px',
          paddingBlock: '50px',
          rowGap: '12px',
          paddingBottom: isMobile ? '100px' : '100px',
        }}
        flex={1}
      >
        <ResumeHeader name={response.full_name} score={20} improvement={25} />
        <PersonalDetailsForm
  initialData={{
    fullName: response.full_name,
    email: response.email,
    phone: response.phone,
    country: response.country,
    city: response.city,
    uploadImage: response.photo, // Assuming `photo` contains the image URL
  }}
/>
<AboutMe
  aboutMe={response.summary}
  onUpdate={(updatedAboutMe) => {
    console.log('Updated About Me:', updatedAboutMe);
    // Send the updated summary to the backend
    // Example: axios.put('/api/update-summary', { summary: updatedAboutMe });
  }}
/>
        <EmploymentHistory initialData={response.work_experiences}   onUpdate={(updatedAboutMe) => {
    console.log('Updated About Me:', updatedAboutMe);
    // Send the updated summary to the backend
    // Example: axios.put('/api/update-summary', { summary: updatedAboutMe });
  }}
  />
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
  onUpdate={(updatedData) => {
    console.log('Updated Education Data:', updatedData);
    // Handle the updated education data here (e.g., API request)
  }}
/>
<MultiSelectTags
      initialSelectedSkills={initialSelectedSkills} // Example pre-selected IDs
      skillsData={skillsData}
      onUpdate={(updatedData) => {
        console.log('Updated Education Data:', updatedData);
        // Handle the updated education data here (e.g., API request)
      }}
    />      </Stack>

      {isMobile ? undefined : (
        <Stack flex={1} sx={{ backgroundColor: '#2B2A44', padding: '16px' }}>
          { (
            <Box
              sx={{
                height: '100%',
                width: '100%',
                backgroundColor: '#ffffff',
                overflow: 'auto',
                borderRadius: '8px',
              }}
              dangerouslySetInnerHTML={{ __html: decodedHtml }} // Render the HTML
            />
          )}
        </Stack>
      )}

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
    </Stack>
  );
};

export default FinalStep;
