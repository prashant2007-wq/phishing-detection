import joblib
import numpy as np
import re
from urllib.parse import urlparse

# Load your trained model
# Adjust the path based on where your model file is located
MODEL_PATH = '../model/phishing_model.pkl'

try:
    model = joblib.load(MODEL_PATH)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

def extract_features(url):
    """
    Extract features from URL for prediction
    
    Returns:
        dict: Dictionary containing all extracted features
    """
    features = {}
    
    # Parse URL
    try:
        parsed = urlparse(url)
    except:
        parsed = None
    
    # Feature 1: URL Length
    features['url_length'] = len(url)
    
    # Feature 2: HTTPS
    features['https_used'] = url.startswith('https')
    
    # Feature 3: Has IP address
    ip_pattern = re.compile(r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}')
    features['has_ip'] = bool(ip_pattern.search(url))
    
    # Feature 4: Has @ symbol
    features['has_at_symbol'] = '@' in url
    
    # Feature 5: Number of dots (subdomain count)
    features['subdomain_count'] = url.count('.')
    
    # Feature 6: URL depth (number of slashes)
    features['url_depth'] = url.count('/')
    
    # Feature 7: Has suspicious keywords
    suspicious_keywords = ['login', 'verify', 'account', 'secure', 'update', 'confirm']
    features['has_suspicious_keywords'] = any(keyword in url.lower() for keyword in suspicious_keywords)
    
    # Feature 8: Domain length
    if parsed and parsed.netloc:
        features['domain_length'] = len(parsed.netloc)
    else:
        features['domain_length'] = 0
    
    # Feature 9: Has numbers in domain
    if parsed and parsed.netloc:
        features['has_numbers_in_domain'] = bool(re.search(r'\d', parsed.netloc))
    else:
        features['has_numbers_in_domain'] = False
    
    # Feature 10: Has hyphen
    features['has_hyphen'] = '-' in url
    
    # Add more features based on your model's requirements
    
    return features

def prepare_features_for_model(features):
    """
    Convert feature dictionary to numpy array in the correct order for the model
    
    Adjust this based on the exact features your model was trained on
    """
    # Example: If your model expects these features in this order
    feature_array = np.array([
        features['url_length'],
        int(features['https_used']),
        int(features['has_ip']),
        int(features['has_at_symbol']),
        features['subdomain_count'],
        features['url_depth'],
        int(features['has_suspicious_keywords']),
        features['domain_length'],
        int(features['has_numbers_in_domain']),
        int(features['has_hyphen'])
    ]).reshape(1, -1)
    
    return feature_array

def predict_url(url):
    """
    Predict if a URL is phishing or legitimate
    
    Args:
        url (str): URL to analyze
        
    Returns:
        dict: Prediction result with confidence and features
    """
    # Extract features
    features = extract_features(url)
    
    if model is None:
        # Fallback to rule-based prediction if model not loaded
        return rule_based_prediction(url, features)
    
    try:
        # Prepare features for model
        feature_array = prepare_features_for_model(features)
        
        # Make prediction
        prediction = model.predict(feature_array)[0]
        
        # Get confidence score (probability)
        if hasattr(model, 'predict_proba'):
            probabilities = model.predict_proba(feature_array)[0]
            confidence = max(probabilities) * 100
        else:
            # If model doesn't support probability, use default
            confidence = 95.0 if prediction == 1 else 92.0
        
        # Prepare result
        result = {
            'is_phishing': bool(prediction == 1),
            'confidence': float(confidence),
            'features': {
                'urlLength': features['url_length'],
                'hasIP': features['has_ip'],
                'hasAtSymbol': features['has_at_symbol'],
                'subdomainCount': features['subdomain_count'],
                'httpsUsed': features['https_used'],
                'urlDepth': features['url_depth'],
                'hasSuspiciousKeywords': features['has_suspicious_keywords'],
                'domainLength': features['domain_length'],
                'hasNumbersInDomain': features['has_numbers_in_domain'],
                'hasHyphen': features['has_hyphen']
            }
        }
        
        return result
        
    except Exception as e:
        print(f"Prediction error: {e}")
        return rule_based_prediction(url, features)

def rule_based_prediction(url, features):
    """
    Fallback rule-based prediction if ML model fails
    """
    # Simple rule-based scoring
    phishing_score = 0
    
    if features['url_length'] > 75:
        phishing_score += 2
    if not features['https_used']:
        phishing_score += 3
    if features['has_ip']:
        phishing_score += 4
    if features['has_at_symbol']:
        phishing_score += 3
    if features['subdomain_count'] > 3:
        phishing_score += 2
    if features['has_suspicious_keywords']:
        phishing_score += 2
    
    is_phishing = phishing_score >= 5
    confidence = min(phishing_score * 10 + 50, 95) if is_phishing else min((10 - phishing_score) * 10 + 50, 95)
    
    return {
        'is_phishing': is_phishing,
        'confidence': float(confidence),
        'features': {
            'urlLength': features['url_length'],
            'hasIP': features['has_ip'],
            'hasAtSymbol': features['has_at_symbol'],
            'subdomainCount': features['subdomain_count'],
            'httpsUsed': features['https_used'],
            'urlDepth': features['url_depth'],
            'hasSuspiciousKeywords': features['has_suspicious_keywords'],
            'domainLength': features['domain_length'],
            'hasNumbersInDomain': features['has_numbers_in_domain'],
            'hasHyphen': features['has_hyphen']
        }
    }
