import { Container, Typography, Tabs, Tab, Box, useTheme, useMediaQuery } from '@mui/material';
import { useState, useEffect } from 'react';
import Header from '@/components/Landing/Header';
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery, useGetTemplatesQuery } from '@/features/home/home';
import { TemplatesGrid } from '@/components/Content/TemplatesGrid';

function Templates() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const navigation = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobilexs = useMediaQuery(theme.breakpoints.down(376));

  const { data: categories = [], isLoading: isLoadingCategories } = useGetCategoriesQuery();
  console.log('categories', categories);
  const { data: templates = [], isLoading: isLoadingTemplates } = useGetTemplatesQuery();
  console.log('templates', templates);

  const handleTabChange = (_: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  const handleCardClick = (templateId: number) => {
    setSelectedTemplate(templateId);
  };

  const filteredTemplates =
    selectedTab === 0
      ? templates
      : templates.filter((template) => template.category === categories[selectedTab - 1]?.id);

  useEffect(() => {
    // Set the first template as selected by default when templates are loaded
    if (filteredTemplates.length > 0 && selectedTemplate === null) {
      setSelectedTemplate(filteredTemplates[0].id);
    }
  }, [filteredTemplates, selectedTemplate]);

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: '0px',
          width: '100%',
          backgroundColor: '#FFF',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 100,
        }}
      >
        <Box width={'100%'} maxWidth={'lg'}>
          <Header />
        </Box>
      </Box>
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: '100px',
        }}
      >
        <Box
          textAlign="center"
          mt={4}
          mb={4}
          width={'100%'}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              color: '#0E41FC',
              fontFamily: 'Poppins',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '500',
              mb: '12px',
            }}
          >
            Choose your template
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontSize: isMobilexs ? '20px' : isMobile ? '24px' : '34px',
              fontWeight: '700',
              width: isMobile ? '364px' : '680px',
              alignSelf: 'center',
              color: '#000',
            }}
          >
            Job-winning modern resume templates
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          mb={4}
          sx={{
            borderRadius: '12px',
            backgroundColor: '#FFF',
            maxWidth: 'fit-content',
            marginInline: 'auto',
            paddingInline: '12px',
          }}
        >
          <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" sx={{ maxHeight: '55px' }}>
            <Tab label="All Templates" />
            {categories.map((category) => (
              <Tab key={category.id} label={category.name} />
            ))}
          </Tabs>
        </Box>

        {isLoadingCategories || isLoadingTemplates ? (
          <Typography textAlign="center">Loading...</Typography>
        ) : (
          <TemplatesGrid
            templates={filteredTemplates}
            selectedTemplate={selectedTemplate}
            onCardClick={handleCardClick}
            onUseCard={(templateId) => navigation('/create', { state: { templateId } })}
          />
        )}
      </Container>
    </>
  );
}

export default Templates;
