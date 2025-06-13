export async function reverseGeocode(lat, lon) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: {
          "User-Agent": "YourAppName/1.0 (your@email.com)",
        },
      }
    );
    const data = await response.json();
    return data?.display_name || "Lokasi tidak dikenal";
  } catch (error) {
    console.error("❌ Reverse geocoding failed:", error);
    return "Lokasi tidak dikenal";
  }
}
