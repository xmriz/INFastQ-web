import { useEffect, useState } from "react";
import { getSummary, resetSummary } from "../services/summary.service";
import Navbar from "../components/Navbar";
import Loading from "./Loading/loading";

const TotalUang = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSummary(); // Memuat data saat komponen dimuat

    const interval = setInterval(fetchSummary, 500);

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

  const reset = async () => {
    try {
      const confirm = window.confirm("Apakah anda yakin ingin mereset?");
      if (!confirm) return;
      setSummary(null);
      await resetSummary();
    } catch (err) {
      console.log(err);
    }
  };

  if (summary === null) {
    return (
      <Loading />
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
        {/* reset summary */}
        <div>
          <button
            className="bg-red-600 text-2xl text-white font-semibold py-2 px-5 mt-10 rounded-full hover:bg-red-400 transition-colors duration-300 "
            onClick={reset}
          >
            Reset
          </button>
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
