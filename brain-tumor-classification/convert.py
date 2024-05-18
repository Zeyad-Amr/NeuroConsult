import shutil
import os
import pydicom  # type: ignore
from pydicom.dataset import Dataset, FileDataset  # type: ignore
from pydicom.uid import generate_uid, ExplicitVRLittleEndian  # type: ignore
from datetime import datetime
from PIL import Image  # type: ignore
import numpy as np


def jpeg_to_dicom(jpeg_path, dicom_path):
    try:
        # Read the JPEG image
        img = Image.open(jpeg_path)
        img_array = np.array(img)

        # Create a dummy DICOM dataset
        file_meta = Dataset()
        file_meta.MediaStorageSOPClassUID = generate_uid()
        file_meta.MediaStorageSOPInstanceUID = generate_uid()
        file_meta.TransferSyntaxUID = ExplicitVRLittleEndian
        file_meta.ImplementationClassUID = generate_uid()

        ds = FileDataset(dicom_path, {}, file_meta=file_meta,
                         preamble=b"\0" * 128)

        # Set necessary fields
        ds.SOPClassUID = generate_uid()
        ds.SOPInstanceUID = generate_uid()
        ds.PatientName = "Doe^John"
        ds.PatientID = "123456"
        ds.Modality = "OT"
        ds.StudyInstanceUID = generate_uid()
        ds.SeriesInstanceUID = generate_uid()
        ds.StudyID = "1"
        ds.SeriesNumber = "1"
        ds.InstanceNumber = "1"
        ds.ImageComments = "Converted from JPEG"
        ds.ContentDate = datetime.now().strftime('%Y%m%d')
        ds.ContentTime = datetime.now().strftime('%H%M%S')

        # Set the image data
        ds.Rows, ds.Columns = img_array.shape[0], img_array.shape[1]
        ds.SamplesPerPixel = 3 if img_array.ndim == 3 else 1
        ds.PhotometricInterpretation = "RGB" if ds.SamplesPerPixel == 3 else "MONOCHROME2"
        ds.BitsAllocated = 8
        ds.BitsStored = 8
        ds.HighBit = 7
        ds.PixelRepresentation = 0
        ds.is_little_endian = True
        ds.is_implicit_VR = False
        # Set Planar Configuration
        ds.PlanarConfiguration = 0 if ds.PhotometricInterpretation == "RGB" else None

        ds.PixelData = img_array.tobytes()

        # Save the DICOM file
        ds.save_as(dicom_path)
    except Exception as e:
        print(f"Error converting {jpeg_path} to DICOM: {e}")


def dicom_to_jpeg(dicom_path, jpeg_path):
    try:
        # Read the DICOM file
        ds = pydicom.dcmread(dicom_path)

        # Extract the image data
        img_array = ds.pixel_array

        # Convert to a PIL image
        if ds.PhotometricInterpretation == "RGB":
            img = Image.fromarray(img_array, 'RGB')
        else:
            img = Image.fromarray(img_array, 'L')

        # Save as JPEG
        img.save(jpeg_path)
    except Exception as e:
        print(f"Error converting {dicom_path} to JPEG: {e}")


# ************************************** Test *****************************************

# Create output folder if it doesn't exist
# os.makedirs('dataset/dicom', exist_ok=True)

# # Get list of JPEG images in dataset/no and dataset/yes
# no_files = [f for f in os.listdir(
#     'dataset/no') if f.lower().endswith(('.jpg', '.jpeg'))]
# yes_files = [f for f in os.listdir(
#     'dataset/yes') if f.lower().endswith(('.jpg', '.jpeg'))]

# # Convert JPEG to DICOM for 'no' files
# for file in no_files:
#     jpeg_to_dicom(f'dataset/no/{file}',
#                   f'dataset/dicom/{os.path.splitext(file)[0]}.dcm')

# # Convert JPEG to DICOM for 'yes' files
# for file in yes_files:
#     jpeg_to_dicom(f'dataset/yes/{file}',
#                   f'dataset/dicom/{os.path.splitext(file)[0]}.dcm')


# # Convert DICOM to JPEG for 'no' files
# for file in no_files:
#     dicom_to_jpeg(f'dataset/dicom/{os.path.splitext(file)[0]}.dcm',
#                   f'dataset/dicom/{os.path.splitext(file)[0]}.jpg')

# # Convert DICOM to JPEG for 'yes' files
# for file in yes_files:
#     dicom_to_jpeg(f'dataset/dicom/{os.path.splitext(file)[0]}.dcm',
#                   f'dataset/dicom/{os.path.splitext(file)[0]}.jpg')
