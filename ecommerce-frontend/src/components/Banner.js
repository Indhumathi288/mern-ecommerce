import { useState, useEffect } from "react";
import bannerData from "../data/bannerData";

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto slide
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === bannerData.length - 1 ? 0 : prev + 1
      );
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [paused]);

  const prevSlide = () => {
    setPaused(true);
    setCurrent(current === 0 ? bannerData.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setPaused(true);
    setCurrent(current === bannerData.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative w-full bg-white">

      {/* Banner Image */}
      <div className="overflow-hidden">
        <img
          src={bannerData[current].image}
          alt={bannerData[current].alt}
          className="w-full h-[180px] md:h-[350px] object-cover transition-all duration-700"
        />
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setPaused(true);
              setCurrent(index);
            }}
            className={`w-2.5 h-2.5 rounded-full ${
              current === index
                ? "bg-gray-800"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
