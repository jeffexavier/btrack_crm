/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#fbfffe',
      'black': '#0a0310',
      'aureolin': '#F2E318',
      'grape': '#690CA1',
      'french-violet': '#731dd8',
      'slate-blue':'#715EB6',
      'snow': '#FFFBFC',
      'rose': '#ff007f',
      'eerie-black': '#191716',
      'russian-violet':'#392C60',
      'rebecca-purple':'#5941a9',
      'periwinkle': '#b9b2db',
      'hunyadi-yellow': '#f4b860',
      "lavender": '#DAD9ED',
      "tropical-indigo": "#897AC2",
      'lavender-blush': "#FCF0F7",
    }
  },
  plugins: [],
}
