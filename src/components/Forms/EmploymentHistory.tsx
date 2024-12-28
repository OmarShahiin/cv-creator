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
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface EmploymentEntry {
  id: number;
  company: string;
  job_title: string;
  start_date: string;
  end_date: string | null;
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
      company: Yup.string().required('Company is required'),
      job_title: Yup.string().required('Job Title is required'),
      start_date: Yup.string().required('Start Date is required'),
      end_date: Yup.string().required('End Date is required'),
      location: Yup.string().required('Location is required'),
      description: Yup.string().required('Description is required'),
    }),
  ),
});

const EmploymentHistory: React.FC<EmploymentHistoryProps> = ({ initialData, onUpdate }) => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
  );
  const handleAccordionChange = (id: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    // if (!isReorderEnabled) {
    setExpanded(isExpanded ? id : false);
    // }
  };

  const handleDragEnd = (event: any, values: any, setFieldValue: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = values.employmentEntries.findIndex((entry: any) => entry.id === active.id);
      const newIndex = values.employmentEntries.findIndex((entry: any) => entry.id === over.id);

      const newItems = arrayMove(values.employmentEntries, oldIndex, newIndex);
      setFieldValue('employmentEntries', newItems);
    }
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
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography sx={{ fontSize: '18px', fontWeight: '600', fontFamily: 'Poppins' }}>
                Employment History
              </Typography>
            </Box>
            <FieldArray name="employmentEntries">
              {({ push, remove }) => (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleDragEnd(event, values, setFieldValue)}
                >
                  <SortableContext
                    items={values.employmentEntries.map((entry) => entry.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {values.employmentEntries.map((entry, index) => (
                      <SortableItem key={entry.id} id={entry.id} isReorderEnabled={true}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            alignItems: 'flex-start',
                            marginBottom: '16px',
                          }}
                        >
                          <Accordion
                            expanded={expanded === entry.id}
                            onChange={handleAccordionChange(entry.id)}
                            sx={{
                              border: '1px solid #ccc',
                              borderRadius: '8px !important',
                              boxShadow: 'none !important',
                              backgroundColor: '#FFF',
                              flex: 1,
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
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
                            <Divider variant="middle" />
                            <AccordionDetails>
                              <Box display="flex" flexDirection="column" gap={2}>
                                <Box display="flex" gap={2}>
                                  <Box flex={1}>
                                    <InputLabel>Company</InputLabel>
                                    <Field
                                      size="small"
                                      name={`employmentEntries[${index}].company`}
                                      as={TextField}
                                      placeholder="Company"
                                      variant="outlined"
                                      fullWidth
                                      sx={{ borderRadius: '8px' }}
                                    />
                                  </Box>
                                  <Box flex={1}>
                                    <InputLabel>Job Title</InputLabel>
                                    <Field
                                      size="small"
                                      name={`employmentEntries[${index}].job_title`}
                                      as={TextField}
                                      placeholder="Job Title"
                                      variant="outlined"
                                      fullWidth
                                      sx={{ borderRadius: '8px' }}
                                    />
                                  </Box>
                                </Box>
                                <Box display="flex" gap={2}>
                                  <Box flex={1}>
                                    <InputLabel>Start Date</InputLabel>
                                    <Field name={`employmentEntries[${index}].start_date`}>
                                      {({ field, form }: any) => (
                                        <DatePicker
                                          value={dayjs(field.value)}
                                          onChange={(date) => {
                                            form.setFieldValue(
                                              `employmentEntries[${index}].start_date`,
                                              dayjs(date).format('DD-MM-YYYY'),
                                            );
                                          }}
                                          format="DD-MM-YYYY"
                                          slotProps={{
                                            textField: {
                                              size: 'small',
                                              sx: {
                                                // backgroundColor: 'red',
                                                width: '100%',
                                              },
                                            },
                                          }}
                                        />
                                      )}
                                    </Field>
                                  </Box>
                                  <Box flex={1}>
                                    <InputLabel>End Date</InputLabel>
                                    <Field name={`employmentEntries[${index}].end_date`}>
                                      {({ field, form }: any) => (
                                        <DatePicker
                                          value={field?.value ? dayjs(field?.value) : undefined}
                                          onChange={(date) => {
                                            form.setFieldValue(
                                              `employmentEntries[${index}].end_date`,
                                              dayjs(date).format('DD-MM-YYYY'),
                                            );
                                          }}
                                          format="DD-MM-YYYY"
                                          slotProps={{
                                            textField: {
                                              size: 'small',
                                              sx: {
                                                // backgroundColor: 'red',
                                                width: '100%',
                                              },
                                            },
                                          }}
                                        />
                                      )}
                                    </Field>
                                  </Box>
                                </Box>
                                <Box>
                                  <InputLabel>Location</InputLabel>
                                  <Field
                                    size="small"
                                    name={`employmentEntries[${index}].location`}
                                    as={TextField}
                                    placeholder="Location"
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
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent toggling accordion
                              remove(index); // Remove the entry
                            }}
                            sx={{ marginLeft: '8px', marginTop: '5px' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </SortableItem>
                    ))}
                  </SortableContext>
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
                </DndContext>
              )}
            </FieldArray>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default EmploymentHistory;
