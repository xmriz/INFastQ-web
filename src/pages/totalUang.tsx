import { useEffect, useState } from "react";
import { getSummary } from "../services/summary.service";
import Navbar from "../components/Navbar";

const TotalUang = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSummary(); // Memuat data saat komponen dimuat

    const interval = setInterval(fetchSummary, 1000); // Polling setiap 5 detik

    return () => {
      clearInterval(interval); // Membersihkan interval saat komponen tidak lagi digunakan
    };
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await getSummary();
      setSummary(res.data.total_uang);
    } catch (err) {
      console.log(err);
    }
  };

  if (summary === null) {
    return (
      <div className="bg-[rgba(0,0,0,0.2)]">
        <h1 className="flex justify-center items-center font-bold text-4xl text-[#04387D] h-screen animate-pulse">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-center my-16 text-4xl">Kotak Amal 1</h1>
        <div className="w-[400px] h-[400px] rounded-full bg-transparent border-[10px] border-[#04387D]  text-center relative">
          <h3 className="flex justify-center items-center font-bold text-4xl text-[#04387D] absolute inset-0">
            {formatPrice(summary)}
          </h3>
        </div>
      </div>
    </div>
  );
};

const formatPrice = (price: number) => {
  return price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};

export default TotalUang;