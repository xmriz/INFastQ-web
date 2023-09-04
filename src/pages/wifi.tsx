import  { useState } from "react";
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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="font-bold text-center my-16 text-4xl">SSID</h1>
        <div>
          <label htmlFor="ssidDropdown">SSID:</label>
          <select
            id="ssidDropdown"
            onChange={handleSSIDChange}
            value={selectedSSID}
          >
            <option value="SiPalingPaling">SiPalingPaling</option>
            <option value="Halleluya">Halleluya</option>
          </select>
        </div>
        <div>
          <label htmlFor="passwordInput">Password:</label>
          <input
            type="text"
            id="passwordInput"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
          />
        </div>
        <button className="bg-sky-500 px-3" onClick={handleRegister}>
          Register
        </button>
      </div>
    </>
  );
};

export default Wifi;
