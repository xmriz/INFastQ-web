import axios from "axios";

export const getLocation = async () => {
  return await axios.get("https://infastq-api-production.up.railway.app/api/location/");
}