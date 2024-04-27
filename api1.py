from flask import Flask, request, jsonify
import numpy as np
import pickle

# Load the pre-trained model
model_path = r'C:\Users\aryan\OneDrive\Desktop\Algorithm ACES\stress_trained.sav'
loaded_model = pickle.load(open(model_path, 'rb'))

# Initialize Flask app
app = Flask(__name__)

# Define stress level prediction function
def stresslevel_prediction(input_data):
    # Convert input data to a numpy array and reshape it
    id_np_array = np.asarray(input_data)
    id_reshaped = id_np_array.reshape(1, -1)
    
    # Make prediction using the loaded model
    prediction = loaded_model.predict(id_reshaped)
    
    # Return prediction result
    if prediction[0] == 0:
        return "Stress Level: LOW"
    elif prediction[0] == 1:
        return "Stress Level: MEDIUM"
    else:
        return "Stress Level: HIGH"

# Define /predict endpoint
@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from the request body
    data = request.get_json()

    # Extract input values from the JSON data
    Humidity = data.get('Humidity')
    Temperature = data.get('Temperature')
    Step_count = data.get('Step_count')
    
    # Convert input values to a list
    input_data = [Humidity, Temperature, Step_count]
    
    # Get stress level prediction
    diagnosis = stresslevel_prediction(input_data)
    
    # Return prediction result as a JSON response
    return jsonify({"diagnosis": diagnosis})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
