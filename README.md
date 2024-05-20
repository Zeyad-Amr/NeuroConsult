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
10. [Contributors](#10-contributors)

## 1. Introduction

- **A web-based system for medical consultation service.**
- **Specializes in Brain Tumor diagnosis and treatment.**
- **App operates in real-time for timely consultations.**
- **Course project for HCIS2 applying on Networks in Medical Information System, Medical Information System Standards and CDSS.**

## 2. Project Demo

## 3. System Overview

### Main Features:

- **Patient registration and login.**
- **Submission of EHR data, complaints, vitals, and imaging scans.**
- **Doctor examination and response.**
- **Machine Learning model for Clinical Decision Support.**
- **DICOM viewer for imaging scans.**
- **Real-time functionality using web sockets and HL7 for data exchange.**

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


## 10. Contributors
<table>
    <tbody>
    <tr>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/Zeyad-Amr">
                <img alt="Zeyad Amr Fekry" src="https://avatars.githubusercontent.com/Zeyad-Amr" width="100px;">
                <br/>
                <sub><b>Zeyad Amr Fekry</b></sub>
            </a>
            <br/>
            <span>Full Stack</span>
        </td>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/AhmedRaouf481">
                <img alt="Ahmed Abd ElRaouf" src="https://avatars.githubusercontent.com/AhmedRaouf481" width="100px;">
                <br/>
                <sub><b>Ahmed Abd ElRaouf</b></sub>
            </a>
            <br/>
            <span>Full Stack</span>
        </td>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/Abdelrhman012">
                <img alt="Abdelrahman Yasser" src="https://avatars.githubusercontent.com/Abdelrhman012" width="100px;">
                <br/>
                <sub><b>Abdelrahman Yasser</b></sub>
            </a>
            <br/>
            <span>Frontend</span>
        </td>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/momen882001">
                <img alt="Mo'men Mohamed" src="https://avatars.githubusercontent.com/momen882001" width="100px;">
                <br/>
                <sub><b>Mo'men Mohamed</b></sub>
            </a>
            <br/>
            <span>Frontend</span>
        </td>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/Mazen-Aboulkhair">
                <img alt="Diaa Badr Eldin" src="https://avatars.githubusercontent.com/diaabadr" width="100px;">
                <br/>
                <sub><b>Diaa Badr Eldin</b></sub>
            </a>
            <br/>
            <span>Backend</span>
        </td>
    </tr>
</table>


### Submitted to:
Dr Eman Ayman & Eng Yara Wael

All rights reserved © 2024
