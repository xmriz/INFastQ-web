import axios from "axios";

export const getLocation = async () => {
  return await axios.get("https://web-production-f1c5.up.railway.app/api/location/");
}