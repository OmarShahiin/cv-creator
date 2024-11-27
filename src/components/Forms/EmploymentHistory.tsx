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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

interface EmploymentEntry {
  id: number;
  companyName: string;
  jobTitle: string;
  employer: string;
  startDate: string;
  endDate: string;
  city: string;
  description: string;
}

interface EmploymentHistoryProps {
  initialData: EmploymentEntry[];
  onUpdate: (updatedData: EmploymentEntry[]) => void;
}

const EmploymentSchema = Yup.object().shape({
  employmentEntries: Yup.array().of(
    Yup.object().shape({
      jobTitle: Yup.string().required('Job title is required'),
      employer: Yup.string().required('Employer is required'),
      startDate: Yup.string().required('Start date is required'),
      endDate: Yup.string().required('End date is required'),
      city: Yup.string().required('City is required'),
      description: Yup.string().required('Description is required'),
    })
  ),
});

const EmploymentHistory: React.FC<EmploymentHistoryProps> = ({ initialData, onUpdate }) => {
  const [expanded, setExpanded] = useState<number[]>([]); // Array to track expanded states

  const handleAccordionChange = (id: number) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((expandedId) => expandedId !== id) : [...prev, id]
    );
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
            }}
          >
            <Typography sx={{ fontSize: '18px', fontWeight: '600', fontFamily: 'Poppins' }}>
              Employment History
            </Typography>
            <FieldArray name="employmentEntries">
              {({ push }) => (
                <>
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
                          {entry.companyName || 'New Entry'}
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
                              <Typography variant="caption">Job Title</Typography>
                              <Field
                                size="small"
                                name={`employmentEntries[${index}].jobTitle`}
                                as={TextField}
                                placeholder="Job title"
                                variant="outlined"
                                fullWidth
                                sx={{ borderRadius: '8px' }}
                              />
                            </Box>
                            <Box flex={1}>
                              <Typography variant="caption">Employer</Typography>
                              <Field
                                size="small"
                                name={`employmentEntries[${index}].employer`}
                                as={TextField}
                                placeholder="Employer"
                                variant="outlined"
                                fullWidth
                                sx={{ borderRadius: '8px' }}
                                onChange={(e: any) => {
                                  const employerValue = e.target.value;
                                  setFieldValue(`employmentEntries[${index}].employer`, employerValue);
                                  setFieldValue(`employmentEntries[${index}].companyName`, employerValue); // Sync companyName
                                }}
                              />
                            </Box>
                          </Box>
                          <Box display="flex" gap={2}>
                            <Box flex={1}>
                              <Typography variant="caption">Start Date</Typography>
                              <Field
                                size="small"
                                name={`employmentEntries[${index}].startDate`}
                                as={TextField}
                                placeholder="MM/YY"
                                variant="outlined"
                                fullWidth
                                sx={{ borderRadius: '8px' }}
                              />
                            </Box>
                            <Box flex={1}>
                              <Typography variant="caption">End Date</Typography>
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
                            <Typography variant="caption">City</Typography>
                            <Field
                              size="small"
                              name={`employmentEntries[${index}].city`}
                              as={TextField}
                              placeholder="City"
                              variant="outlined"
                              fullWidth
                              sx={{ borderRadius: '8px' }}
                            />
                          </Box>
                          <Box>
                            <Typography variant="caption">Description</Typography>
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
                    sx={{ marginTop: '16px' }}
                  >
                    + Add More
                  </Button>
                </>
              )}
            </FieldArray>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: '16px', textTransform: 'none' }}
            >
              Save Changes
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default EmploymentHistory;
