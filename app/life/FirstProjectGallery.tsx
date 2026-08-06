"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/my-firstproject/image.png",
  "/my-firstproject/image copy.png",
  "/my-firstproject/image copy 2.png"
];

export default function FirstProjectGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowRight") nextImage(e as any);
      if (e.key === "ArrowLeft") prevImage(e as any);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent scrolling behind
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="underline decoration-gray-400 decoration-1 underline-offset-3 hover:decoration-gray-500 transition-opacity focus:outline-none"
      >
        my first project ever
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            {/* Polaroid style container */}
            <motion.div 
              initial={{ scale: 0.95, y: 10, rotate: 0, filter: "blur(8px)" }}
              animate={{ scale: 1, y: 0, rotate: -1, filter: "blur(0px)" }}
              exit={{ scale: 0.95, y: 10, rotate: 0, filter: "blur(8px)", transition: { duration: 0.2 } }}
              transition={{ type: "spring", damping: 20, stiffness: 120 }}
              className="relative bg-white p-4 pb-16 md:p-6 md:pb-24 shadow-md rounded-[2px] w-[90vw] md:w-[50vw] max-w-[800px]"
              onClick={(e) => e.stopPropagation()}
            >


            {/* Image */}
            <div className="relative w-full aspect-video bg-[#f0f0f0] flex items-center justify-center overflow-hidden border border-gray-100 shadow-inner">
              <img 
                src={images[currentIndex]} 
                alt={`Project screenshot ${currentIndex + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Vignette Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle, transparent 60%, rgba(0,0,0,0.5) 150%)' }}
              />
            </div>

            {/* Arrows */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-5xl p-2 drop-shadow-lg transition-transform hover:scale-110 focus:outline-none"
                  aria-label="Previous image"
                >
                  &#8249;
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-5xl p-2 drop-shadow-lg transition-transform hover:scale-110 focus:outline-none"
                  aria-label="Next image"
                >
                  &#8250;
                </button>
              </>
            )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
