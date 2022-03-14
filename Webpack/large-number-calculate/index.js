if(process.env.NODE_ENV === 'production'){
  module.exports = require('./dist/large-number-calculate.js')
}else{
  module.exports = require('./dist/large-number-calculate.min.js')
}