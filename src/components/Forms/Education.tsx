import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  InputLabel,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

interface EducationEntry {
  id: number;
  School: string;
  Degree: string;
  startDate: string;
  endDate: string;
  city: string;
  description: string;
}

interface EducationProps {
  initialData: EducationEntry[];
  onUpdate: (updatedData: EducationEntry[]) => void;
}

const EducationSchema = Yup.object().shape({
  educationEntries: Yup.array().of(
    Yup.object().shape({
      School: Yup.string().required('School is required'),
      Degree: Yup.string().required('Degree is required'),
      startDate: Yup.string().required('Start date is required'),
      endDate: Yup.string().required('End date is required'),
      city: Yup.string().required('City is required'),
      description: Yup.string().required('Description is required'),
    }),
  ),
});

const Education: React.FC<EducationProps> = ({ initialData, onUpdate }) => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleAccordionChange = (id: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? id : false);
  };

  return (
    <Formik
      initialValues={{ educationEntries: initialData }}
      validationSchema={EducationSchema}
      onSubmit={(values) => {
        onUpdate(values.educationEntries);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Box
            p={2}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '16px',
            }}
          >
            <Typography sx={{ fontSize: '18px', fontWeight: '600', fontFamily: 'Poppins', textAlign: 'left' }}>
              Education
            </Typography>
            <FieldArray name="educationEntries">
              {({ push }) => (
                <>
                  {values.educationEntries.map((entry, index) => (
                    <Accordion
                      key={entry.id}
                      expanded={expanded === entry.id}
                      onChange={handleAccordionChange(entry.id)}
                      sx={{
                        border: '1px solid #ccc',
                        borderRadius: '8px !important',
                        marginBlock: '16px !important',
                        boxShadow: 'none !important',

                        '&.Mui-expanded': {
                          borderTopWidth: '1px !important',
                          marginBlock: '16px !important',
                          boxShadow: 'none !important',
                        },
                        backgroundColor: '#FFF',
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: '500',
                            fontFamily: 'Poppins',
                            color: '#2B2A44',
                          }}
                        >
                          {entry.School || 'New Entry'}
                        </Typography>
                      </AccordionSummary>
                      {expanded && (
                        <Divider
                          variant="middle"
                          sx={{
                            height: '1px',
                            marginBottom: '16px',
                            backgroundColor: '#EFEAEA',
                            borderRadius: '4px',
                          }}
                        />
                      )}
                      <AccordionDetails>
                        <Box display="flex" flexDirection="column" gap={2}>
                          <Box display="flex" gap={2}>
                            <Box flex={1}>
                              <InputLabel>School</InputLabel>
                              <Field
                                size="small"
                                name={`educationEntries[${index}].School`}
                                as={TextField}
                                placeholder="School"
                                variant="outlined"
                                fullWidth
                                onChange={(e: any) => {
                                  const school = e.target.value;
                                  setFieldValue(`educationEntries[${index}].School`, school);
                                }}
                                sx={{ borderRadius: '8px' }}
                              />
                            </Box>
                            <Box flex={1}>
                              <InputLabel>Degree</InputLabel>
                              <Field
                                size="small"
                                name={`educationEntries[${index}].Degree`}
                                as={TextField}
                                placeholder="Degree"
                                variant="outlined"
                                fullWidth
                                sx={{ borderRadius: '8px' }}
                              />
                            </Box>
                          </Box>
                          <Box display="flex" gap={2} justifyContent={'flex-start'}>
                            <Box flex={1}>
                              <InputLabel>Start Date</InputLabel>
                              <Field
                                size="small"
                                name={`educationEntries[${index}].startDate`}
                                as={TextField}
                                placeholder="MM/YY"
                                variant="outlined"
                                fullWidth
                                sx={{ borderRadius: '8px' }}
                              />
                            </Box>
                            <Box flex={1}>
                              <InputLabel>End Date</InputLabel>
                              <Field
                                size="small"
                                name={`educationEntries[${index}].endDate`}
                                as={TextField}
                                placeholder="MM/YY"
                                variant="outlined"
                                fullWidth
                                sx={{ borderRadius: '8px' }}
                              />
                            </Box>
                          </Box>
                          <Box>
                            <InputLabel>City</InputLabel>
                            <Field
                              size="small"
                              name={`educationEntries[${index}].city`}
                              as={TextField}
                              placeholder="City"
                              variant="outlined"
                              fullWidth
                              sx={{ borderRadius: '8px' }}
                            />
                          </Box>
                          <Box>
                            <InputLabel>Description</InputLabel>
                            <Field
                              size="small"
                              name={`educationEntries[${index}].description`}
                              as={TextField}
                              placeholder="Description"
                              variant="outlined"
                              fullWidth
                              multiline
                              rows={4}
                              sx={{ borderRadius: '8px' }}
                            />
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Button
                      onClick={() =>
                        push({
                          id: values.educationEntries.length + 1,
                          School: '',
                          Degree: '',
                          startDate: '',
                          endDate: '',
                          city: '',
                          description: '',
                        })
                      }
                      color="primary"
                      sx={{
                        marginTop: '16px',
                        alignSelf: 'flex-start',

                        '&:hover': {
                          backgroundColor: '#FFF',
                        },
                      }}
                    >
                      + Add More
                    </Button>
                  </Box>
                </>
              )}
            </FieldArray>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Education;
