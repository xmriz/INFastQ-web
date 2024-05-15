import axios from "axios";

export const getSummary = async () => {
  return await axios.get("https://web-production-f1c5.up.railway.app/api/summary/");
}

export const resetSummary = async () => {
  return await axios.delete("https://web-production-f1c5.up.railway.app/api/reset/");
}
