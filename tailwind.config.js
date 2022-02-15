const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      screens: {
        'xl': '1144px',
        '2xl': '1280px',
      },
      boxShadow: {
        fold: "-1px 0 0 rgba(0, 0, 0, .05)",
        darkFold: "-1px 0 0 rgba(255, 255, 255, .05)",
        crease: "0 -1px 0 rgba(0, 0, 0, .05)",
        darkCrease: "0 -1px 0 rgba(255, 255, 255, .05)",
        stroke: "0 0 0 1px rgba(0, 0, 0, .1)",
        highlight: "0 0 0 1px rgba(255, 255, 255, .1)",
        glare: "0 0 0 1px rgba(255, 255, 255, .25)",
        subtle: "0 1px 3px rgba(0, 0, 0, .2)",
        low: "0 1px 3px rgba(0, 0, 0, .03), 0 16px 24px rgba(0, 0, 0, .01)",
        mid: "0 0 0 1px rgba(0, 0, 0, .03), 0 1px 3px rgba(0, 0, 0, .05), 0 16px 24px rgba(0, 0, 0, .02)",
        high: "0 0 0 1px rgba(0, 0, 0, .03), 0 1px 3px rgba(0, 0, 0, .05), 0 16px 24px rgba(0, 0, 0, .05)",
        highest: "0 0 0 1px rgba(0, 0, 0, .25), 0 1px 3px rgba(0, 0, 0, .05), 0 16px 24px rgba(0, 0, 0, .05)",
        cart: "0 0 0 1px rgba(0, 0, 0, .05), 0 -1px 3px rgba(0, 0, 0, .05), 0 -16px 24px rgba(0, 0, 0, .05)",
        darkCart: "inset 0 1px 0 rgba(255, 255, 255, .1), 0 -1px 3px rgba(0, 0, 0, .4), 0 -16px 24px rgba(0, 0, 0, .5)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
