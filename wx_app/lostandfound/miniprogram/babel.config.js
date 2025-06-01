module.exports = {
  plugins: [
    ["@babel/plugin-transform-runtime", {
      "helpers": true,
      "regenerator": true,
      "corejs": false
    }]
  ]
};