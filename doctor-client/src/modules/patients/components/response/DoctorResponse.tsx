import { Box, Grid, Button } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import CustomTextField from "../../../../core/components/CustomTextField";
import Header from "../../../../core/components/Header";
// import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../../core/api/api";
import endpoints from "../../../../core/api/endpoints";
import { StringLiteral } from "typescript";
import AlertService from "../../../../core/services/alert-service";

const DoctorResponce = ({
  patientId,
  consultationReqsData,
}: {
  patientId: any;
  consultationReqsData: any;
}) => {
  // const [editing, setEditing] = useState<boolean>(false)
  const [prediction, setPrediction] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const onSubmitConsultatiionReq = (values: any) => {
    if (patientId) {
      axios
        .patch(endpoints.consultationReq + patientId, {
          ResponseMessage: values.message,
        })
        .then((res: any) => {
          if (res) {
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

  useEffect(() => {
    if (consultationReqsData?.radiologyImage !== "") {
      axios
        .post("http://localhost:5000/predict", {
          url: consultationReqsData?.radiologyImage,
        })
        .then((res: any) => {
          console.log(res, "res");
          setPrediction(
            res.data.prediction == "Yes"
              ? true
              : res.data.prediction == "No"
              ? false
              : null
          );
        })
        .catch((err: any) => {
          console.log(err);
          AlertService.showAlert(`${err.message}`, "error");
        });
    }
  }, [consultationReqsData?.radiologyImage]);

  return (
    <Formik
      initialValues={
        consultationReqsData?.radiologyImage !== ""
          ? prediction == true
            ? {
                decision: "Tumor Detected.",
                message:
                  "Your recent MRI scan has been reviewed, and the results indicate the presence of a brain tumor. We recommend scheduling an appointment with your healthcare provider as soon as possible to discuss further diagnostic steps and treatment options.",
              }
            : prediction == false
            ? {
                decision: "No Tumor Detected.",
                message:
                  "Your recent MRI scan has been reviewed, and we are pleased to inform you that no brain tumor was detected. Please continue with your regular health check-ups and consult your healthcare provider if you have any concerns.",
              }
            : { message: "" }
          : { message: "" }
      }
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        onSubmitConsultatiionReq(values);
        resetForm();
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
            {consultationReqsData?.radiologyImage !== "" ? (
              <>
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

                <Grid item lg={5} md={5} sm={12} xs={12} sx={{ mt: 0.5 }}>
                  <Button
                    color="secondary"
                    fullWidth
                    variant="contained"
                    disableElevation
                    component={Link}
                    target="_blank"
                    to={`/dicom?file=${consultationReqsData?.radiologyImage}`}
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
              </>
            ) : null}
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Header title="Consultation" dark />
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
