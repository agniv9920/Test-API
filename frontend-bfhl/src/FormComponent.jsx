import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

// Define the options for the multi-select dropdown
const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
];

const FormComponent = () => {
    // State variables to manage input, response, selected options, and errors
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle the form submission
    const handleSubmit = async () => {
        try {
            // Validate if the input is a valid JSON and contains the 'data' key
            const parsedData = JSON.parse(jsonInput);
            if (!Array.isArray(parsedData.data)) {
                setErrorMessage('Invalid JSON: "data" must be an array');
                return;
            }
            setErrorMessage('');

            // Make a POST request to the backend API
            const apiResponse = await axios.post('https://test-api-backend-2nmc.vercel.app/bfhl', parsedData);
            setResponse(apiResponse.data);
        } catch (error) {
            setErrorMessage('Invalid JSON format or API error');
        }
    };

    // Function to handle changes in the input field
    const handleInputChange = (event) => {
        setJsonInput(event.target.value);
    };

    // Function to handle changes in the multi-select dropdown
    const handleSelectChange = (selected) => {
        setSelectedOptions(selected);
    };

    // Function to render the response based on the selected dropdown options
    const renderResponse = () => {
        if (!response) return null;
        return selectedOptions.map(option => (
            <div key={option.value}>
                <h3>{option.label}</h3>
                <pre>{JSON.stringify(response[option.value], null, 2)}</pre>
            </div>
        ));
    };

    return (
        <div>
            <h1>BFHL Frontend</h1>
            {/* Text area for JSON input */}
            <textarea
                rows="5"
                cols="50"
                placeholder='Enter JSON: e.g., { "data": ["A","C","z"] }'
                value={jsonInput}
                onChange={handleInputChange}
            />
            <br />
            {/* Submit button to validate and send the JSON input */}
            <button onClick={handleSubmit}>Submit</button>
            {/* Display error message if any */}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {/* Render response and dropdown after receiving a valid response */}
            {response && (
                <>
                    <Select
                        options={options}
                        isMulti
                        onChange={handleSelectChange}
                    />
                    <div>{renderResponse()}</div>
                </>
            )}
        </div>
    );
};

export default FormComponent;
