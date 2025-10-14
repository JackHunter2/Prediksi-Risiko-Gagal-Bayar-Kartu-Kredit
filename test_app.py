"""
Script test sederhana untuk memastikan aplikasi berjalan dengan baik
Jalankan dengan: python test_app.py
"""

import sys
import os

# Set encoding untuk Windows
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def test_imports():
    """Test apakah semua library bisa di-import"""
    print("Checking Testing imports...")
    try:
        import flask
        print("  [OK] Flask")
        import numpy
        print("  [OK] NumPy")
        import sklearn
        print("  [OK] Scikit-learn")
        import joblib
        print("  [OK] Joblib")
        return True
    except ImportError as e:
        print(f"  [ERROR] Import Error: {e}")
        return False

def test_files():
    """Test apakah semua file yang diperlukan ada"""
    print("\nChecking Testing required files...")
    required_files = [
        'app.py',
        'logreg_credit_model.pkl',
        'scaler_credit.pkl',
        'requirements.txt',
        'templates/index.html',
        'templates/result.html'
    ]
    
    all_exist = True
    for file in required_files:
        if os.path.exists(file):
            print(f"  [OK] {file}")
        else:
            print(f"  [MISSING] {file} - TIDAK DITEMUKAN!")
            all_exist = False
    return all_exist

def test_model_load():
    """Test apakah model dan scaler bisa di-load"""
    print("\nChecking Testing model and scaler...")
    try:
        import joblib
        import numpy as np
        
        # Load model
        model = joblib.load("logreg_credit_model.pkl")
        print("  [OK] Model loaded successfully")
        
        # Load scaler
        scaler = joblib.load("scaler_credit.pkl")
        print("  [OK] Scaler loaded successfully")
        
        # Test prediction dengan sample data (24 features including Unnamed: 0)
        sample_data = np.array([[
            0,      # Unnamed: 0 (dummy ID)
            50000,  # limit_bal
            1,      # sex
            2,      # education
            1,      # marriage
            30,     # age
            0, 0, 0, 0, 0, 0,  # payment_status (6)
            1000, 1000, 1000, 1000, 1000, 1000,  # bill_statement (6)
            1000, 1000, 1000, 1000, 1000, 1000   # previous_payment (6)
        ]])
        
        scaled = scaler.transform(sample_data)
        prediction = model.predict(scaled)
        proba = model.predict_proba(scaled)
        
        print(f"  [OK] Sample prediction: {prediction[0]} (Probability: {proba[0][1]:.2%})")
        return True
        
    except Exception as e:
        print(f"  [ERROR] Error: {e}")
        return False

def test_flask_app():
    """Test apakah Flask app bisa di-import dan dijalankan"""
    print("\nChecking Testing Flask app...")
    try:
        from app import app
        print("  [OK] Flask app imported successfully")
        
        # Test routes
        with app.test_client() as client:
            # Test home page
            response = client.get('/')
            if response.status_code == 200:
                print("  [OK] Home page (/) - OK")
            else:
                print(f"  [ERROR] Home page (/) - Status {response.status_code}")
                return False
        
        return True
    except Exception as e:
        print(f"  [ERROR] Error: {e}")
        return False

def main():
    print("="*60)
    print("TESTING APLIKASI PREDIKSI RISIKO KREDIT")
    print("="*60)
    
    tests = [
        ("Imports", test_imports),
        ("Files", test_files),
        ("Model & Scaler", test_model_load),
        ("Flask App", test_flask_app)
    ]
    
    results = []
    for test_name, test_func in tests:
        result = test_func()
        results.append((test_name, result))
    
    print("\n" + "="*60)
    print("HASIL TEST")
    print("="*60)
    
    all_passed = True
    for test_name, result in results:
        status = "[PASS]" if result else "[FAIL]"
        print(f"{test_name:.<40} {status}")
        if not result:
            all_passed = False
    
    print("="*60)
    if all_passed:
        print("\nSEMUA TEST BERHASIL!")
        print("Aplikasi siap untuk di-deploy atau dijalankan.")
        print("\nJalankan dengan: python app.py")
        return 0
    else:
        print("\nBEBERAPA TEST GAGAL!")
        print("Perbaiki error di atas sebelum deploy.")
        return 1

if __name__ == "__main__":
    sys.exit(main())

