import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getLocation } from "../services/location.service";
import L, { Map, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import { getMosqueLocId } from "../services/masjidLoc.service";
import Loading from "./Loading/loading";

const Maps = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [mosqueLat, setMosqueLat] = useState(0);
  const [mosqueLong, setMosqueLong] = useState(0);
  const [map, setMap] = useState<Map | null>(null);
  const [marker, setMarker] = useState<Marker | null>(null);
  const [mosqueMarker, setMosqueMarker] = useState<Marker | null>(null);
  const [range, setRange] = useState(0);
  const [distanceWarning, setDistanceWarning] = useState(false);
  const [line, setLine] = useState<L.Polyline | null>(null);

  useEffect(() => {
    fetchLocation();

    // const interval = setInterval(fetchLocation, 300);

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  useEffect(() => {
    handleRange();

    // const interval = setInterval(handleRange, 300);

    // return () => {
    //   clearInterval(interval);
    // };
  });

  useEffect(() => {
    if (range > 2) {
      setDistanceWarning(true);
    } else {
      setDistanceWarning(false);
    }
  }, [range]);

  useEffect(() => {
    if (
      latitude !== 0 &&
      longitude !== 0 &&
      mosqueLat !== 0 &&
      mosqueLong !== 0
    ) {
      if (!map) {
        const mapInstance = L.map("map").setView([latitude, longitude], 15);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?v=1", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapInstance);

        mapInstance.whenReady(() => {
          setMap(mapInstance);
        });
      }

      if (map) {
        const customIcon = L.icon({
          iconUrl: "/marker.png",
          iconSize: [48, 48],
          iconAnchor: [24, 24],
        });

        if (marker) {
          marker.setIcon(customIcon);
          marker.setLatLng([latitude, longitude]);
        } else {
          map.whenReady(() => {
            const newMarker = L.marker([latitude, longitude], {
              icon: customIcon,
            });
            newMarker.addTo(map);
            setMarker(newMarker);
          });
        }

        map.panTo([latitude, longitude]);
      }

      if (map) {
        // Create a marker for the mosque
        if (!mosqueMarker) {
          const mosqueCustomIcon = L.icon({
            iconUrl: "/markerMosque.png",
            iconSize: [48, 48],
            iconAnchor: [24, 48],
          });

          const newMosqueMarker = L.marker([mosqueLat, mosqueLong], {
            icon: mosqueCustomIcon,
          });
          newMosqueMarker.addTo(map);
          setMosqueMarker(newMosqueMarker);
        } else {
          // Update existing mosque marker's position
          mosqueMarker.setLatLng([mosqueLat, mosqueLong]);
        }

        // Create a dashed polyline to connect the donation box and the mosque
        if (line) {
          // Update existing polyline's coordinates
          line.setLatLngs([
            [latitude, longitude],
            [mosqueLat, mosqueLong],
          ]);
        } else {
          // Create a new polyline
          const polyline = L.polyline(
            [
              [latitude, longitude],
              [mosqueLat, mosqueLong],
            ],
            {
              color: "black",
              dashArray: "5, 10",
              weight: 2,
            }
          );
          polyline.addTo(map);
          setLine(polyline);
        }
      }
    }
  }, [
    map,
    latitude,
    longitude,
    marker,
    mosqueLat,
    mosqueLong,
    mosqueMarker,
    line,
  ]);

  const fetchLocation = async () => {
    try {
      const res = await getLocation();
      const mosqueRes = await getMosqueLocId(1);
      setLatitude(res.data.latitude);
      setLongitude(res.data.longitude);
      setMosqueLat(mosqueRes.data.data.latitude);
      setMosqueLong(mosqueRes.data.data.longitude);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRange = () => {
    // range in km between the donation box and the mosque
    const R = 6371;
    const dLat = (mosqueLat - latitude) * (Math.PI / 180);
    const dLon = (mosqueLong - longitude) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(latitude * (Math.PI / 180)) *
        Math.cos(mosqueLat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    setRange(distance);
  };

  if (
    latitude === 0 ||
    longitude === 0 ||
    mosqueLat === 0 ||
    mosqueLong === 0
  ) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-center mb-8 text-4xl mt-16">
          Lokasi Kotak Amal 1.
        </h1>
        <div className="text-center mb-4">
          Jarak ke Masjid: {range.toFixed(4)} km
        </div>
        {distanceWarning && (
          <div className="fixed bottom-0 left-0 right-0 mx-auto z-50">
            <div className="bg-red-500 text-white p-3 mt-3 rounded">
              Warning: Jarak ke masjid lebih dari 2 km.
            </div>
          </div>
        )}
        <div className="flex justify-center relative z-0">
          <div
            id="map"
            className="rounded-lg border border-black w-[600px] h-[500px] mb-20"
          ></div>
          <button
            type="reset"
            className="text-base font-semibold bg-blue-400 text-white py-2 px-8 rounded-full w-full hover:opacity-80 hover:shadow-lg transition duration-500"
            onClick={() => {
              fetchLocation();
              handleRange();
            }}
          >
            Fetch Maps Location
          </button>
        </div>
      </div>
    </>
  );
};

export default Maps;
