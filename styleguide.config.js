const path = require('path');
module.exports = {
  components: 'src/lib/components/**/index.js',
  styleguideDir: './build/docs',
  require: [
    path.join(__dirname,'build/lib/styles.css')
  ]
}