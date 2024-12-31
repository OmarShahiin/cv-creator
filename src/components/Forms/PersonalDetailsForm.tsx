import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { Typography, Avatar, Box, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface PersonalDetailsFormProps {
  initialData: {
    full_name: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    photo?: string;
    job_title: string;
  };
  onUpdate: (values: any) => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ initialData, onUpdate }) => {
  const handleChangeAndUpdate = (e: any, setFieldValue: any) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
    onUpdate({ [name]: value });
  };
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: '8px',
        paddingBlock: '23px',
        paddingInline: '23px',
        paddingBottom: '58px',
      }}
    >
      <Formik
        initialValues={{
          full_name: initialData.full_name || '',
          email: initialData.email || '',
          phone: initialData.phone || '',
          country: initialData.country || '',
          city: initialData.city || '',
          photo: initialData.photo || '',
        }}
        onSubmit={(values) => {
          console.log('values', values);
          // onUpdate(values);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: '600',
                fontFamily: 'Poppins',
                color: '#2B2A44',
                marginBottom: '16px',
                textAlign: 'left',
              }}
            >
              Personal Details
            </Typography>
            <Grid container rowGap={'16px'} spacing={'12px'}>
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                }}
              >
                <InputLabel
                  sx={{
                    color: '#000',
                    fontSize: '12px',
                    fontWeight: '400',
                    fontFamily: 'Poppins',
                    mb: '8px',
                  }}
                >
                  Full Name
                </InputLabel>
                <Field
                  size="small"
                  onChange={(e: any) => handleChangeAndUpdate(e, setFieldValue)}
                  component={TextField}
                  name="full_name"
                  placeholder="Full Name"
                  fullWidth
                  sx={{ borderRadius: '8px' }}
                />
              </Grid>
              <Grid
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                }}
                size={{
                  xs: 12,
                  sm: 6,
                }}
              >
                <Grid container justifyContent="flex-start" alignItems="center" direction="row" columnGap={2}>
                  <Avatar
                    alt="Profile Image"
                    src={values?.photo ? values?.photo : undefined}
                    sx={{ width: '47px', height: '47px', borderRadius: '10px' }}
                  />
                  <input
                    accept="image/*"
                    id="upload-image"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        onUpdate({ photo: file });

                        let reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function () {
                          setFieldValue('photo', reader.result);
                        };
                        reader.onerror = function (error) {
                          console.log('Error: ', error);
                        };
                      }
                    }}
                  />
                  <label htmlFor="upload-image">Upload image</label>
                </Grid>
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                }}
              >
                <InputLabel
                  sx={{
                    color: '#000',
                    fontSize: '12px',
                    fontWeight: '400',
                    fontFamily: 'Poppins',
                    mb: '8px',
                  }}
                >
                  Email
                </InputLabel>
                <Field size="small" component={TextField} name="email" placeholder="Email" fullWidth />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                }}
              >
                <InputLabel
                  sx={{
                    color: '#000',
                    fontSize: '12px',
                    fontWeight: '400',
                    fontFamily: 'Poppins',
                    mb: '8px',
                  }}
                >
                  Phone
                </InputLabel>
                <Field size="small" component={TextField} name="phone" placeholder="Phone" fullWidth />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                }}
              >
                <InputLabel
                  sx={{
                    color: '#000',
                    fontSize: '12px',
                    fontWeight: '400',
                    fontFamily: 'Poppins',
                    mb: '8px',
                  }}
                >
                  Country
                </InputLabel>
                <Field size="small" component={TextField} name="country" placeholder="Country" fullWidth />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                }}
              >
                <InputLabel
                  sx={{
                    color: '#000',
                    fontSize: '12px',
                    fontWeight: '400',
                    fontFamily: 'Poppins',
                    mb: '8px',
                  }}
                >
                  City
                </InputLabel>
                <Field size="small" component={TextField} name="city" placeholder="City" fullWidth />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PersonalDetailsForm;
