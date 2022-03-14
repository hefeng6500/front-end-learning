module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "semi": ['warn', 'always'],
    "indent": ["error", 2],
    'linebreak-style': ["off", "windows"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "global-require": 0,
    "comma-dangle": ["error", "never"],
  }
};