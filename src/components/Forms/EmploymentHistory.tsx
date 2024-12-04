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

interface EmploymentEntry {
  id: number;
  company: string;
  job_title: string;
  employer: string;
  start_date: string;
  end_date: string;
  location: string;
  description: string;
}

interface EmploymentHistoryProps {
  initialData: EmploymentEntry[];
  onUpdate: (updatedData: EmploymentEntry[]) => void;
}

const EmploymentSchema = Yup.object().shape({
  employmentEntries: Yup.array().of(
    Yup.object().shape({
      job_title: Yup.string().required('Job title is required'),
      company: Yup.string().required('Employer is required'),
      start_date: Yup.string().required('Start date is required'),
      end_date: Yup.string().required('End date is required'),
      location: Yup.string().required('City is required'),
      description: Yup.string().required('Description is required'),
    }),
  ),
});

const EmploymentHistory: React.FC<EmploymentHistoryProps> = ({ initialData, onUpdate }) => {
  console.log('initialData', initialData);
  const [expanded, setExpanded] = useState<number[]>([]); // Array to track expanded states

  const handleAccordionChange = (id: number) => {
    setExpanded((prev) => (prev.includes(id) ? prev.filter((expandedId) => expandedId !== id) : [...prev, id]));
  };

  return (
    <Formik
      initialValues={{ employmentEntries: initialData }}
      validationSchema={EmploymentSchema}
      onSubmit={(values) => {
        onUpdate(values.employmentEntries);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Box
            p={2}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              width: '100%',
            }}
          >
            <Typography sx={{ fontSize: '18px', textAlign: 'left', fontWeight: '600', fontFamily: 'Poppins' }}>
              Employment History
            </Typography>
            <FieldArray name="employmentEntries">
              {({ push }) => (
                <Box>
                  {values.employmentEntries.map((entry, index) => (
                    <Accordion
                      key={index}
                      expanded={expanded.includes(index)}
                      onChange={() => handleAccordionChange(index)}
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
                          {entry.company || 'New Entry'}
                        </Typography>
                      </AccordionSummary>
                      {expanded.includes(index) && (
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
                              <InputLabel>Job Title</InputLabel>
                              <Field
                                size="small"
                                name={`employmentEntries[${index}].job_title`}
                                as={TextField}
                                placeholder="Job title"
                                variant="outlined"
                                fullWidth
                                sx={{ borderRadius: '8px' }}
                              />
                            </Box>
                            <Box flex={1}>
                              <InputLabel>Employer</InputLabel>
                              <Field
                                size="small"
                                name={`employmentEntries[${index}].company`}
                                as={TextField}
                                placeholder="Employer"
                                variant="outlined"
                                fullWidth
                                sx={{ borderRadius: '8px' }}
                                onChange={(e: any) => {
                                  const employerValue = e.target.value;
                                  setFieldValue(`employmentEntries[${index}].company`, employerValue);
                                }}
                              />
                            </Box>
                          </Box>
                          <Box display="flex" gap={2}>
                            <Box flex={1}>
                              <InputLabel>Start Date</InputLabel>
                              <Field
                                size="small"
                                name={`employmentEntries[${index}].start_date`}
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
                                name={`employmentEntries[${index}].endDate`}
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
                              name={`employmentEntries[${index}].location`}
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
                              name={`employmentEntries[${index}].description`}
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
                          id: values.employmentEntries.length + 1,
                          companyName: '',
                          jobTitle: '',
                          employer: '',
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
                </Box>
              )}
            </FieldArray>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default EmploymentHistory;
