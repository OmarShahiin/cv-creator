import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState, useEffect } from 'react';
import Header from '@/components/Landing/Header';
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery, useGetTemplatesQuery } from '@/features/home/home';

function Templates() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const navigation = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobilexs = useMediaQuery(theme.breakpoints.down(376));

  const { data: categories = [], isLoading: isLoadingCategories } = useGetCategoriesQuery();
  const { data: templates = [], isLoading: isLoadingTemplates } = useGetTemplatesQuery();

  const handleTabChange = (_: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  const handleCardClick = (templateId: number) => {
    setSelectedTemplate(templateId);
  };

  const filteredTemplates =
    selectedTab === 0
      ? templates
      : templates.filter((template: any) => template.category === categories[selectedTab]?.id);

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
            {categories.map((category: any) => (
              <Tab key={category.id} label={category.name} />
            ))}
          </Tabs>
        </Box>

        {isLoadingCategories || isLoadingTemplates ? (
          <Typography textAlign="center">Loading...</Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredTemplates.map((template: any) => (
              <Grid
                size={{
                  xs: 6,
                  sm: 6,
                  md: 3,
                }}
                key={template.id}
              >
                <Card
                  onClick={() => handleCardClick(template.id)}
                  sx={{
                    minWidth: isMobile ? '160px' : '272px',
                    height: isMobile ? '254px' : '479px',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundImage: `url(${template.image})`,
                    backgroundPosition: 'center',
                    border: selectedTemplate === template.id ? '7px solid rgba(173, 192, 240, 0.35)' : 'none',
                    cursor: 'pointer',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      height: '100%',
                    }}
                  >
                    {selectedTemplate === template.id && (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          fontSize: isMobile ? '8px' : '12px',
                          fontWeight: '400',
                          fontFamily: 'Poppins',
                          textTransform: 'none',
                          zIndex: 99,
                        }}
                        onClick={() => navigation('/create', { state: { templateId: template.id } })}
                      >
                        Use This Template
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

export default Templates;
