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
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { arrayMove, useSortable } from '@dnd-kit/sortable';

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

const SortableItem = ({
  id,
  children,
  isReorderEnabled,
}: {
  id: number;
  children: React.ReactNode;
  isReorderEnabled: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <Box ref={setNodeRef} style={style} {...(isReorderEnabled ? { ...attributes, ...listeners } : {})}>
      {children}
    </Box>
  );
};

const Education: React.FC<EducationProps> = ({ initialData, onUpdate }) => {
  const [expanded, setExpanded] = useState<number | false>(false);
  const [isReorderEnabled, setIsReorderEnabled] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleAccordionChange = (id: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    if (!isReorderEnabled) {
      setExpanded(isExpanded ? id : false);
    }
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
              <Box>
                rearrage
                <IconButton onClick={() => setIsReorderEnabled(!isReorderEnabled)}>
                  <SwapVertIcon color={isReorderEnabled ? 'primary' : 'inherit'} />
                </IconButton>
              </Box>
            </Box>
            <FieldArray name="educationEntries">
              {({ push, remove }) => (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleDragEnd(event, values, setFieldValue)}
                >
                  <SortableContext
                    items={values.educationEntries.map((entry) => entry.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {values.educationEntries.map((entry, index) => (
                      <SortableItem key={entry.id} id={entry.id} isReorderEnabled={isReorderEnabled}>
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
                                  flexGrow: 1,
                                }}
                              >
                                {entry.School || 'New Entry'}
                              </Typography>
                            </AccordionSummary>
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

export default Education;
