import { Box, Grid, Button } from '@mui/material';
import { Formik } from 'formik';
import React from 'react'
import CustomTextField from '../../../../core/components/CustomTextField';
import Header from '../../../../core/components/Header';

const DoctorResponce = () => {
    return (
        <Formik
            initialValues={{ message: '' }}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Header title='Consultation Request' dark />
                        </Grid>
                        <Grid item lg={12} md={12} sm={6} xs={12}>
                            <CustomTextField
                                enable={true}
                                dark
                                noLable
                                isRequired
                                name="message"
                                label="message"
                                multiline
                                value={values.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.message}
                                touched={touched.message}
                                width="100%"
                                props={{
                                    type: "text",
                                }}
                                sx={{
                                    backgroundColor: 'rgb(32, 37, 45)',
                                }}
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={6} xs={12}>
                            <Button
                                color="secondary"
                                fullWidth
                                variant="contained"
                                disableElevation
                                type="submit"
                                sx={{ background: 'linear-gradient(90deg, #29f19c, #02a1f9)' }}
                            >
                                Submit
                            </Button>
                        </Grid>

                    </Grid>
                </Box>
            )}
        </Formik>
    )
}

export default DoctorResponce