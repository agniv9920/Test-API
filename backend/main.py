from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Hardcoded user data (Replace these with actual details)
USER_ID = "agniv_ganguly_28092002"
EMAIL = "gangulyagniv450@gmail.com"
ROLL_NUMBER = "21BCE1094"

# GET endpoint
@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    response = {
        "operation_code": 1
    }
    return jsonify(response), 200

# POST endpoint
@app.route('/bfhl', methods=['POST'])
def process_data():
    try:
        data = request.json.get('data', [])
        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        lowercase_alphabets = [char for char in alphabets if char.islower()]
        highest_lowercase_alphabet = max(lowercase_alphabets) if lowercase_alphabets else None

        response = {
            "is_success": True,
            "user_id": USER_ID,
            "email": EMAIL,
            "roll_number": ROLL_NUMBER,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase_alphabet] if highest_lowercase_alphabet else []
        }
    except Exception as e:
        response = {
            "is_success": False,
            "error": str(e)
        }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
