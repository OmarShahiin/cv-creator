import { useCallback, useEffect, useState } from 'react';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import { Navigate, useLocation } from 'react-router-dom';
import EditorPanel from '@/components/Steps/EditorPanel';
import PreviewPanel from '@/components/Steps/PreviewPanel';
import MobilePreviewButton from '@/components/Steps/MobilePreviewButton';
import SaveButton from '@/components/Steps/SaveButton';
import { useUpdateCvMutation } from '@/features/cvGenerator/generateCv';
const FinalStep = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1024));
  const location = useLocation();

  const [response, setResponse] = useState(location.state?.response);
  if (!response) return <Navigate to="/" replace />;

  const decodedHtml = atob(response?.file_base64 ?? '');

  const [htmlPreviewVisible, setHtmlPreviewVisible] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  console.log('hasChanges', hasChanges);
  const [isSaving, setIsSaving] = useState(false);
  const [updatedCV, setupdatedCV] = useState({});
  console.log('updatedCV', updatedCV);
  const [update, { isLoading, isError, originalArgs, isSuccess, data }] = useUpdateCvMutation();

  console.log('isLoading,isError,originalArgs,isSuccess', isLoading, isError, originalArgs, isSuccess);

  // Skills preparation
  const skillsData: any = response.technical_skills.map((skill: any, index: number) => ({
    id: index + 1,
    label: skill.name,
  }));
  const initialSelectedSkills = skillsData.map((skill: any) => skill.id);

  // Handle user interactions
  const handlePreviewClick = () => {
    setHtmlPreviewVisible(!htmlPreviewVisible);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await update({ data: updatedCV, id: response.id });
    setHasChanges(false);
    setIsSaving(false);
  };

  const handleChange = useCallback((data: any) => {
    console.log('data', data);
    setHasChanges(true);
    console.log('setHasChanges', data);
    setupdatedCV((prevData) => ({ ...prevData, ...data }));
  }, []);

  useEffect(() => {
    if (data) {
      setResponse(data);
    }
  }, [data]);

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      width={'100%'}
      minHeight={'92vh'}
      sx={{
        backgroundColor: '#F5F6F8',
      }}
    >
      {/* Left Editor Panel */}
      <EditorPanel
        response={response}
        isMobile={isMobile}
        handleChange={handleChange}
        initialSelectedSkills={initialSelectedSkills}
        skillsData={skillsData}
      />

      {/* Right-side Preview Panel (hidden on mobile by design; toggled with a button) */}
      {!isMobile && <PreviewPanel decodedHtml={decodedHtml} />}

      {/* Preview Button for Mobile */}
      {isMobile && <MobilePreviewButton htmlPreviewVisible={htmlPreviewVisible} onPreviewClick={handlePreviewClick} />}

      {/* Floating Save Button (only shows if there are changes) */}
      {hasChanges && <SaveButton isMobile={isMobile} isSaving={isSaving} onClick={handleSave} />}
    </Stack>
  );
};

export default FinalStep;
