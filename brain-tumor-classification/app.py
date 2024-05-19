from convert import dicom_to_jpeg
from flask import Flask, request, jsonify, send_from_directory  # type: ignore
import requests  # type: ignore
from tensorflow.keras.models import load_model  # type: ignore
import numpy as np
import cv2
import os
from werkzeug.utils import secure_filename  # type: ignore
from datetime import datetime

app = Flask(__name__)

# Load your trained model
model = load_model('model/brain_tumor.h5')

# Define the path for uploading images
UPLOAD_FOLDER = 'static/uploads/'
STORAGE_FOLDER = 'static/storage/'


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


def download_file(url, dest_folder):
    if not os.path.exists(dest_folder):
        os.makedirs(dest_folder)
    local_filename = os.path.join(
        dest_folder, secure_filename(url.split('/')[-1]))
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(local_filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
    return local_filename

############################# Endpoints #############################

# ********************************************* HEALTH CHECK ENDPOINTS ***********************************************


@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'response': 'pong'})

# ********************************************* Prediction ENDPOINTS ***********************************************


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data or 'url' not in data:
        return jsonify({'error': 'No file URL part in the request'}), 400

    file_url = data['url']
    try:
        filepath = download_file(file_url, app.config['UPLOAD_FOLDER'])
        print(filepath)
        if filepath.endswith('.dcm'):  # Convert DICOM to JPEG
            jpeg_path = os.path.splitext(filepath)[0] + '.jpg'
            dicom_to_jpeg(filepath, jpeg_path)
            filepath = jpeg_path
        elif not filepath.endswith(('.jpg', '.jpeg')):
            return jsonify({'error': 'Invalid file format. Please upload a JPEG image or DICOM file'}), 400

        print(filepath)
        # Preprocess the image and make prediction
        result = predict_tumor(filepath)

        # Remove the downloaded image
        os.remove(filepath)

        return jsonify({'prediction': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ********************************************* FILES ENDPOINTS ***********************************************


@app.route('/files/store', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        filename = secure_filename(file.filename)
        # Generate a unique filename using the current timestamp
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S%f')
        ext = os.path.splitext(filename)[1]
        unique_filename = f"{timestamp}{ext}"
        file.save(os.path.join(app.config['STORAGE_FOLDER'], unique_filename))
        file_url = request.url_root + 'files/' + unique_filename
        return jsonify({"url": file_url}), 201


@app.route('/files/<filename>', methods=['GET'])
def get_file(filename):
    try:
        return send_from_directory(app.config['STORAGE_FOLDER'], filename)
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404


@app.route('/files/<filename>', methods=['DELETE'])
def delete_file(filename):
    try:
        os.remove(os.path.join(app.config['STORAGE_FOLDER'], filename))
        return jsonify({"message": "File deleted successfully"}), 200
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404


if __name__ == '__main__':
    app.run(debug=True)

if __name__ == '__main__':
    # Ensure the upload folder exists
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.config['STORAGE_FOLDER'] = STORAGE_FOLDER
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    os.makedirs(STORAGE_FOLDER, exist_ok=True)
    app.run(debug=True)
