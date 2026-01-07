from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add parent directory to path to import predict module
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import your prediction function
# Adjust the import based on your actual predict.py structure
try:
    from predict import predict_url
except ImportError:
    # Fallback if predict module is structured differently
    from app.predict import predict_url

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'API is running'})

@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Endpoint to predict if a URL is phishing or legitimate
    
    Expected JSON body:
    {
        "url": "https://example.com"
    }
    
    Returns:
    {
        "url": "https://example.com",
        "isPhishing": true/false,
        "confidence": 95.5,
        "features": {
            "urlLength": 150,
            "hasIP": false,
            "hasAtSymbol": false,
            "subdomainCount": 2,
            "httpsUsed": true,
            // Add more features based on your model
        }
    }
    """
    try:
        # Get URL from request
        data = request.get_json()
        
        if not data or 'url' not in data:
            return jsonify({
                'error': 'No URL provided',
                'message': 'Please provide a URL in the request body'
            }), 400
        
        url = data['url']
        
        if not url.strip():
            return jsonify({
                'error': 'Empty URL',
                'message': 'URL cannot be empty'
            }), 400
        
        # Call your prediction function
        # This should return the prediction result from your ML model
        result = predict_url(url)
        
        # Format the response
        # Adjust this based on what your predict_url function returns
        response = {
            'url': url,
            'isPhishing': result['is_phishing'],
            'confidence': result['confidence'],
            'features': result.get('features', {})
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Prediction failed',
            'message': str(e)
        }), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """
    Endpoint to get system statistics
    Optional: Track and return real statistics
    """
    return jsonify({
        'urlsScanned': 1234567,
        'threatsBlocked': 456789,
        'accuracy': 99.2,
        'avgResponseTime': 0.8
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
