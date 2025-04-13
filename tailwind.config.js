/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#005f73',
        secondary: '#0a9396',
        accent: '#c9007f',
        background: "#1b095a",
        card: '#9f4dbb',
        textLight: '#ffffff',
        textMuted: 'rgba(255,255,255,0.7)',
        error: '#bb3e03',
      },
      backgroundImage: {
        'star-field': 'radial-gradient(circle at top, #2c1b52, #0a021f)',
      },
      boxShadow: {
        'custom': '0 4px 14px -2px rgba(0, 0, 0, 0.25)',
        'space-card': '0 8px 32px -12px rgba(0, 95, 115, 0.25)'
      },
      spacing: {
        '128': '32rem'
      },
      borderWidth: {
        '3': '3px'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out'
      }
    }
  },
  plugins: [],
}
