"use client"
import { Box, Button, Divider, FormHelperText, Grid, InputLabel, LinearProgress, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup"
import { useEffect, useState } from "react";
import React from "react";

interface ISignUpData {
    username: string
    password: string
    name: string
    phone: string
    gender: string
    birthdate: string
}

const signupSchema = new Yup.ObjectSchema({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
        .required()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(11, 'Must be exactly 11 digits')
        .max(11, 'Must be exactly 11 digits'),
    gender: Yup.string().required("Gender is required"),
    birthdate: Yup.string().required("Birthdate is required"),
})

const initialValues: ISignUpData = {
    username: '',
    password: '',
    name: '',
    phone: '',
    gender: '',
    birthdate: '',
}

export default function SignUpForm() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [age, setAge] = React.useState('');

    const handleSelectChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    const handleFormSubmit = async (values: ISignUpData) => {

    }
    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden', position: 'relative' }}>
            <Box sx={{
                width: '100vw',
                aspectRatio: '1 / 1',
                borderRadius: '50%',
                background: 'linear-gradient(90deg, #29f19c, #02a1f9)',
                position: 'absolute',
                left: '50%',
                top: '-50%',
                zIndex: '-1',
                animation: 'rotate 8s linear infinite',
                '@keyframes rotate': {
                    '0%': { transform: ' translate(-50%,-50%) rotate(0deg)' },
                    '100%': { transform: ' translate(-50%,-50%) rotate(360deg)' },
                },
            }} />
            <Box sx={{
                width: '100vw',
                height: '100vh',
                position: 'absolute',
                zIndex: '-2',
                backgroundColor: 'rgb(32, 37, 45)',
            }} />
            <Box sx={{
                backgroundColor: 'rgb(24, 29, 37)',
                // boxShadow: "10px 10px 10px #000000",
                color: 'white',
                padding: '2rem 2rem 5rem',
                borderTopRightRadius: '10px',
                borderTopLeftRadius: '10px',
                width: '25vw',
                // height: '70vh'
            }}>
                <Box sx={{ mb: '0.5rem', textAlign: 'center' }}>

                    <Typography variant="h2" sx={{ fontSize: { s: "1rem" }, mb: '0.5rem' }}>Sign Up</Typography>
                    <Typography variant="subtitle2">join Us Now!</Typography>
                </Box>
                <Divider sx={{ mb: '2rem' }} />
                <Box sx={{
                    color: 'black',
                    pt: 2,
                }}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={signupSchema}
                        onSubmit={(values) => { handleFormSubmit(values); console.log(values) }}
                    >
                        {({
                            values,
                            touched,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                            <Box component="form" onSubmit={handleSubmit}>
                                <Stack direction={"column"} gap={2}>
                                    <TextField
                                        sx={{
                                            borderRadius: '4px', outline: 'none', border: 'none',
                                            '& .MuiFilledInput-root': {
                                                backgroundColor: '#f0f0f0',
                                                borderRadius: '4px',
                                                '&:hover': {
                                                    backgroundColor: '#f0f0f0', // Change this to your desired hover fill color
                                                },
                                                '&:focus': {
                                                    backgroundColor: '#f0f0f0', // Change this to your desired hover fill color
                                                },
                                            },

                                        }}
                                        required
                                        title="Username*"
                                        variant="filled"
                                        size="small"
                                        name="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Username"
                                        helperText={
                                            errors.username && touched.username ? errors.username : ""
                                        }
                                        error={errors.username && touched.username ? true : false}
                                        inputProps={{
                                            style: { padding: '10px' },
                                        }}
                                    />
                                    <TextField
                                        sx={{
                                            borderRadius: '4px', outline: 'none', border: 'none',
                                            '& .MuiFilledInput-root': {
                                                backgroundColor: '#f0f0f0',
                                                borderRadius: '4px',
                                                '&:hover': {
                                                    backgroundColor: '#f0f0f0',
                                                },

                                            },

                                        }}
                                        title="Password*"
                                        variant="filled"
                                        required
                                        size="small"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Password"
                                        type="password"
                                        helperText={
                                            errors.password && touched.password ? errors.password : ""
                                        }
                                        error={errors.password && touched.password ? true : false}
                                        inputProps={{
                                            style: { padding: '10px' },
                                        }}
                                    />
                                    <TextField
                                        sx={{
                                            borderRadius: '4px', outline: 'none', border: 'none',
                                            '& .MuiFilledInput-root': {
                                                backgroundColor: '#f0f0f0',
                                                borderRadius: '4px',
                                                '&:hover': {
                                                    backgroundColor: '#f0f0f0',
                                                },

                                            },

                                        }}
                                        title="Password*"
                                        variant="filled"
                                        required
                                        size="small"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Name"
                                        type="name"
                                        helperText={
                                            errors.name && touched.name ? errors.name : ""
                                        }
                                        error={errors.name && touched.name ? true : false}
                                        inputProps={{
                                            style: { padding: '10px' },
                                        }}
                                    />
                                    <Grid container spacing={2}>
                                        <Grid item lg={6} md={6} sm={6} xs={12} >
                                            <TextField
                                                sx={{
                                                    width: '100%',
                                                    borderRadius: '4px', outline: 'none', border: 'none',
                                                    '& .MuiFilledInput-root': {
                                                        backgroundColor: '#f0f0f0',
                                                        borderRadius: '4px',
                                                        '&:hover': {
                                                            backgroundColor: '#f0f0f0',
                                                        },

                                                    },

                                                }}
                                                title="phone*"
                                                variant="filled"
                                                required
                                                size="small"
                                                name="phone"
                                                value={values.phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Phone Number"
                                                type="phone"
                                                helperText={
                                                    errors.phone && touched.phone ? errors.phone : ""
                                                }
                                                error={errors.phone && touched.phone ? true : false}
                                                inputProps={{
                                                    style: { padding: '10px' },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={12} >
                                            <Select
                                                value={age}
                                                placeholder="Gender"
                                                size="small"
                                                onChange={handleSelectChange}
                                                sx={{
                                                    width: '100%', height: '2.65rem', borderRadius: '4px', outline: 'none', border: 'none', backgroundColor: '#f0f0f0', color: 'black'
                                                }}
                                            >

                                                <MenuItem value={0} sx={{color:'inherit'}}>Male</MenuItem>
                                                <MenuItem value={1} sx={{color:'inherit'}}>Female</MenuItem>
                                            </Select>

                                        </Grid>
                                    </Grid>
                                    <TextField
                                        sx={{
                                            width: '100%',
                                            borderRadius: '4px', outline: 'none', border: 'none',
                                            '& .MuiFilledInput-root': {
                                                backgroundColor: '#f0f0f0',
                                                borderRadius: '4px',
                                                '&:hover': {
                                                    backgroundColor: '#f0f0f0',
                                                },

                                            },

                                        }}
                                        title="birthdate*"
                                        variant="filled"
                                        required
                                        size="small"
                                        name="birthdate"
                                        value={values.birthdate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Birthdate"
                                        type="birthdate"
                                        helperText={
                                            errors.birthdate && touched.birthdate ? errors.birthdate : ""
                                        }
                                        error={errors.birthdate && touched.birthdate ? true : false}
                                        inputProps={{
                                            style: { padding: '10px' },
                                            type: 'date',
                                        }}
                                    />
                                    <Button
                                        color="secondary"
                                        fullWidth
                                        variant="contained"
                                        disableElevation
                                        type="submit"
                                        disabled={loading}
                                        sx={{ background: 'linear-gradient(90deg, #29f19c, #02a1f9)' }}
                                    >
                                        Submit
                                    </Button>
                                    <a href="/login" style={{ textDecoration: 'none' }}>
                                        <Typography sx={{ width: '100%', textAlign: 'center', color: 'white', textDecoration: 'underline', cursor: 'pointer' }}>
                                            Already Have an Account?
                                        </Typography>
                                    </a>
                                </Stack>
                                <FormHelperText sx={{ color: "error.main", mt: 1, fontSize: "1rem", backgroundColor: 'transparent' }}>
                                    {error}
                                </FormHelperText>
                            </Box>
                        )}

                    </Formik>

                </Box>
                <LinearProgress color="info" sx={{ display: loading ? "block" : "none" }} />
            </Box>
        </Box>
    )
}