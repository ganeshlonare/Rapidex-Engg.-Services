"use client";

import React, { useRef, useCallback } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductBox from './ProductBox';

const FeaturedProductsRow = ({ products = [] }) => {
  const scrollerRef = useRef(null);

  const scrollByAmount = useCallback((dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.9, 220);
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }, []);

  if (!products?.length) return null;

  return (
    <div className="relative">
      {/* Left Button */}
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollByAmount(-1)}
        className="hidden sm:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 shadow hover:bg-white focus:outline-none"
      >
        <IoIosArrowBack className="text-xl" />
      </button>

      {/* Right Button */}
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollByAmount(1)}
        className="hidden sm:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 shadow hover:bg-white focus:outline-none"
      >
        <IoIosArrowForward className="text-xl" />
      </button>

      {/* Scroller */}
      <div
        ref={scrollerRef}
        className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      >
        <div className="flex items-stretch gap-3 sm:gap-4 md:gap-5 lg:gap-6 snap-x snap-mandatory px-1">
          {products.map((product) => (
            <div
              key={product._id}
              className="snap-start min-w-[160px] xs:min-w-[180px] sm:min-w-[210px] md:min-w-[230px] lg:min-w-[250px]"
            >
              <ProductBox product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductsRow;
