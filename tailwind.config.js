/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
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
      'red': '#c61a09',
      'primary-flat': '#CEE4FE',
      'secondary-flat': '#EADCF8',
      'success-flat': '#DAFBE8',
      'warning-flat': '#FDEFD8',
      'error-flat': '#FDD8E5',
      'primary-flat-hover': '#B7D5F8',
      'secondary-flat-hover': '#E0CBF5',
      'success-flat-hover': '#C8F9DD',
      'warning-flat-hover': '#FCE7C5',
      'error-flat-hover': '#FCC5D8',
      'primary-full': '#0072F5',
      'secondary-full': '#7828C8',
      'success-full': '#13A452',
      'warning-full': '#B97509',
      'error-full': '#F31260'
    }
  },
  plugins: [],
}
