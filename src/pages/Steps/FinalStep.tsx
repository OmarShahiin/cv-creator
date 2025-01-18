import { useCallback, useEffect, useState } from 'react';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import { Navigate } from 'react-router-dom';
import EditorPanel from '@/components/Steps/EditorPanel';
import PreviewPanel from '@/components/Steps/PreviewPanel';
import MobilePreviewButton from '@/components/Steps/MobilePreviewButton';
import SaveButton from '@/components/Steps/SaveButton';
import { useUpdateCvMutation } from '@/features/cvGenerator/generateCv';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { setCurrentCv, setUpdatedCv } from '@/features/CurrentCv/currentCvSlice';
const FinalStep = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1024));
  const { currentCv, updatedCv } = useAppSelector((state) => state.currentCV);
  const { user: stateUser } = useAppSelector((state) => state.userData);
  const user = localStorage.getItem('user') || null;
  console.log('user', user);

  console.log('currentCv', currentCv);
  const dispatch = useAppDispatch();
  const [response, setResponse] = useState(Object.keys(currentCv)?.length > 0 ? currentCv : updatedCv);
  console.log('responsessssss', response);
  if (Object.keys(response).length === 0) return <Navigate to="/" replace />;

  const decodedHtml = atob(response?.file_base64 ?? '');

  const [htmlPreviewVisible, setHtmlPreviewVisible] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [updatedCV, setupdatedCV] = useState({});
  const [update, { isLoading, isError, originalArgs, isSuccess, data }] = useUpdateCvMutation();

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
    await update({ data: { ...response, ...updatedCV, file_base64: undefined }, id: response.id });
    setHasChanges(false);
    setIsSaving(false);
  };

  const handleChange = useCallback((data: any) => {
    setHasChanges(true);
    setupdatedCV((prevData) => ({ ...prevData, ...data }));
    dispatch(setUpdatedCv({ ...updatedCV, ...data }));
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setCurrentCv(data));
      dispatch(setUpdatedCv(data));
      setResponse(data);
    }
  }, [data]);

  // If user is not logged in, redirect to register (or login) page
  if (!user || !stateUser) {
    return <Navigate to="/register" replace />;
  }
  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      width={'100%'}
      minHeight={'92vh'}
      sx={{
        backgroundColor: '#F5F6F8',
      }}
    >
      <EditorPanel
        response={response}
        isMobile={isMobile}
        handleChange={handleChange}
        initialSelectedSkills={initialSelectedSkills}
        skillsData={skillsData}
      />

      {isMobile && htmlPreviewVisible ? (
        <PreviewPanel decodedHtml={decodedHtml} onClose={handlePreviewClick} visible={htmlPreviewVisible} />
      ) : (
        !isMobile && <PreviewPanel decodedHtml={decodedHtml} onClose={handlePreviewClick} visible={false} />
      )}

      {isMobile && <MobilePreviewButton htmlPreviewVisible={htmlPreviewVisible} onPreviewClick={handlePreviewClick} />}

      {hasChanges && <SaveButton isMobile={isMobile} isSaving={isSaving} onClick={handleSave} />}
    </Stack>
  );
};

export default FinalStep;
