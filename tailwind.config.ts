import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontFamily: {
        sans: ['var(--font-epilogue)'],
        serif: ['var(--font-playfair-display)'],
        mono: ['var(--font-jetbrains-mono)'],
      },
      colors: {
        obsidian: '#0D0D0D',
        porcelain: '#F5F7F8',
        royal:   '#2454FF',
        royal2:  '#5B5BFF',
        tealLux: '#0ABF8E',
        ink:     '#D0D0D0',
        mute:    '#8A8A8A',
        'white-_06': 'rgba(255, 255, 255, 0.06)'
      },
      boxShadow: {
        'cta-glow': '0 0 28px 0 rgba(36, 84, 255, 0.30)',
        'cta-glow-hover': '0 6px 28px rgba(36, 84, 255, 0.35)',
        'diffused-bloom': '0 0 24px rgba(255, 255, 255, 0.06)',
        'cta-inset': '0 0 0 3px rgba(255, 255, 255, .08) inset',
        'cta-inset-hover': '0 0 0 3px rgba(255, 255, 255, .12) inset'
      },
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		animation: {
  			'gradient-x': 'gradient-x 15s ease infinite',
  			pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  		},
  		keyframes: {
  			'gradient-x': {
  				'0%, 100%': {
  					'background-size': '200% 200%',
  					'background-position': 'left center'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'right center'
  				}
  			},
  			pulse: {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '.5'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        '.text-shadow-glow': {
          textShadow: '0 0 5px rgba(255,255,255,0.7), 0 0 10px rgba(255,255,255,0.5), 0 0 15px rgba(255,255,255,0.3)',
        },
      };
      addUtilities(newUtilities);
    },
      require("tailwindcss-animate")
],
};

export default config; 