import axios from "axios";

export const getMosqueLocId = async (id: number) => {
  return await axios.get(`https://infastq-api-production.up.railway.app/api/masjid/${id}`);
}

export const postMosqueLoc = async (lat: number, lng: number) => {
  const data = {
    latitude: lat,
    longitude: lng
  }
  return await axios.post("https://infastq-api-production.up.railway.app/api/masjid/", data);
}

export const putMosqueLoc = async (id: number, nama:string, alamat:string, luas:string, lat: string, lng: string) => {
  const data = {
    nama: nama,
    alamat: alamat,
    luas: luas,
    latitude: lat,
    longitude: lng
  }
  return await axios.put(`https://infastq-api-production.up.railway.app/api/masjid/${id}`, data);
}