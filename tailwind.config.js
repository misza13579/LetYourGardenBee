/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#49733D',
          purple: '#A496D9',
          light: '#F2E9BB',
          gold: '#FFD700'
        }
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'faluj': 'faluj 20s infinite linear',
        'unoszenie': 'unoszenie 3s infinite ease-in-out',
      },
      backdropBlur: {
        xs: '2px',
      },
      zIndex: {
        '1000': '1000',
      },
      spacing: {
        '1200': '1200px',
        '30': '7.5rem',
        '40': '10rem',
        '50': '12.5rem',
        '60': '15rem',
        '70': '17.5rem',
        '80': '20rem',
        '90': '22.5rem',
      }
    },
  },
  plugins: [],
}