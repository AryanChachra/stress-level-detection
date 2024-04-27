import React, { useState } from 'react';
import axios from 'axios';

function StressLevelPrediction() {
    // Define state variables for form inputs and prediction result
    const [humidity, setHumidity] = useState('');
    const [temperature, setTemperature] = useState('');
    const [stepCount, setStepCount] = useState('');
    const [prediction, setPrediction] = useState('');
    const [error, setError] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the form from submitting the usual way

        // Create the data object to send to the API
        const requestData = {
            Humidity: humidity,
            Temperature: temperature,
            Step_count: stepCount
        };

        try {
            // Send a POST request to the Flask API
            const response = await axios.post('http://localhost:5000/predict', requestData);
            
            // Set the prediction state with the API response
            setPrediction(response.data.diagnosis);
            setError('');
        } catch (error) {
            // Handle any errors that occur during the API request
            console.error('Error fetching prediction:', error);
            setError('Failed to fetch prediction. Please try again.');
        }
    };

    return (
        <div>
            <h1>Stress Level Prediction</h1>

            {/* Form for user inputs */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Humidity:</label>
                    <input
                        type="text"
                        value={humidity}
                        onChange={(e) => setHumidity(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Body Temperature:</label>
                    <input
                        type="text"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Number of Steps:</label>
                    <input
                        type="text"
                        value={stepCount}
                        onChange={(e) => setStepCount(e.target.value)}
                        required
                    />
                </div>

                {/* Submit button */}
                <button type="submit">Predict</button>
            </form>

            {/* Display the prediction result */}
            {prediction && (
                <div>
                    <h2>Prediction Result:</h2>
                    <p>{prediction}</p>
                </div>
            )}

            {/* Display any error messages */}
            {error && (
                <div style={{ color: 'red' }}>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}

export default StressLevelPrediction;
