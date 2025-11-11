'use client'

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  className?: string;
}

/**
 * Re-usable "glass capsule" button (no droplet).
 *
 * <GlassButton onClick={...} label="Book a Call" className="mt-6" />
 */
export const GlassButton: React.FC<GlassButtonProps> = ({
  label = 'Schedule a Free Consultation',
  className = '',
  ...rest
}) => (
  <button
    {...rest}
    className={`
      relative inline-flex items-center justify-center
      rounded-full px-8 py-3 font-sans font-semibold tracking-wide
      text-white transition
      bg-gradient-to-r from-royal via-royal2 via-65% to-onyx
      ring-1 ring-inset ring-[#050514]
      shadow-glass
      hover:brightness-110 hover:shadow-glass-lg
      active:scale-95 active:shadow-glass-sm
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal
      ${className}
    `}
  >
    <span className="relative z-10">{label}</span>

    {/* gloss + teal bloom */}
    <span
      aria-hidden
      className="
        pointer-events-none absolute inset-0 rounded-full
        bg-[radial-gradient(circle_at_18%_25%,rgba(255,255,255,.25)_0_40%,transparent_50%),radial-gradient(circle_at_85%_22%,rgba(10,191,142,.25)_0_32%,transparent_50%)]
      "
    />
  </button>
);

GlassButton.displayName = 'GlassButton'; 