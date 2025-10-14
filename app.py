# =========================================================
# TA-3 Flask App: Prediksi Risiko Gagal Bayar Kartu Kredit
# =========================================================
from flask import Flask, render_template, request
import numpy as np
import joblib

# Inisialisasi Flask
app = Flask(__name__)

# Load model dan scaler
model = joblib.load("models/logreg_credit_model.pkl")
scaler = joblib.load("models/scaler_credit.pkl")

# =========================================================
# Route Halaman Utama
# =========================================================
@app.route('/')
def home():
    return render_template('index.html')

# =========================================================
# Route Prediksi
# =========================================================
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Ambil data input dari form dengan urutan yang benar sesuai training
        # CATATAN: Model ditraining dengan 24 fitur (termasuk Unnamed: 0)
        # Urutan: Unnamed: 0 (ID dummy), limit_bal, sex, education, marriage, age, 
        #         payment_status (6), bill_statement (6), previous_payment (6)
        features = [
            0,  # Unnamed: 0 (dummy ID, tidak berpengaruh pada prediksi)
            float(request.form['limit_bal']),
            float(request.form['sex']),
            float(request.form['education']),
            float(request.form['marriage']),
            float(request.form['age']),
            float(request.form['payment_status_sep']),
            float(request.form['payment_status_aug']),
            float(request.form['payment_status_jul']),
            float(request.form['payment_status_jun']),
            float(request.form['payment_status_may']),
            float(request.form['payment_status_apr']),
            float(request.form['bill_statement_sep']),
            float(request.form['bill_statement_aug']),
            float(request.form['bill_statement_jul']),
            float(request.form['bill_statement_jun']),
            float(request.form['bill_statement_may']),
            float(request.form['bill_statement_apr']),
            float(request.form['previous_payment_sep']),
            float(request.form['previous_payment_aug']),
            float(request.form['previous_payment_jul']),
            float(request.form['previous_payment_jun']),
            float(request.form['previous_payment_may']),
            float(request.form['previous_payment_apr'])
        ]
        
        final_input = np.array([features])

        # Scaling
        scaled_input = scaler.transform(final_input)

        # Prediksi
        prediction = model.predict(scaled_input)[0]
        probability = model.predict_proba(scaled_input)[0][1] * 100

        # Hasil prediksi
        if prediction == 1:
            result = "⚠️ Berisiko Gagal Bayar"
            risk_level = "TINGGI"
        else:
            result = "✅ Tidak Berisiko"
            risk_level = "RENDAH"

        return render_template(
            'result.html',
            result=result,
            probability=f"{probability:.2f}",
            risk_level=risk_level
        )

    except KeyError as e:
        return render_template('result.html', result="❌ Data Tidak Lengkap!", probability=f"Field yang hilang: {str(e)}", risk_level="ERROR")
    except Exception as e:
        return render_template('result.html', result="❌ Terjadi Kesalahan!", probability=str(e), risk_level="ERROR")

# =========================================================
# Main
# =========================================================
if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
