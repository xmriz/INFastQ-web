import Navbar from "../../components/Navbar";

const Loading = () => {
  return (
    <div className="-mt-16">
      <Navbar />
      <h1 className="flex justify-center items-center font-bold text-4xl text-[#04387D] h-screen animate-pulse">
        Loading...
      </h1>
    </div>
  );
};

export default Loading;