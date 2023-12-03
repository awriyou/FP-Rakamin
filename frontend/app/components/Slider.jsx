"use client"
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


export default function Slider({ children: images, autoSlide = false, autoSlideInterval = 3000 }) {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr ((curr) => (
    curr == 0 ? images.length - 1 : curr - 1
  ));
  const next = () => setCurr ((curr) => ( 
    curr == images.length - 1 ? 0 : curr + 1
  ));

  useEffect(() => {
    if (!autoSlide) return 
      const slideInterval = setInterval(next, autoSlideInterval)
      return() => clearInterval(slideInterval)
  }, []);
  
  return(
    <div className="overflow-hidden relative">
      <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${curr * 100}%)` }}>
        {images}
      </div>
      <div>
        <button>
          <IoIosArrowBack  className="absolute top-1/2 left-12 cursor-pointer w-8 h-8 text-light opacity-30 hover:opacity-75" onClick={prev} />
        </button>
        <button>
          <IoIosArrowForward  className="absolute top-1/2 right-12 cursor-pointer w-8 h-8 text-light opacity-30 hover:opacity-75" onClick={next} />
        </button>
      </div>

      <div className="absolute bottom-32 right-0 left-0">
        <div className="flex items-center justify-center gap-4">
          {images.map((_, i) => (
            <div
              className={`
              transition-all w-1 h-1 bg-light rounded-full
              ${curr === i ? "p-1" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
    </div>

  )
}