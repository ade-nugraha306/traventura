import axios from 'axios'

const API_URL = "http://localhost:3000/api/"
const BASE_URL = "http://localhost:3000/"

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth API
export const register = async (userData) => {
    try {
        // Pastikan data sesuai dengan skema MongoDB
        const formattedData = {
            displayName: userData.displayName,
            email: userData.email,
            password: userData.password,
            authType: "local"
        };
        
        const response = await api.post('register', formattedData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Terjadi kesalahan saat registrasi' };
    }
};

export const login = async (credentials) => {
    try {
        const response = await api.post('login', credentials);
        
        // Log untuk debugging
        console.log("Login API response:", response.data);
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Terjadi kesalahan saat login' };
    }
};

export const googleLogin = async (token) => {
    try {
        const response = await api.post('google-login', { token });
        
        // Log untuk debugging
        console.log("Google Login API response:", response.data);
        
        // Pastikan user data memiliki photoURL
        const userData = response.data.user;
        if (userData && !userData.photoURL) {
            console.warn("photoURL tidak ada dalam response dari backend");
        }
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Verifikasi penyimpanan
        const savedUser = JSON.parse(localStorage.getItem('user'));
        console.log("User data saved to localStorage:", savedUser);
        
        return response.data;
    } catch (error) {
        console.error("Google login API error:", error);
        throw error.response?.data || { message: 'Terjadi kesalahan saat login dengan Google' };
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("User logged out, localStorage cleared");
};

// Booking API
export const createBooking = async (placeId) => {
    try {
        const response = await api.post('booking', { place_id: placeId });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Terjadi kesalahan saat membuat booking' };
    }
};

export const getBookings = async () => {
    try {
        const response = await api.get('booking');
        return response.data.bookings;
    } catch (error) {
        throw error.response?.data || { message: 'Terjadi kesalahan saat mengambil data booking' };
    }
};

export const checkBooking = async (placeId) => {
    try {
        const response = await api.get(`booking/${placeId}`);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return { exists: false };
        }
        throw error.response?.data || { message: 'Terjadi kesalahan saat memeriksa booking' };
    }
};

// Comments API
export const getComments = async (placeId) => {
    try {
        const response = await api.get(`comments/${placeId}`);
        
        // Log untuk debugging
        console.log("Raw comments response:", response.data);
        
        // Backend mengembalikan array langsung, bukan objek dengan property comments
        const comments = Array.isArray(response.data) ? response.data : [];
        
        return { comments: comments };
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error.response?.data || { message: 'Terjadi kesalahan saat mengambil komentar' };
    }
};

export const addComment = async (placeId, text) => {
    try {
        const response = await api.post(`comments/${placeId}`, { text });
        
        // Log untuk debugging
        console.log("Add comment response:", response.data);
        
        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error.response?.data || { message: 'Terjadi kesalahan saat menambahkan komentar' };
    }
};

// Search API
export const searchPlaces = async (query) => {
    try {
        const response = await api.get(`search?q=${encodeURIComponent(query)}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Terjadi kesalahan saat mencari tempat' };
    }
};

// Get Place By ID
export const getPlaceById = async (placeId) => {
    try {
        const response = await api.get(`place/${placeId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Terjadi kesalahan saat mengambil detail tempat' };
    }
};

// Get Random Recommendations
export const getRandomRecommendations = async () => {
  const response = await api.get('recommendations/random') // sesuaikan kalau pakai prefix /api atau lainnya
  return response.data
}

// Flask API untuk rekomendasi dan prediksi
const flaskApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getRecommendations = async (placeData) => {
    try {
        const response = await flaskApi.post('api/recommend', placeData); // endpoint: /recommend
        return response.data.recommendations;
    } catch (error) {
        console.error("Error response dari getRecommendations:", error.response?.data || error.message);
        throw error.response?.data || { message: 'Terjadi kesalahan saat mengambil rekomendasi' };
    }
};

export const predictRating = async (placeData) => {
    try {
        const response = await flaskApi.post('api/predict', placeData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Terjadi kesalahan saat memprediksi rating' };
    }
};

export const checkPopularity = async (features) => {
    try {
        const response = await flaskApi.post('api/cek_popularitas', { features });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Terjadi kesalahan saat memeriksa popularitas' };
    }
};

export const chatbotQuery = async (prompt) => {
    try {
        const response = await flaskApi.post('api/chatbot', { prompt });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Terjadi kesalahan saat berkomunikasi dengan chatbot' };
    }
};

export default api;