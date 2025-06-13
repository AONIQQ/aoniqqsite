"use client";

import React from 'react';

interface Testimonial {
    id: number;
    body: string;
    author: string;
    role: string;
}

export const TestimonialCard = ({ quote, author }: { quote: string; author: string; }) => (
  <article
    className="
      relative w-full max-w-[26rem] overflow-hidden rounded-3xl
      bg-glass p-6 backdrop-blur-md
      ring-1 ring-inset ring-[#050514] shadow-card-glass
    "
  >
    {/* gloss + teal bloom */}
    <span aria-hidden className="
      pointer-events-none absolute inset-0 rounded-3xl
      bg-[radial-gradient(circle_at_18%_15%,rgba(255,255,255,.12)_0_35%,transparent_60%),radial-gradient(circle_at_88%_12%,rgba(10,191,142,.18)_0_25%,transparent_55%)]
    " />

    {/* quote body */}
    <blockquote className="relative z-10">
      <p
        className="
          font-serif text-xl leading-relaxed text-[#E5E5E5]
          max-h-[18rem] overflow-y-auto pr-2
          [mask-image:linear-gradient(180deg,#fff,85%,transparent)]
        "
      >
        “{quote}”
      </p>

      {/* author */}
      <footer className="mt-6 text-sm font-semibold tracking-wide">
        <span className="bg-gradient-to-r from-royal to-royal2 bg-clip-text text-transparent">
          {author}
        </span>
      </footer>
    </blockquote>
  </article>
);

export function ShuffleCards({ testimonials }: { testimonials: Testimonial[] }) {
  const [positions, setPositions] = React.useState(
    Array.from({ length: testimonials.length }, (_, i) => 
      i === 0 ? "front" : i === 1 ? "middle" : "back"
    )
  );

  const handleShuffle = () => {
    const newPositions = [...positions];
    const last = newPositions.pop();
    if (last) {
      newPositions.unshift(last);
    }
    setPositions(newPositions);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
        handleShuffle();
    }, 10000);
    return () => clearInterval(interval);
  }, [handleShuffle]);

  return (
    <div className="grid place-content-center overflow-hidden px-8 py-24 text-slate-50 min-h-screen h-full w-full">
      <div className="relative h-[550px] w-[800px] md:w-[1000px]">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            quote={testimonial.body}
            author={testimonial.author}
          />
        ))}
      </div>
    </div>
  );
}