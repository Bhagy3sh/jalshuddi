from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from React Native

# Load the saved model and scaler
try:
    model = joblib.load('models/best_et_classifier.sav')
    scaler = joblib.load('models/scaler.sav')
except Exception as e:
    print(f"Error loading model or scaler: {e}")
    raise

def predict_potability(input_data):
    try:
        # Convert input to a NumPy array
        input_data_np = np.array(input_data).reshape(1, -1)

        # Scale the input data
        scaled_input = scaler.transform(input_data_np)

        # Make prediction
        prediction = model.predict(scaled_input)[0]

        return {"prediction": int(prediction), "message": "Water is potable" if prediction == 1 else "Water is not potable"}
    except Exception as e:
        return {"error": f"Prediction error: {str(e)}"}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        features = data.get('features')

        if not features or len(features) != 9:
            return jsonify({"error": "Invalid input: 9 features are required"}), 400

        result = predict_potability(features)
        if "error" in result:
            return jsonify(result), 500

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@app.route('/')
def home():
    return jsonify({"message": "Water Quality Prediction API is running"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)