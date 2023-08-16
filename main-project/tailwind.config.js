
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        popins: ['Poppins', 'sans-serif'],
      },
    },
    
  },
  plugins: [require('daisyui')],
  
}

