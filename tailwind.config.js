/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        gradient: {
          purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          royal: 'linear-gradient(135deg, #9333ea 0%, #c084fc 50%, #e879f9 100%)',
          cosmic: 'linear-gradient(135deg, #3b0764 0%, #581c87 25%, #7c3aed 50%, #a855f7 75%, #c084fc 100%)',
        }
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-royal': 'linear-gradient(135deg, #9333ea 0%, #c084fc 50%, #e879f9 100%)',
        'gradient-cosmic': 'linear-gradient(135deg, #3b0764 0%, #581c87 25%, #7c3aed 50%, #a855f7 75%, #c084fc 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'purple': '0 10px 25px -5px rgba(147, 51, 234, 0.4), 0 4px 6px -2px rgba(147, 51, 234, 0.1)',
        'purple-lg': '0 20px 40px -10px rgba(147, 51, 234, 0.4), 0 8px 16px -4px rgba(147, 51, 234, 0.1)',
        'royal': '0 15px 30px -8px rgba(192, 132, 252, 0.5), 0 6px 12px -3px rgba(192, 132, 252, 0.2)',
        'cosmic': '0 25px 50px -12px rgba(59, 7, 100, 0.6), 0 10px 20px -5px rgba(59, 7, 100, 0.3)',
        'glow': '0 0 20px rgba(147, 51, 234, 0.6), 0 0 40px rgba(147, 51, 234, 0.4), 0 0 80px rgba(147, 51, 234, 0.2)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(147, 51, 234, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'bounce-in': 'bounceIn 0.8s ease-out',
        'pulse-purple': 'pulsePurple 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        pulsePurple: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(147, 51, 234, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(147, 51, 234, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 5px rgba(147, 51, 234, 0.6))' },
          '100%': { filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.9))' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
}