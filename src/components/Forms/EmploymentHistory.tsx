import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Button, Box } from '@mui/material';
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

const EmploymentSchema = Yup.object().shape({
  employmentEntries: Yup.array().of(
    Yup.object().shape({
      jobTitle: Yup.string().required('Job title is required'),
      employer: Yup.string().required('Employer is required'),
      startDate: Yup.string().required('Start date is required'),
      endDate: Yup.string().required('End date is required'),
      city: Yup.string().required('City is required'),
      description: Yup.string().required('Description is required'),
    }),
  ),
});

const EmploymentHistory: React.FC = () => {
  const [expanded, setExpanded] = useState<number | false>(false);
  const initialValues: { employmentEntries: EmploymentEntry[] } = {
    employmentEntries: [
      { id: 1, companyName: 'Coco', jobTitle: '', employer: '', startDate: '', endDate: '', city: '', description: '' },
      {
        id: 2,
        companyName: 'Remax',
        jobTitle: '',
        employer: '',
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
      {({ values }) => (
        <Form>
          <Box
            p={2}
            sx={{
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Employment History
            </Typography>
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
                        <Typography>{entry.companyName}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box display="flex" flexDirection="column" gap={2}>
                          <Box display="flex" gap={2}>
                            <Box flex={1}>
                              <Typography variant="caption">Job Title</Typography>
                              <Field
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
                                name={`employmentEntries[${index}].employer`}
                                as={TextField}
                                placeholder="Employer"
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
                        jobTitle: '',
                        employer: '',
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

export default EmploymentHistory;
