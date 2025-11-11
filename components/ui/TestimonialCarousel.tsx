"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { cn } from '@/lib/utils';
import { HoverButton } from './HoverButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  body: string;
  author: string;
  role: string;
}

const positions = [
    { rotate: -6, x: "-50%", zIndex: 1, scale: 0.9, opacity: 0.8 },
    { rotate: 0, x: "0%", zIndex: 2, scale: 1, opacity: 1 },
    { rotate: 6, x: "50%", zIndex: 1, scale: 0.9, opacity: 0.8 },
];

export const TestimonialCarousel = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const [positionIdx, setPositionIdx] = useState(0);
  const dragRef = useRef(0);

  const handleShuffle = () => {
    setPositionIdx((prev) => (prev + 1) % testimonials.length);
  };
  
  const goBack = () => {
    setPositionIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }

  const visibleTestimonials = Array.from({ length: 3 }).map((_, i) => {
    return testimonials[(positionIdx + i) % testimonials.length];
  });

  return (
    <div className="flex flex-col items-center">
        <div className="relative h-[600px] w-full flex items-center justify-center">
            {visibleTestimonials.map((testimonial, index) => {
                const position = positions[index];
                const isFront = position.zIndex === 2;

                return (
                    <motion.div
                        key={testimonial.id}
                        className={cn(
                            "absolute cursor-grab active:cursor-grabbing",
                            !isFront && "pointer-events-none"
                        )}
                        initial={false}
                        animate={position}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        drag={isFront ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.35}
                        onDragStart={(e) => {
                            if ('clientX' in e) {
                            dragRef.current = (e as PointerEvent).clientX;
                            } else {
                            dragRef.current = (e as any).touches[0].clientX;
                            }
                        }}
                        onDragEnd={(e) => {
                            let clientX;
                            if ('clientX' in e) {
                                clientX = (e as PointerEvent).clientX;
                            } else {
                                clientX = (e as any).changedTouches[0].clientX;
                            }

                            if (dragRef.current - clientX > 150) {
                                handleShuffle();
                            }
                            if (dragRef.current - clientX < -150) {
                                goBack();
                            }
                            dragRef.current = 0;
                        }}
                    >
                    <GlassCard
                        quote={testimonial.body}
                        author={`${testimonial.author} | ${testimonial.role}`}
                    />
                    </motion.div>
                )
            })}
        </div>
        <div className="flex gap-4 mt-8">
            <HoverButton onClick={goBack}><ChevronLeft /></HoverButton>
            <HoverButton onClick={handleShuffle}><ChevronRight /></HoverButton>
        </div>
    </div>
  );
}; 