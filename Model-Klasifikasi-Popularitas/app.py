from flask import Flask, request, jsonify
import numpy as np
import joblib
from tensorflow.keras.models import load_model

app = Flask(__name__)

# Load model dan scaler
model = load_model("popularitas_model.h5")
scaler = joblib.load("scaler_popularitas.pkl")

@app.route('/cek_popularitas', methods=['POST'])
def cek_popularitas():
    try:
        data = request.get_json()

        # Ambil fitur dari input
        fitur = [
            data['jumlah_user'],
            data['rerata_rating'],
            data['jumlah_review']
        ]

        # Ubah ke array dan scaling
        fitur_scaled = scaler.transform([fitur])

        # Prediksi
        prediksi = model.predict(fitur_scaled)
        label = 'Populer' if prediksi[0][0] > 0.5 else 'Tidak Populer'

        return jsonify({
            'input': fitur,
            'skor_prediksi': float(prediksi[0][0]),
            'hasil': label
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
