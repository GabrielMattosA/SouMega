/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          mega: {
            roxo: '#2E1065',       
            'roxo-light': '#4C1D95', 
            amarelo: '#EAB308',   
            'amarelo-hover': '#CA8A04',
            dark: '#0F172A',
          }
        },
      },
    },
  plugins: [],
}
