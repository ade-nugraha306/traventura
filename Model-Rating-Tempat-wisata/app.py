from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import pickle

app = Flask(__name__)

# ==================== Load Model dan Preprocessing ====================

model = tf.keras.models.load_model('model_tempat.h5', compile=False)
scaler = pickle.load(open('scaler_tempat.pkl', 'rb'))
city_lookup = pickle.load(open('lookup_tempat_city.pkl', 'rb'))
category_lookup = pickle.load(open('lookup_tempat_category.pkl', 'rb'))

# ==================== API: Prediksi Rating Tempat Wisata ====================

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)

        # Ambil input
        place_name = data.get('Place_Name', 'Tempat Tidak Diketahui')
        city = data['City']
        category = data['Category']
        price = float(data['Price'])
        lat = float(data['Lat'])
        long = float(data['Long'])

        # Preprocessing input
        city_encoded = city_lookup(tf.constant([city]))
        category_encoded = category_lookup(tf.constant([category]))
        scaled_numeric = scaler.transform([[price, lat, long]])

        # Gabungkan input
        input_tensor = tf.concat([
            tf.cast(city_encoded, tf.float32),
            tf.cast(category_encoded, tf.float32),
            tf.convert_to_tensor(scaled_numeric, dtype=tf.float32)
        ], axis=1)

        # Prediksi rating
        prediction = model.predict(input_tensor, verbose=0)[0][0]
        clipped_rating = max(1.0, min(5.0, float(prediction)))  # Batasi ke 1–5

        return jsonify({
            'place_name': place_name,
            'predicted_rating': clipped_rating
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== Jalankan App ====================

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
