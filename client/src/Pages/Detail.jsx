import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import api, { getComments } from "../data/api";
import defaultUserImage from "../assets/user.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Detail() {
  const [destination, setDestination] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [bookingMade, setBookingMade] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [imageErrors, setImageErrors] = useState({}); // Track failed images per user
  const { id } = useParams();
  const token = localStorage.getItem("token");

  // Handle image error - simpler approach per user
  const handleImageError = (userId) => {
    console.log("Image failed to load for user:", userId);
    setImageErrors((prev) => ({
      ...prev,
      [userId]: true,
    }));
  };

  // Get profile image source - simpler logic
  const getProfileImageSrc = (user, userId) => {
    // If this user's image has already failed, use default
    if (imageErrors[userId]) {
      return defaultUserImage;
    }

    // If no user data or no photo, use default
    if (!user?.photo) {
      return defaultUserImage;
    }

    // Return the user's photo (works for both Google and other providers)
    return user.photo;
  };

  // useEffect untuk fetch destination data (hanya sekali)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`place/${id}`);
        setDestination(res.data);
        console.log("Destination data:", res.data);
      } catch (err) {
        console.error("Gagal ambil data:", err);
      }
    };

    fetchData();
  }, [id]);

  // useEffect terpisah untuk fetch comments setelah destination loaded
  useEffect(() => {
    const fetchComments = async () => {
      if (!destination) return;

      try {
        setLoadingComments(true);

        let placeIdToUse = destination.id || destination.place_id;

        if (!placeIdToUse) {
          console.warn("No place_id found in destination, using fallback");
          placeIdToUse = 4;
        }

        console.log("Fetching comments for place ID:", placeIdToUse);

        const commentData = await getComments(placeIdToUse);
        console.log("Comment data received:", commentData);

        const commentsArray = commentData?.comments || [];
        console.log("Comments array:", commentsArray);

        if (commentsArray.length > 0) {
          console.log("First comment user data:", commentsArray[0].user_id);
        }

        setReviews(commentsArray);
      } catch (error) {
        console.error("Gagal ambil komentar:", error);
        setReviews([]);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [destination]);

  // useEffect terpisah untuk check booking
  useEffect(() => {
    const checkBooking = async () => {
      if (!token || !destination) return;

      try {
        let placeIdToUse = destination.id || destination.place_id || 4;
        const res = await api.get(`booking/${placeIdToUse}`);
        if (res.data.exists || res.data.booking) setBookingMade(true);
      } catch (err) {
        console.log("Booking check error:", err);
      }
    };

    checkBooking();
  }, [destination, token]);

  const handleBooking = async () => {
    try {
      const placeIdToUse = destination?.id || destination?.place_id || 4;

      await api.post("booking", {
        place_id: placeIdToUse,
      });
      alert("Booking berhasil!");
      setBookingMade(true);
    } catch (err) {
      alert(err.response?.data?.message || "Gagal booking");
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const placeIdToUse = destination?.id || destination?.place_id || 4;

      const res = await api.post(`comments/${placeIdToUse}`, {
        text: commentText,
      });

      console.log("Add comment response:", res.data);

      const updatedComments = await getComments(placeIdToUse);
      setReviews(updatedComments?.comments || []);
      setCommentText("");

      // Reset image errors for new comments
      setImageErrors({});
    } catch (err) {
      console.error("Error adding comment:", err);
      alert(err.response?.data?.error || "Gagal mengirim komentar");
    }
  };

  if (!destination) return <div className="text-center py-10">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-300 rounded-2xl p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">{destination.name}</h1>
          <p className="text-lg mb-2">{destination.rating}</p>
          <p className="text-lg font-semibold mb-4">Rp. {destination.price}</p>

          <div className="flex gap-4 mb-6">
            <div className="bg-white text-black px-5 py-2 rounded-full flex items-center">
              📍 <p className="ml-2">Lokasi tersedia</p>
            </div>
            <div className="bg-white text-black px-5 py-2 rounded-full flex items-center">
              🧭{" "}
              <p className="ml-2">{`${destination.location.lat}, ${destination.location.lng}`}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl mb-6">
            <p className="text-base">{destination.description}</p>
          </div>

          {destination.location?.lat && destination.location?.lng && (
            <div className="h-64">
              <MapContainer
                center={[destination.location.lat, destination.location.lng]}
                zoom={15}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[
                    destination.location.lat,
                    destination.location.lng,
                  ]}
                >
                  <Popup>{destination.name}</Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </div>

        {/* ✅ Belum login */}
        {!token && (
          <div className="mb-6 text-center">
            <p className="text-red-600 font-semibold mb-2">
              Kamu harus login untuk booking dan komentar.
            </p>
            <a
              href="/login"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Login Sekarang
            </a>
          </div>
        )}

        {/* ✅ Sudah login tapi belum booking */}
        {token && !bookingMade && (
          <div className="mb-6">
            <button
              onClick={handleBooking}
              className="bg-green-600 text-white px-6 py-2 rounded-xl"
            >
              Booking Tempat Ini
            </button>
            <p className="text-gray-600 mt-2">
              Booking dulu sebelum menulis komentar.
            </p>
          </div>
        )}

        {/* ✅ Sudah login dan sudah booking */}
        {token && bookingMade && (
          <div className="mb-6">
            <textarea
              className="w-full p-3 rounded-lg border"
              placeholder="Tulis komentar..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-600 text-white px-4 py-2 mt-2 rounded-lg"
            >
              Kirim Komentar
            </button>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">Ulasan</h2>
        {loadingComments ? (
          <p>Loading komentar...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-600">Belum ada ulasan untuk tempat ini.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, index) => {
              const userId = review.user_id?._id || review.user_id?.id || index;
              const profileImageSrc = getProfileImageSrc(
                review.user_id,
                userId
              );

              // Debug logging
              console.log("Rendering review for user:", userId);
              console.log("User data:", review.user_id);
              console.log("Profile image src:", profileImageSrc);
              console.log("Image error status:", imageErrors[userId]);

              return (
                <div
                  key={review._id || index}
                  className="bg-black text-white rounded-2xl p-4"
                >
                  <div className="flex items-center mb-2">
                    <img
                      src={profileImageSrc}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full mr-3 object-cover bg-gray-200"
                      onError={() => handleImageError(userId)}
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="font-bold text-xl">
                        {review.user_id?.displayName || "Anonim"}
                      </h3>
                      <p className="text-sm">
                        {new Date(
                          review.createdAt || review.date
                        ).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </div>
                  <p className="text-base">{review.text}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
