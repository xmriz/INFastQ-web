import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getLocation } from "../services/location.service";
import L, { Map, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";

const Maps = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [map, setMap] = useState<Map | null>(null);
  const [marker, setMarker] = useState<Marker | null>(null);
  const [isLoading, setIsLoading] = useState(true); // State untuk menampilkan loading

  useEffect(() => {
    fetchLocation();

    const interval = setInterval(fetchLocation, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      if (!map) {
        const mapInstance = L.map("map").setView([latitude, longitude], 15);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?v=1", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapInstance);

        mapInstance.whenReady(() => {
          setMap(mapInstance);
          setIsLoading(false); // Set isLoading ke false setelah peta terdeteksi
        });
      }

      if (map) {
        const customIcon = L.icon({
          iconUrl: "/marker.png", // Replace with the URL of your custom icon image
          iconSize: [48, 48], // Set the size of your custom icon
          iconAnchor: [32, 48], // Set the anchor point of your icon
        });

        if (marker) {
          marker.setIcon(customIcon); // Update the icon if the marker already exists
          marker.setLatLng([latitude, longitude]);
        } else {
          map.whenReady(() => {
            const newMarker = L.marker([latitude, longitude], { icon: customIcon });
            newMarker.addTo(map);
            setMarker(newMarker);
          });
        }

        map.panTo([latitude, longitude]);
      }
    }
  }, [map, latitude, longitude, marker]);

  const fetchLocation = async () => {
    try {
      const res = await getLocation();
      setLatitude(res.data.latitude);
      setLongitude(res.data.longitude);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <h1 className="font-bold text-center mt-16 mb-8 text-4xl">Lokasi Kotak Amal 1</h1>
        <div className="flex justify-center">
          {isLoading ? (
            // Tampilkan loading jika isLoading true
            <div className="text-center">Loading...</div>
          ) : (
            // Tampilkan peta jika isLoading false
            <div id="map" className="rounded-lg border border-black w-[600px] h-[500px] mb-10"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Maps;
