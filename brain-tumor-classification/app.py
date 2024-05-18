from convert import dicom_to_jpeg
from flask import Flask, request, jsonify  # type: ignore
from tensorflow.keras.models import load_model  # type: ignore
import numpy as np
import cv2
import os
from werkzeug.utils import secure_filename  # type: ignore

app = Flask(__name__)

# Load your trained model
model = load_model('model/brain_tumor.h5')

# Define the path for uploading images
UPLOAD_FOLDER = 'static/uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


def preprocess_image(image_path, target_size=(224, 224)):
    """
    Preprocess the uploaded image to the required format.
    """
    img = cv2.imread(image_path)
    img = cv2.resize(img, target_size)
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    gray = cv2.GaussianBlur(gray, (5, 5), 0)
    thresh = cv2.threshold(gray, 45, 255, cv2.THRESH_BINARY)[1]
    thresh = cv2.erode(thresh, None, iterations=2)
    thresh = cv2.dilate(thresh, None, iterations=2)
    cnts, _ = cv2.findContours(
        thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    c = max(cnts, key=cv2.contourArea)
    extLeft = tuple(c[c[:, :, 0].argmin()][0])
    extRight = tuple(c[c[:, :, 0].argmax()][0])
    extTop = tuple(c[c[:, :, 1].argmin()][0])
    extBot = tuple(c[c[:, :, 1].argmax()][0])
    ADD_PIXELS = 0
    new_img = img[extTop[1]-ADD_PIXELS:extBot[1]+ADD_PIXELS,
                  extLeft[0]-ADD_PIXELS:extRight[0]+ADD_PIXELS].copy()
    new_img = cv2.resize(new_img, target_size)
    img_array = np.array(new_img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array.astype('float32')
    img_array /= 255
    return img_array


def predict_tumor(image_path):
    """
    Preprocess the uploaded image and make prediction.
    """
    img = preprocess_image(image_path)
    prediction = model.predict(img)
    result = 'Yes' if prediction[0][0] > 0.5 else 'No'
    return result

############################# Endpoints #############################


@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'response': 'pong'})


@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        if file.filename.endswith('.dcm'):  # Convert DICOM to JPEG
            jpeg_path = os.path.splitext(filepath)[0] + '.jpg'
            dicom_to_jpeg(filepath, jpeg_path)
            filepath = jpeg_path

        elif not file.filename.endswith(('.jpg', '.jpeg')):
            return jsonify({'error': 'Invalid file format. Please upload a JPEG image or DICOM file'}), 400

        # Preprocess the image and make prediction
        result = predict_tumor(filepath)

        return jsonify({'prediction': result})
    return jsonify({'error': 'Failed to process the request'}), 500


if __name__ == '__main__':
    app.run(debug=True)
