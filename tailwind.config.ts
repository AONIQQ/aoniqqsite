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
        display: ['var(--font-space-grotesk)'],
      },
      colors: {
        obsidian: '#0D0D0D',
        porcelain: '#F5F7F8',
        royal:   '#2454FF',
        royal2:  '#5B5BFF',
        tealLux: '#0ABF8E',
        ink:     '#D0D0D0',
        mute:    '#8A8A8A',
        'white-_06': 'rgba(255, 255, 255, 0.06)',
        indigo : '#2E2A66',
        onyx   : '#0D0D25',
        teal   : '#0ABF8E',
        glass  : 'rgba(13,13,25,0.30)',
      },
      boxShadow: {
        'glass'    : 'inset 0 0 8px rgba(2,2,20,.35)',
        'glass-lg' : 'inset 0 0 10px rgba(2,2,20,.55)',
        'glass-sm' : 'inset 0 0 6px rgba(2,2,20,.65)',
        'card-glass' : 'inset 0 0 8px rgba(2,2,20,.45)',
      },
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
		animation: {
			'gradient-x': 'gradient-x 15s ease infinite',
			pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			marquee: 'marquee var(--duration) linear infinite'
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
			},
			marquee: {
				from: { transform: 'translateX(0)' },
				to: { transform: 'translateX(calc(-100% - var(--gap)))' }
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
