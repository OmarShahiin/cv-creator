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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import dayjs from 'dayjs';
interface EducationEntry {
  id: number;
  school: string;
  degree: string;
  start_date: Date | null;
  end_date: Date | null;
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
      school: Yup.string(),
      degree: Yup.string(),
      start_date: Yup.date().nullable(),
      end_date: Yup.date().nullable(),
      city: Yup.string(),
      description: Yup.string(),
    }),
  ),
});

const Education: React.FC<EducationProps> = ({ initialData, onUpdate }) => {
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
    setExpanded(isExpanded ? id : false);
  };

  const handleDragEnd = (event: any, values: any, setFieldValue: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = values.educationEntries.findIndex((entry: any) => entry.id === active.id);
      const newIndex = values.educationEntries.findIndex((entry: any) => entry.id === over.id);

      const newItems = arrayMove(values.educationEntries, oldIndex, newIndex);
      setFieldValue('educationEntries', newItems);
    }
  };

  const handleChange = (e: any, index: number, setFieldValue: any, values: any, name: string) => {
    const value = e.target.value;

    setFieldValue(`${e.target.name}`, value);
    const updatedData = [...values.educationEntries];
    updatedData[index][name] = value;
    onUpdate(updatedData);
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
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography sx={{ fontSize: '18px', fontWeight: '600', fontFamily: 'Poppins' }}>Education</Typography>
            </Box>
            <FieldArray name="educationEntries">
              {({ push, remove }) => (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleDragEnd(event, values, setFieldValue)}
                >
                  <SortableContext
                    items={values.educationEntries.map((entry, index) => entry?.id ?? index + 1)}
                    strategy={verticalListSortingStrategy}
                  >
                    {values.educationEntries.map((entry, index) => (
                      <SortableItem key={entry?.id ?? index + 1} id={entry?.id ?? index + 1} isReorderEnabled={true}>
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
                            expanded={expanded === (entry?.id ?? index + 1)}
                            onChange={handleAccordionChange(entry?.id ?? index + 1)}
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
                                {entry.school || 'New Entry'}
                              </Typography>
                            </AccordionSummary>
                            <Divider variant="middle" />

                            <AccordionDetails>
                              <Box display="flex" flexDirection="column" gap={2}>
                                <Box display="flex" gap={2}>
                                  <Box flex={1}>
                                    <InputLabel>School</InputLabel>
                                    <Field
                                      onChange={(e: any) => handleChange(e, index, setFieldValue, values, 'school')}
                                      size="small"
                                      name={`educationEntries[${index}].school`}
                                      as={TextField}
                                      placeholder="School"
                                      variant="outlined"
                                      fullWidth
                                      sx={{ borderRadius: '8px' }}
                                    />
                                  </Box>
                                  <Box flex={1}>
                                    <InputLabel>Degree</InputLabel>
                                    <Field
                                      size="small"
                                      onChange={(e: any) => handleChange(e, index, setFieldValue, values, 'degree')}
                                      name={`educationEntries[${index}].degree`}
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
                                    <Field name={`educationEntries[${index}].start_date`}>
                                      {({ field, form }: any) => (
                                        <DatePicker
                                          value={dayjs(field.value)}
                                          onChange={(date: any) => {
                                            form.setFieldValue(
                                              `educationEntries[${index}].start_date`,
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
                                    <Field name={`educationEntries[${index}].end_date`}>
                                      {({ field, form }: any) => (
                                        <DatePicker
                                          value={dayjs(field.value)}
                                          onChange={(date) => {
                                            form.setFieldValue(
                                              `educationEntries[${index}].end_date`,
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
                                  <InputLabel>City</InputLabel>
                                  <Field
                                    size="small"
                                    name={`educationEntries[${index}].city`}
                                    as={TextField}
                                    onChange={(e: any) => handleChange(e, index, setFieldValue, values, 'city')}
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
                                    onChange={(e: any) => handleChange(e, index, setFieldValue, values, 'description')}
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
                          id: values.educationEntries.length + 1,
                          School: '',
                          Degree: '',
                          startDate: null,
                          endDate: null,
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

export default Education;
