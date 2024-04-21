import React, { useEffect } from "react";
import { useLoading } from "../../services/loading-service";
import { Box } from "@mui/material";
import axios from "axios";
import api from "../../api/api";
import "./OverlapLoading.css";
import { BarLoader } from "react-spinners";

const LoadingOverlay = () => {
  const { loading, setLoadingState } = useLoading();

  useEffect(() => {
    const requestInterceptorCustomAxios = api.interceptors.request.use(
      (config) => {
        setLoadingState(true);
        return config;
      },
      (error) => {
        setLoadingState(false);
        return Promise.reject(error);
      }
    );

    const responseInterceptorCustomAxios = api.interceptors.response.use(
      (response: any) => {
        setLoadingState(false);
        return response;
      },
      (error: any) => {
        setLoadingState(false);
        return Promise.reject(error);
      }
    );

    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        setLoadingState(true);
        return config;
      },
      (error) => {
        setLoadingState(false);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response: any) => {
        setLoadingState(false);
        return response;
      },
      (error: any) => {
        setLoadingState(false);
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptorCustomAxios);
      api.interceptors.response.eject(responseInterceptorCustomAxios);
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [setLoadingState]);

  return (
    <Box className="image-cover">
      <Box
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <Box className="content">
          <h2>HCIS2</h2>
          <h2>HCIS2</h2>
        </Box>
        <Box>
          <BarLoader color={"#fff"} loading={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingOverlay;
