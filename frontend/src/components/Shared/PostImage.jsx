import React, { useState, useRef } from "react";

const PostImage = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  // Go to next slide
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // Go to previous slide
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // Auto slide (optional)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

  // Swipe support for mobile
//   useEffect(() => {
//     const slider = slideRef.current;

//     let startX = 0;
//     let endX = 0;

//     const handleTouchStart = (e) => {
//       startX = e.touches[0].clientX;
//     };

//     const handleTouchMove = (e) => {
//       endX = e.touches[0].clientX;
//     };

//     const handleTouchEnd = () => {
//       if (startX - endX > 50) nextSlide(); // swipe left
//       if (endX - startX > 50) prevSlide(); // swipe right
//     };

//     slider.addEventListener("touchstart", handleTouchStart);
//     slider.addEventListener("touchmove", handleTouchMove);
//     slider.addEventListener("touchend", handleTouchEnd);

//     return () => {
//       slider.removeEventListener("touchstart", handleTouchStart);
//       slider.removeEventListener("touchmove", handleTouchMove);
//       slider.removeEventListener("touchend", handleTouchEnd);
//     };
//   }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg" ref={slideRef}>
      {/* Images wrapper */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className="w-full h-[500px] object-cover shrink-0"
            alt={`slide-${index}`}
          />
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute cursor-pointer left-3 top-1/2 transform -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PostImage;
