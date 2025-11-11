'use client';

import React from 'react';
import { Quote } from 'lucide-react';

export const GlassCard = ({ quote, author }: { quote: string; author: string; }) => (
  <article
    className="
      relative w-full max-w-[26rem] h-[26rem] overflow-hidden rounded-3xl
      bg-glass p-10 backdrop-blur-md
      ring-1 ring-inset ring-[#050514] shadow-card-glass
    "
  >
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-royal to-onyx opacity-15" />

    {/* gloss + teal bloom */}
    <span aria-hidden className="
      pointer-events-none absolute inset-0 rounded-3xl
      bg-[radial-gradient(circle_at_18%_15%,rgba(255,255,255,.12)_0_35%,transparent_60%),radial-gradient(circle_at_88%_12%,rgba(10,191,142,.18)_0_25%,transparent_55%)]
    " />

    {/* quote body */}
    <blockquote className="relative z-10 h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
            <Quote className="h-8 w-8 text-royal/50" />
            <div className="text-right">
                <p className="text-sm font-semibold tracking-wide bg-gradient-to-r from-royal to-royal2 bg-clip-text text-transparent">{author.split(' | ')[0]}</p>
                <p className="text-xs text-mute">{author.split(' | ')[1]}</p>
            </div>
        </div>
        <p
          className="
            font-serif text-xl leading-relaxed text-[#E5E5E5]
            max-h-[18rem] overflow-y-auto pr-2
            [mask-image:linear-gradient(180deg,#fff,95%,transparent)]
          "
        >
          “{quote}”
        </p>
      </div>
    </blockquote>
  </article>
); 