import Navbar from "../components/Navbar";

const Maps = () => {
  return (
    <div>
      <Navbar />
      <div>
        <h1 className="font-bold text-center mt-16 mb-8 text-4xl">
          Lokasi Kotak Amal 1
        </h1>
        {/* embed map */}
        <div className="flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.5684168773097!2d107.61245700621681!3d-6.8792608776561055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7e7dabcab47%3A0x200c70b3b8281711!2skomp.%20PPTM!5e0!3m2!1sen!2sid!4v1693495957548!5m2!1sen!2sid"
            loading="lazy"
            className="rounded-lg border border-black w-[600px] h-[500px]"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Maps;
