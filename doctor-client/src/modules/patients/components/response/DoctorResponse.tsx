import { Box, Grid, Button } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import CustomTextField from "../../../../core/components/CustomTextField";
import Header from "../../../../core/components/Header";
// import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Link } from "react-router-dom";
import axios from "../../../../core/api/api";
import endpoints from "../../../../core/api/endpoints";
import { StringLiteral } from "typescript";
import AlertService from "../../../../core/services/alert-service";

const DoctorResponce = ({ patientId }: any) => {
  // const [editing, setEditing] = useState<boolean>(false)

  const onSubmitConsultatiionReq = (values: any) => {
    if (patientId) {
      axios
        .patch(endpoints.consultationReq + patientId, {
          ResponseMessage: values.message,
        })
        .then((res: any) => {
          if (res.status === 201) {
            AlertService.showAlert(
              "Consultation Request sended successfully",
              "success"
            );
          }
          console.log(res, "res");
        })
        .catch((err: any) => {
          console.log(err, "err");
          AlertService.showAlert(`${err.message}`, "error");
        });
    }
  };

  return (
    <Formik
      initialValues={{ message: "", decision: "Yes" }}
      onSubmit={(values , {resetForm}) => {
        console.log(values);
        onSubmitConsultatiionReq(values);
        resetForm()
      }}
      enableReinitialize
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
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <CustomTextField
                dark
                noLable
                isRequired
                enable={true}
                name="decision"
                label="decision"
                value={values.decision}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.decision}
                touched={touched.decision}
                width="100%"
                props={{
                  type: "text",
                }}
                sx={{
                  backgroundColor: "rgb(32, 37, 45)",
                }}
              />
            </Grid>
            {/* <Grid item lg={2} md={2} sm={2} xs={2} sx={{ mt: 0.5 }}>
                            <Box sx={{
                                height: '3.5rem',
                                transition: ' 0.3s ease-in-out',
                                backgroundColor: editing ? '#29f19c' : ' rgb(32, 37, 45)',
                                color: editing ? 'rgb(32, 37, 45)' : ' white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '5px',
                                cursor:'pointer',
                            }}
                                onClick={() => setEditing(!editing)}
                            >
                                <EditRoundedIcon />
                            </Box>
                        </Grid> */}
            <Grid item lg={5} md={5} sm={12} xs={12} sx={{ mt: 0.5 }}>
              <Button
                color="secondary"
                fullWidth
                variant="contained"
                disableElevation
                component={Link}
                to="/dicom"
                type="button"
                sx={{
                  background: "linear-gradient(90deg, #29f19c, #02a1f9)",
                  height: "3.5rem",
                  color: "rgb(32, 37, 45)",
                }}
              >
                View Image
              </Button>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Header title="Consultation Request" dark />
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
                  backgroundColor: "rgb(32, 37, 45)",
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
                sx={{
                  background: "linear-gradient(90deg, #29f19c, #02a1f9)",
                  color: "rgb(32, 37, 45)",
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Formik>
  );
};

export default DoctorResponce;
