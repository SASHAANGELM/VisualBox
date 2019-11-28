const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');
module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    autoprefixer({
      add: true,
      grid: true
    }),
    process.env.NODE_ENV === 'production' ? purgecss({
      content: [
        './src/renderer/*.html',
        './src/renderer/*.vue'
      ],
      extractors: [
        {
          extractor: class TailwindExtractor {
            static extract(content) {
              return content.match(/[A-z0-9-:/]+/g) || [];
            }
          },
          extensions: ['html', 'vue']
        }
      ]
    }) : ''
  ]
};

// module.exports = {
//   plugins: [
//     require("tailwindcss")("./tailwind.config.js"),
//     require("autoprefixer")(),
//   ]
// };