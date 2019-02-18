const path = require('path');
module.exports = {
  components: 'src/lib/components/**/index.js',
  styleguideDir: './build/docs',
  ignore: [
    'src/lib/components/OptionsList/*.js',
    'src/lib/components/Caret/*.js',
  ],
  require: [
    path.join(__dirname,'build/lib/styles.css')
  ]
}