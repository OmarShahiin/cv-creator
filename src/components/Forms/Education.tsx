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
  School: string;
  Degree: string;
  startDate: string;
  endDate: string;
  city: string;
  description: string;
}

const EmploymentSchema = Yup.object().shape({
  employmentEntries: Yup.array().of(
    Yup.object().shape({
      School: Yup.string().required('School title is required'),
      Degree: Yup.string().required('Degree is required'),
      startDate: Yup.string().required('Start date is required'),
      endDate: Yup.string().required('End date is required'),
      city: Yup.string().required('City is required'),
      description: Yup.string().required('Description is required'),
    }),
  ),
});

const Education: React.FC = () => {
  const [expanded, setExpanded] = useState<number | false>(false);
  const initialValues: { employmentEntries: EmploymentEntry[] } = {
    employmentEntries: [
      {
        id: 2,
        companyName: 'School Name', // default value
        School: 'School Name',
        Degree: '', // default to same as companyName
        startDate: '',
        endDate: '',
        city: '',
        description: '',
      },
    ],
  };

  const handleAccordionChange = (id: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? id : false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EmploymentSchema}
      onSubmit={(values) => {
        console.log('Submitted values:', values);
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
            <Typography sx={{ fontSize: '18px', fontWeight: '600', fontFamily: 'Poppins' }}>Education</Typography>
            <FieldArray name="employmentEntries">
              {({ push }) => (
                <>
                  {values.employmentEntries.map((entry, index) => (
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
                            // marginBottom: '16px',
                          }}
                        >
                          {entry.School}
                        </Typography>
                        {/* Show company name as accordion title */}
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
                              <Typography variant="caption">School</Typography>
                              <Field
                                size={'small'}
                                name={`employmentEntries[${index}].School`}
                                as={TextField}
                                placeholder="School"
                                variant="outlined"
                                fullWidth
                                onChange={(e: any) => {
                                  // Update employer and companyName in real-time
                                  const school = e.target.value;
                                  setFieldValue(`employmentEntries[${index}].School`, school);
                                  setFieldValue(`employmentEntries[${index}].companyName`, school); // sync companyName with employer
                                }}
                                sx={{ borderRadius: '8px' }}
                              />
                            </Box>
                            <Box flex={1}>
                              <Typography variant="caption">Degree</Typography>
                              <Field
                                size={'small'}
                                name={`employmentEntries[${index}].Degree`}
                                as={TextField}
                                placeholder="Degree"
                                variant="outlined"
                                fullWidth
                                sx={{ borderRadius: '8px' }}
                              />
                            </Box>
                          </Box>
                          <Box display="flex" gap={2}>
                            <Box flex={1} display="flex" gap={2}>
                              <Box>
                                <Typography variant="caption">Start Date</Typography>
                                <Field
                                  size={'small'}
                                  name={`employmentEntries[${index}].startDate`}
                                  as={TextField}
                                  placeholder="MM/YY"
                                  variant="outlined"
                                  fullWidth
                                  sx={{ borderRadius: '8px' }}
                                />
                              </Box>
                              <Box>
                                <Typography variant="caption">End Date</Typography>
                                <Field
                                  size={'small'}
                                  name={`employmentEntries[${index}].endDate`}
                                  as={TextField}
                                  placeholder="MM/YY"
                                  variant="outlined"
                                  fullWidth
                                  sx={{ borderRadius: '8px' }}
                                />
                              </Box>
                            </Box>

                            <Box flex={1}>
                              <Typography variant="caption">City</Typography>
                              <Field
                                size={'small'}
                                name={`employmentEntries[${index}].city`}
                                as={TextField}
                                placeholder="City"
                                variant="outlined"
                                fullWidth
                                sx={{ borderRadius: '8px' }}
                              />
                            </Box>
                          </Box>
                          <Box>
                            <Typography variant="caption">Description</Typography>
                            <Field
                              size={'small'}
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
                        companyName: `Company ${values.employmentEntries.length + 1}`,
                        employer: `Company ${values.employmentEntries.length + 1}`, // default employer
                        jobTitle: '',
                        startDate: '',
                        endDate: '',
                        city: '',
                        description: '',
                      })
                    }
                    color="primary"
                  >
                    + Add More
                  </Button>
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
