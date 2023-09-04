import { useState, ChangeEvent, FormEvent } from "react";
import Navbar from "../components/Navbar";

const WifiRegistration: React.FC = () => {
  const [ssidList, setSsidList] = useState<string[]>([]);
  const [newSsid, setNewSsid] = useState<string>("");

  const handleSsidChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewSsid(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (newSsid.trim() !== "") {
      setSsidList([...ssidList, newSsid]);
      setNewSsid("");
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="font-bold text-center my-16 text-4xl">WiFi Registration</h1>
      <div className="w-full md:w-5/6 lg:w-2/3 mx-auto xl:w-3/6 min-h-screen">
        <form onSubmit={handleSubmit}>
          <div className="w-full px-4 mb-8">
            <label htmlFor="ssidInput" className="text-base text-sky-400 font-bold">
              Enter SSID
            </label>
            <input
              type="text"
              id="ssidInput"
              value={newSsid}
              onChange={handleSsidChange}
              placeholder="Enter SSID"
              className="w-full bg-neutral-200 text-dark p-3 rounded-md focus:outline-none focus:ring-sky-400 focus:ring-1 focus:border-sky-400"
            />
          </div>
          <button
            type="submit"
            className="text-base font-semibold bg-sky-400 text-white py-2 px-8 rounded-full w-full hover:opacity-80 hover:shadow-lg transition duration-500"
          >
            Add SSID
          </button>
        </form>
        <div className="mt-8">
          <h2 className="text-base text-sky-400 font-bold">SSID List:</h2>
          <ul className="list-disc ml-4">
            {ssidList.map((ssid, index) => (
              <li key={index}>{ssid}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default WifiRegistration;
