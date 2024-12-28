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

interface SocialEntry {
  id: number;
  label: string;
  link: string;
}

interface SocialProps {
  initialData: SocialEntry[];
  onUpdate: (updatedData: SocialEntry[]) => void;
}

const SocialSchema = Yup.object().shape({
  socialEntries: Yup.array().of(
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

const Social: React.FC<SocialProps> = ({ initialData, onUpdate }) => {
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
      const oldIndex = values.socialEntries.findIndex((entry: any) => entry.id === active.id);
      const newIndex = values.socialEntries.findIndex((entry: any) => entry.id === over.id);

      const newItems = arrayMove(values.socialEntries, oldIndex, newIndex);
      setFieldValue('socialEntries', newItems);
    }
  };

  return (
    <Formik
      initialValues={{ socialEntries: initialData }}
      validationSchema={SocialSchema}
      onSubmit={(values) => {
        onUpdate(values.socialEntries);
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
                Websites & Social Links
              </Typography>
            </Box>
            <FieldArray name="socialEntries">
              {({ push, remove }) => (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleDragEnd(event, values, setFieldValue)}
                >
                  <SortableContext
                    items={values.socialEntries.map((entry) => entry.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {values.socialEntries.map((entry, index) => (
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
                            expanded={expanded === index}
                            onChange={handleAccordionChange(index)}
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
                                {entry.label || 'New Entry'}
                              </Typography>
                            </AccordionSummary>
                            <Divider variant="middle" />

                            <AccordionDetails>
                              <Box display="flex" flexDirection="column" gap={2}>
                                <Box display="flex" gap={2}>
                                  <Box flex={1}>
                                    <InputLabel>label</InputLabel>
                                    <Field
                                      size="small"
                                      name={`socialEntries[${index}].label`}
                                      as={TextField}
                                      placeholder="School"
                                      variant="outlined"
                                      fullWidth
                                      sx={{ borderRadius: '8px' }}
                                    />
                                  </Box>
                                  <Box flex={1}>
                                    <InputLabel>Link</InputLabel>
                                    <Field
                                      size="small"
                                      name={`socialEntries[${index}].link`}
                                      as={TextField}
                                      placeholder="Degree"
                                      variant="outlined"
                                      fullWidth
                                      sx={{ borderRadius: '8px' }}
                                    />
                                  </Box>
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
                          id: values.socialEntries.length + 1,
                          label: '',
                          link: '',
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

export default Social;
