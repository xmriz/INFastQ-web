import { useState } from "react";
import Navbar from "../components/Navbar";

const Wifi = () => {
  const [selectedSSID, setSelectedSSID] = useState("");
  const [password, setPassword] = useState("");

  const handleSSIDChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSSID(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRegister = () => {
    // Here, you can perform the registration logic, e.g., sending the SSID and password to a server.
    // You can also add validation checks before registering.

    console.log("Selected SSID:", selectedSSID);
    console.log("Password:", password);
  };

  return (
    <>
      <Navbar />
      <h1 className="font-bold text-center my-16 text-4xl">SSID</h1>
      <div className="w-full md:w-5/6 lg:w-2/3 mx-auto xl:w-3/6 min-h-screen">
        <div className="w-full px-4 mb-8">
          <label htmlFor="ssidDropdown" className="text-base text-sky-400 font-bold">SSID</label>
          <select
            id="ssidDropdown"
            onChange={handleSSIDChange}
            value={selectedSSID}
            className="w-full bg-neutral-200 text-dark p-3 rounded-md focus:outline-none focus:ring-sky-400 focus:ring-1 focus:border-sky-400"
          >
            <option value="SiPalingPaling">SiPalingPaling</option>
            <option value="Halleluya">Halleluya</option>
          </select>
        </div>
        <div className="w-full px-4 mb-8">
          <label htmlFor="passwordInput" className="text-base text-sky-400 font-bold">Password</label>
          <input
            type="text"
            id="passwordInput"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
            className="w-full bg-neutral-200 text-dark p-3 rounded-md focus:outline-none focus:ring-sky-400 focus:ring-1 focus:border-sky-400 invalid:focus:ring-pink-700 invalid:focus:border-pink-700"
          />
        </div>
        <button className="text-base font-semibold bg-sky-400 text-white py-2 px-8 rounded-full w-full hover:opacity-80 hover:shadow-lg transition duration-500" onClick={handleRegister}>
          Register
        </button>
      </div>
    </>
  );
};

export default Wifi;
