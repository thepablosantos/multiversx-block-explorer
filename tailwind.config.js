/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-bg': 'var(--color-main-bg)',
        'card-bg': 'var(--color-card-bg)',
        'card-bg-light': 'var(--color-card-bg-light)',
        'accent': 'var(--color-accent)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'border': 'var(--color-border)',
        'success': 'var(--color-success)',
        'error': 'var(--color-error)',
        'warning': 'var(--color-warning)',
        'gradient-start': 'var(--gradient-start)',
        'gradient-mid': 'var(--gradient-mid)',
        'gradient-end': 'var(--gradient-end)',
      },
      backgroundColor: {
        'card-hover': 'var(--card-hover)',
        'card-bg': 'var(--color-card-bg)',
      },
      boxShadow: {
        'card': 'var(--card-shadow)',
        'card-hover': 'var(--card-hover-shadow)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        'sm': '8px',
        'md': '12px',
      },
      opacity: {
        '15': '0.15',
        '35': '0.35',
      },
      ringOpacity: {
        '15': '0.15',
        '20': '0.20',
      },
    },
  },
  plugins: [],
}

