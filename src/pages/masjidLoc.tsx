import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMosqueLocId, putMosqueLoc } from "../services/masjidLoc.service";
import Loading from "./Loading/loading";

const MasjidLoc: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [luas, setLuas] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [editedNama, setEditedNama] = useState("");
  const [editedAlamat, setEditedAlamat] = useState("");
  const [editedLuas, setEditedLuas] = useState("0");
  const [editedLatitude, setEditedLatitude] = useState("0");
  const [editedLongitude, setEditedLongitude] = useState("0");

  useEffect(() => {
    getMosqueLocation();

    // const interval = setInterval(getMosqueLocation, 500);

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  const getMosqueLocation = async () => {
    try {
      const res = await getMosqueLocId(1);
      setNama(res.data.data.nama);
      setAlamat(res.data.data.alamat);
      setLuas(res.data.data.luas);
      setLatitude(res.data.data.latitude);
      setLongitude(res.data.data.longitude);
    } catch (err) {
      console.log(err);
    }
  };

  const editMosqueLocation = async () => {
    try {
      await putMosqueLoc(
        1,
        editedNama,
        editedAlamat,
        editedLuas,
        editedLatitude,
        editedLongitude
      );
      setNama(editedNama);
      setAlamat(editedAlamat);
      setLuas(parseFloat(editedLuas));
      setLatitude(parseFloat(editedLatitude));
      setLongitude(parseFloat(editedLongitude));
      setIsEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (
    nama === "" ||
    alamat === "" ||
    luas === 0 ||
    latitude === 0 ||
    longitude === 0
  ) {
    return <Loading />;
  }

  if (isEdit) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col justify-center items-center mt-16">
          <h1 className="font-bold text-center my-16 text-4xl">{nama}</h1>
          {/* profile picture */}
          <div className="flex justify-center mb-10">
            <img
              src="/masjid.jpg"
              alt="Majid Picture"
              className="w-[300px] h-[300px] rounded-full border-[10px] border-[#04387D]"
            />
          </div>
          <div className="w-full md:w-5/6 lg:w-2/3 mx-auto xl:w-3/6 min-h-screen">
            <form>
              <div className="w-full px-4 mb-8">
                <label
                  htmlFor="enterNama"
                  className="text-base text-sky-400 font-bold"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="enterNama"
                  placeholder="Nama Masjid"
                  value={editedNama}
                  className="w-full bg-neutral-200 text-dark p-3 rounded-md focus:outline-none focus:ring-sky-400 focus:ring-1 focus:border-sky-400"
                  onChange={(e) => setEditedNama(e.target.value)}
                />
              </div>
              <div className="w-full px-4 mb-8">
                <label
                  htmlFor="enterAlamat"
                  className="text-base text-sky-400 font-bold"
                >
                  Alamat
                </label>
                <input
                  type="text"
                  id="enterAlamat"
                  placeholder="Alamat Masjid"
                  value={editedAlamat}
                  className="w-full bg-neutral-200 text-dark p-3 rounded-md focus:outline-none focus:ring-sky-400 focus:ring-1 focus:border-sky-400"
                  onChange={(e) => setEditedAlamat(e.target.value)}
                />
              </div>
              <div className="w-full px-4 mb-8">
                <label
                  htmlFor="enterLuas"
                  className="text-base text-sky-400 font-bold"
                >
                  Luas
                </label>
                <input
                  type="number" // Menggunakan tipe "number" untuk memungkinkan desimal
                  id="enterLuas"
                  placeholder="Luas Masjid"
                  value={editedLuas}
                  className="w-full bg-neutral-200 text-dark p-3 rounded-md focus:outline-none focus:ring-sky-400 focus:ring-1 focus:border-sky-400"
                  onChange={(e) => {
                    setEditedLuas(e.target.value); // Menggunakan tipe "string" untuk state
                  }}
                />
              </div>
              <div className="w-full px-4 mb-8">
                <label
                  htmlFor="enterLatitude"
                  className="text-base text-sky-400 font-bold"
                >
                  Latitude
                </label>
                <input
                  type="number" // Menggunakan tipe "number" untuk memungkinkan desimal
                  id="enterLatitude"
                  placeholder="Enter Latitude"
                  value={editedLatitude}
                  className="w-full bg-neutral-200 text-dark p-3 rounded-md focus:outline-none focus:ring-sky-400 focus:ring-1 focus:border-sky-400"
                  onChange={(e) => {
                    setEditedLatitude(e.target.value); // Menggunakan tipe "string" untuk state
                  }}
                />
              </div>
              <div className="w-full px-4 mb-8">
                <label
                  htmlFor="enterLongitude"
                  className="text-base text-sky-400 font-bold"
                >
                  Longitude
                </label>
                <input
                  type="number" // Menggunakan tipe "number" untuk memungkinkan desimal
                  id="enterLongitude"
                  placeholder="Enter Longitude"
                  value={editedLongitude}
                  className="w-full bg-neutral-200 text-dark p-3 rounded-md focus:outline-none focus:ring-sky-400 focus:ring-1 focus:border-sky-400"
                  onChange={(e) => {
                    setEditedLongitude(e.target.value); // Menggunakan tipe "string" untuk state
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => editMosqueLocation()}
                className="text-base font-semibold bg-sky-400 text-white py-2 px-8 rounded-full w-full hover:opacity-80 hover:shadow-lg transition duration-500 mb-4"
              >
                Set Location
              </button>
              <button
                type="reset"
                className="text-base font-semibold bg-red-400 text-white py-2 px-8 rounded-full w-full hover:opacity-80 hover:shadow-lg transition duration-500"
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-center mb-16 text-4xl mt-16">{nama}</h1>
          <div className="flex justify-center mb-10">
            <img
              src="/masjid.jpg"
              alt="Majid Picture"
              className="w-[300px] h-[300px] rounded-full border-[10px] border-[#04387D] "
            />
          </div>
          {/* Informasi Lokasi */}
          <div className="w-full md:w-5/6 lg:w-2/3 mx-auto xl:w-3/6 min-h-screen">
            <div className="mb-8">
              <h2 className="text-base text-sky-400 font-bold">Nama:</h2>
              <p className="text-base text-neutral-700">{nama}</p>
            </div>
            <div className="mb-8">
              <h2 className="text-base text-sky-400 font-bold">Alamat:</h2>
              <p className="text-base text-neutral-700">{alamat}</p>
            </div>
            <div className="mb-8">
              <h2 className="text-base text-sky-400 font-bold">Luas:</h2>
              <p className="text-base text-neutral-700">{luas}</p>
            </div>
            <div className="mb-8">
              <h2 className="text-base text-sky-400 font-bold">Latitude:</h2>
              <p className="text-base text-neutral-700">{latitude}</p>
            </div>
            <div className="mb-8">
              <h2 className="text-base text-sky-400 font-bold">Longitude:</h2>
              <p className="text-base text-neutral-700">{longitude}</p>
            </div>
            <button
              className="text-base font-semibold bg-sky-400 text-white py-2 px-8 rounded-full w-full hover:opacity-80 hover:shadow-lg transition duration-500 mb-4"
              onClick={() => {
                setIsEdit(true);
                setEditedNama(nama);
                setEditedAlamat(alamat);
                setEditedLuas(luas.toString());
                setEditedLatitude(latitude.toString());
                setEditedLongitude(longitude.toString());
              }}
            >
              Edit Location
            </button>
            <button
              type="reset"
              className="text-base font-semibold bg-blue-400 text-white py-2 px-8 rounded-full w-full hover:opacity-80 hover:shadow-lg transition duration-500 mb-10"
              onClick={() => getMosqueLocation()}
            >
              Fetch Masjid Location
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default MasjidLoc;
