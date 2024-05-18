# Project Name

Brief description or overview of your project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [File Structure](#file-structure)
- [License](#license)

## Installation

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

## Usage

1. Run the Flask application:

   ```bash
   python app.py
   ```

2. Access the application in your web browser at `http://localhost:5000`.

## Endpoints

- **POST `/predict`**: Endpoint to upload an file and receive a prediction, allow ['jpg', 'jpeg', 'dcm']

  **Request**: Upload a file with the key `file`.

  **Response**: JSON object containing the prediction result.

## File Structure
