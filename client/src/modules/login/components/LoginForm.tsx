"use client"
import { Box, Button, Divider, FormHelperText, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup"
import { useEffect, useState } from "react";

interface ILoginData {
  username: string
  password: string
}

const loginSchema = new Yup.ObjectSchema({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required")
})

export default function LoginForm() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleFormSubmit = async (values: ILoginData) => {

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
        padding: '2rem 2rem 14rem',
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px',
        width: '25vw',
        // height: '70vh'
      }}>
        <Box sx={{ mb: '0.5rem', textAlign: 'center' }}>

          <Typography variant="h2" sx={{ fontSize: { s: "1rem" }, mb: '0.5rem' }}>Login</Typography>
          <Typography variant="subtitle2">Hi, welcome back</Typography>
        </Box>
        <Divider sx={{ mb: '2rem' }} />
        <Box sx={{
          color: 'black',
          pt: 2,
        }}>
          <Formik
            initialValues={{
              username: "",
              password: ""
            }}
            validationSchema={loginSchema}
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
                    placeholder="Abdelrhman012"
                    helperText={
                      errors.username && touched.username ? errors.username : ""
                    }
                    error={errors.username && touched.username ? true : false}
                    InputProps={{
                      style: { padding: '0px' }, 
                  }}
                  />
                  <TextField
                    sx={{
                      borderRadius: '4px', outline: 'none', border: 'none',
                      '& .MuiFilledInput-root': {
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px',
                        '&:hover': {
                          backgroundColor: '#f0f0f0', // Change this to your desired hover fill color
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
                    placeholder="Enter your password"
                    type="password"
                    helperText={
                      errors.password && touched.password ? errors.password : ""
                    }
                    error={errors.password && touched.password ? true : false}

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
                  <Typography sx={{ width: '100%', textAlign: 'center', color: 'white' }}>
                    Don't Have an Account?
                  </Typography>
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