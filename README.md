# Brain Tumor Consultation System

## Table of Contents

1. [Introduction](#1-introduction)
2. [Project Demo](#2-project-demo)
3. [System Overview](#3-system-overview)
   - [Main Features](#main-features)
4. [Project Structure](#4-project-structure)
   - [Patient Server](#patient-server)
   - [Doctor Server](#doctor-server)
   - [Storage & Prediction Server](#storage--prediction-server)
5. [Workflow Overview](#5-workflow-overview)
   - [Patient Interaction](#patient-interaction)
   - [Doctor Interaction](#doctor-interaction)
   - [Final Step](#final-step)
6. [Clinical Decision Support System (CDSS)](#6-clinical-decision-support-system-cdss)
   - [CDSS Overview](#cdss-overview)
7. [DICOM Viewer](#7-dicom-viewer)
   - [DICOM Viewer Features](#dicom-viewer-features)
8. [Benefits](#8-benefits)
   - [Key Benefits](#key-benefits)
9. [Technologies](#9-technologies)

## 1. Introduction

- **A web-based system for medical consultation service.**
- **Specializes in Brain Tumor diagnosis and treatment.**
- **App operates in real-time for timely consultations.**

## 2. Project Demo
https://drive.google.com/file/d/1ti7VPOTQWvJ1RulaCu20WlsmuUubm45h/view?usp=drive_link

## 3. System Overview

### Main Features:

- **Patient registration and login.**
- **Submission of EHR data, complaints, vitals, and imaging scans.**
- **Doctor examination and response.**
- **Machine Learning model for Clinical Decision Support.**
- **DICOM viewer for imaging scans.**

## 4. Project Structure

### Patient Server:

- Handles registration, login, and submission of medical data and consultation requests.

### Doctor Server:

- Manages receipt of consultation requests, review of patient data and scans, and communication of consultation reports.

### Storage & Prediction Server:

- Stores medical data and imaging scans.
- Integrates the machine learning model for tumor classification.

## 5. Workflow Overview

### Patient Interaction:

1. **Signup & Login:**
   - Easy and secure process.
2. **Enter Medical History:**
   - User-friendly interface for EHR data, complaints, and vitals.
3. **Request Consultation:**
   - Upload imaging scans and submit requests easily.

### Doctor Interaction:

4. **Receive Consultation Requests:**
   - Comprehensive requests including EHR, complaints, vitals, and imaging scans.
5. **Review Data:**
   - Examine imaging scans and patient information.
6. **Send Consultation Report:**
   - Provide detailed consultation based on analysis and ML model output.

### Final Step:

7. **Patient Receives Report:**
   - Patient receives consultation report from the doctor.

## 6. Clinical Decision Support System (CDSS)

### CDSS Overview:

- **Integrated machine learning model.**
- **Assists doctors by classifying tumors as present or absent.**
- **Enhances diagnostic accuracy and efficiency.**

## 7. DICOM Viewer

### DICOM Viewer Features:

- **High-quality imaging visualization.**
- **User-friendly interface for doctors to analyze scans.**
- **Essential for accurate brain tumor diagnosis.**

## 8. Benefits

### Key Benefits:

- **Improved patient outcomes.**
- **Faster and more accurate diagnoses.**
- **Enhanced decision-making support for doctors.**
- **Consistency in brain tumor diagnosis.**
- **Efficient and effective brain tumor consultations.**

## 9. Technologies

- **React, TS for Frontend**
- **Node, Express, TS for Backend**
- **Flask, Python for Storage Server and Brain Tumor Prediction**
- **HL7 for data exchange between servers**
- **DICOM for Imaging Scans**
- **Cornerstone.js for DICOM Viewer**
