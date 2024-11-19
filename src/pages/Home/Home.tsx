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
import { useState } from 'react';
import img1 from '@/assets/images/cv1.png';
import AllTemplatesIcon from '@/assets/layer.svg';
import starFilter from '@/assets/starFilter.svg';
import art from '@/assets/image.svg';
import crown from '@/assets/crown.svg';
import flash from '@/assets/flash.svg';
import briefcase from '@/assets/briefcase.svg';
import Header from '@/components/Landing/Header';
import { useNavigate } from 'react-router-dom';
const templates = [
  {
    id: 1,
    name: 'Jonathan Patterson',
    image: 'path/to/image1.jpg',
    type: 'Simple',
  },
  {
    id: 2,
    name: 'Vince Murray',
    image: 'path/to/image2.jpg',
    type: 'Art',
  },
  {
    id: 3,
    name: 'Gregory Walls',
    image: 'path/to/image3.jpg',
    type: 'Modern',
  },
  {
    id: 4,
    name: 'Gregory Walls',
    image: 'path/to/image3.jpg',
    type: 'Modern',
  },
  {
    id: 5,
    name: 'Gregory Walls',
    image: 'path/to/image3.jpg',
    type: 'Modern',
  },
  {
    id: 6,
    name: 'Gregory Walls',
    image: 'path/to/image3.jpg',
    type: 'Modern',
  },
  {
    id: 7,
    name: 'Gregory Walls',
    image: 'path/to/image3.jpg',
    type: 'Modern',
  },
  {
    id: 8,
    name: 'Gregory Walls',
    image: 'path/to/image3.jpg',
    type: 'Modern',
  },
  {
    id: 9,
    name: 'Gregory Walls',
    image: 'path/to/image3.jpg',
    type: 'Modern',
  },
  {
    id: 10,
    name: 'Gregory Walls',
    image: 'path/to/image3.jpg',
    type: 'Modern',
  },
  {
    id: 11,
    name: 'Gregory Walls',
    image: 'path/to/image3.jpg',
    type: 'Modern',
  },
  {
    id: 12,
    name: 'Gregory Walls',
    image: 'path/to/image3.jpg',
    type: 'Modern',
  },
  {
    id: 13,
    name: 'Gregory Walls',
    image: 'path/to/image3.jpg',
    type: 'Modern',
  },
  {
    id: 14,
    name: 'Gregory Walls',
    image: 'path/to/image3.jpg',
    type: 'Modern',
  },
  {
    id: 15,
    name: 'Gregory Walls',
    image: 'path/to/image3.jpg',
    type: 'Modern',
  },
  {
    id: 16,
    name: 'Gregory Walls',
    image: 'path/to/image3.jpg',
    type: 'Modern',
  },
  {
    id: 17,
    name: 'Gregory Walls',
    image: 'path/to/image3.jpg',
    type: 'Modern',
  },
];
function Templates() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const navigation = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobilexs = useMediaQuery(theme.breakpoints.down(376));
  const handleTabChange = (_: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  const handleCardClick = (templateId: any) => {
    setSelectedTemplate(templateId);
  };

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
          // backgroundColor: '#F5F6F8',
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
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            // scrollButtons="auto"
            sx={{ maxHeight: '55px' }}
          >
            <Tab
              label="All Templates"
              icon={
                <Box
                  component={'img'}
                  src={AllTemplatesIcon}
                  sx={{
                    filter: selectedTab === 0 ? 'unset' : 'grayscale(100%)',
                  }}
                />
              }
              disableRipple
              sx={{
                '&.MuiTab-root': {
                  minHeight: '55px',
                },
              }}
              iconPosition="start"
            />
            <Tab
              label="Simple"
              icon={
                <Box
                  component={'img'}
                  src={starFilter}
                  sx={{
                    filter: selectedTab === 1 ? 'unset' : 'grayscale(100%)',
                  }}
                />
              }
              disableRipple
              sx={{
                '&.MuiTab-root': {
                  minHeight: '55px',
                },
              }}
              iconPosition="start"
            />
            <Tab
              label="Art"
              icon={
                <Box
                  component={'img'}
                  src={art}
                  sx={{
                    filter: selectedTab === 2 ? 'unset' : 'grayscale(100%)',
                  }}
                />
              }
              disableRipple
              sx={{
                '&.MuiTab-root': {
                  minHeight: '55px',
                },
              }}
              iconPosition="start"
            />
            <Tab
              label="Modern"
              icon={
                <Box
                  component={'img'}
                  src={crown}
                  sx={{
                    filter: selectedTab === 3 ? 'unset' : 'grayscale(100%)',
                  }}
                />
              }
              disableRipple
              sx={{
                '&.MuiTab-root': {
                  minHeight: '55px',
                },
              }}
              iconPosition="start"
            />
            <Tab
              label="Creative"
              icon={
                <Box
                  component={'img'}
                  src={flash}
                  sx={{
                    filter: selectedTab === 4 ? 'unset' : 'grayscale(100%)',
                  }}
                />
              }
              disableRipple
              sx={{
                '&.MuiTab-root': {
                  minHeight: '55px',
                },
              }}
              iconPosition="start"
            />
            <Tab
              label="Professional"
              icon={
                <Box
                  component={'img'}
                  src={briefcase}
                  sx={{
                    filter: selectedTab === 5 ? 'unset' : 'grayscale(100%)',
                  }}
                />
              }
              disableRipple
              sx={{
                '&.MuiTab-root': {
                  minHeight: '55px',
                },
              }}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        <Grid container spacing={2}>
          {templates.map((template) => (
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
                  backgroundImage: `url(${img1})`,
                  backgroundSize: isMobile ? '180px 254px' : '272px 479px',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  border: selectedTemplate === template.id ? '7px solid rgba(173, 192, 240, 0.35)' : 'none',
                  cursor: 'pointer',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    height: '100%',
                    paddingInline: 'px',
                  }}
                >
                  {selectedTemplate === template.id && (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        // maxWidth: '134px',
                        fontSize: isMobile ? '8px' : '12px',
                        fontWeight: '400',
                        fontFamily: 'Poppins',
                        textTransform: 'none',
                        zIndex: 99,
                      }}
                      onClick={() => {
                        navigation('/create');
                      }}
                    >
                      Use This Template
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Templates;
