import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { Typography, Avatar, Box, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface PersonalDetailsFormProps {
  initialData: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    uploadImage?: File | string;
  };
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ initialData }) => {
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
          fullName: initialData.fullName || '',
          email: initialData.email || '',
          phone: initialData.phone || '',
          country: initialData.country || '',
          city: initialData.city || '',
          uploadImage: initialData.uploadImage || '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: '600',
                fontFamily: 'Poppins',
                color: '#2B2A44',
                marginBottom: '16px',
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
                  component={TextField}
                  name="fullName"
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
                    src={
                      typeof initialData.uploadImage === 'string' ? initialData.uploadImage : undefined
                    }
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
                        setFieldValue('uploadImage', file);
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
