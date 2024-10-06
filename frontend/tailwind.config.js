/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        primary: '#1da1f2',
        secondary: '#14171a',
        accent: '#f50',
      },
      spacing: {
        // Custom spacing for margins, paddings, etc.
        '128': '32rem',
        '144': '36rem',
      },
      fontFamily: {
        // Define custom fonts
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [
    // If you need any additional Tailwind CSS plugins, you can add them here
    require('@tailwindcss/forms'),  // Adds better styling for forms
    require('@tailwindcss/typography'),  // Adds better styling for prose content
    require('@tailwindcss/aspect-ratio'),  // Utility for aspect ratios
  ],
}
