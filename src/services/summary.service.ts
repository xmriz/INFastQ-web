import axios from "axios";

// fetching api dari backend localhost:8000/api/summary/
export const getSummary = async () => {
  return await axios.get("https://infastq-api-production.up.railway.app/api/summary/");
}

export const resetSummary = async () => {
  return await axios.delete("https://infastq-api-production.up.railway.app/api/reset/");
}