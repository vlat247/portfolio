"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/iqanat/DJI_0361.jpg",
  "/iqanat/DSCF3767.jpg",
  "/iqanat/XT304484.jpg"
];

export default function IqanatGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState([0, 1, 2]);
  const [animatingNext, setAnimatingNext] = useState<number | null>(null);
  const [animatingPrev, setAnimatingPrev] = useState<number | null>(null);

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

  const ANIMATION_DURATION = 250;

  const nextImage = (e?: React.MouseEvent | Event) => {
    if (e && 'stopPropagation' in e) e.stopPropagation();
    if (animatingNext !== null || animatingPrev !== null) return;
    
    const topCard = order[0];
    setAnimatingNext(topCard);
    
    setTimeout(() => {
      setOrder(prev => {
        const next = [...prev];
        const top = next.shift();
        next.push(top!);
        return next;
      });
      setAnimatingNext(null);
    }, ANIMATION_DURATION); 
  };

  const prevImage = (e?: React.MouseEvent | Event) => {
    if (e && 'stopPropagation' in e) e.stopPropagation();
    if (animatingNext !== null || animatingPrev !== null) return;
    
    const bottomCard = order[order.length - 1];
    setAnimatingPrev(bottomCard);
    
    setTimeout(() => {
      setOrder(prev => {
        const next = [...prev];
        const bottom = next.pop();
        next.unshift(bottom!);
        return next;
      });
      setAnimatingPrev(null);
    }, ANIMATION_DURATION);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="underline decoration-gray-400 decoration-1 underline-offset-3 hover:decoration-gray-500 transition-opacity focus:outline-none"
      >
        Iqanat High School of Burabay
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative w-[90vw] md:w-[50vw] max-w-[800px] perspective-1000" onClick={(e) => e.stopPropagation()}>
              
              {/* Invisible spacer to maintain layout height based on aspect ratio */}
              <div className="invisible bg-white p-4 pb-16 md:p-6 md:pb-24 shadow-md rounded-[2px] w-full">
                <div className="relative w-full aspect-video" />
                <div className="absolute bottom-5 md:bottom-8 left-0 right-0 text-center text-base md:text-lg italic">
                  Spacer
                </div>
              </div>

              {/* Cards */}
              {images.map((url, originalIndex) => {
                const stackIndex = order.indexOf(originalIndex);
                const isAnimatingNext = animatingNext === originalIndex;
                const isAnimatingPrev = animatingPrev === originalIndex;

                let x: string | number = 0;
                let y = stackIndex * 15;
                let scale = 1 - stackIndex * 0.05;
                let rotate = stackIndex === 0 ? -1 : (stackIndex % 2 === 0 ? 3 : -2);
                let zIndex = images.length - stackIndex;
                let filter = "blur(0px)";

                const isBlurred = isAnimatingNext || isAnimatingPrev;
                if (isAnimatingNext) {
                  x = "120%"; 
                  y = 50; 
                  rotate = 15;
                  zIndex = images.length + 1; // Stay firmly on top while flying right
                  filter = "blur(4px)"; // Softer motion blur
                } else if (isAnimatingPrev) {
                  x = "120%"; // Also fly right to simulate pulling from under
                  y = 50;
                  rotate = 15;
                  zIndex = -1; // Stay completely at the bottom while flying out
                  filter = "blur(4px)"; // Softer motion blur
                }

                return (
                  <motion.div 
                    key={originalIndex}
                    initial={false}
                    animate={{ x, y, scale, rotate, zIndex, filter }}
                    transition={{ 
                      default: { type: "spring", stiffness: 180, damping: 22, mass: 1 },
                      filter: { type: "tween", duration: isBlurred ? 0.2 : 0.6, ease: isBlurred ? "easeIn" : "easeOut" } // Smooth linear blur instead of bouncy spring
                    }}
                    drag={stackIndex === 0 ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.8}
                    onDragEnd={(e, { offset, velocity }) => {
                      if (offset.x > 100 || velocity.x > 500) {
                        nextImage();
                      } else if (offset.x < -100 || velocity.x < -500) {
                        prevImage();
                      }
                    }}
                    className={`absolute inset-0 bg-white p-4 pb-16 md:p-6 md:pb-24 shadow-2xl border border-gray-100 rounded-[2px] w-full origin-bottom ${stackIndex === 0 ? 'cursor-grab active:cursor-grabbing' : ''}`}
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-video bg-[#f0f0f0] flex items-center justify-center overflow-hidden border border-gray-100 shadow-inner pointer-events-none">
                      <img 
                        src={url} 
                        alt={`Photo ${originalIndex + 1}`}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'radial-gradient(circle, transparent 60%, rgba(0,0,0,0.4) 150%)' }}
                      />
                    </div>

                    {/* Caption */}
                    <div className="absolute bottom-5 md:bottom-8 left-0 right-0 text-center text-gray-500 font-medium text-base md:text-lg italic pointer-events-none">
                      Graduation 2026
                    </div>
                  </motion.div>
                );
              })}

              {/* Controls */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-5xl p-2 drop-shadow-lg transition-transform hover:scale-110 focus:outline-none z-[100]"
                    aria-label="Previous image"
                  >
                    &#8249;
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-5xl p-2 drop-shadow-lg transition-transform hover:scale-110 focus:outline-none z-[100]"
                    aria-label="Next image"
                  >
                    &#8250;
                  </button>
                </>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
