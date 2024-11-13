// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-transform-private-methods', {loose: true}],
    ['@babel/plugin-transform-private-property-in-object', {loose: true}],
    ['@babel/plugin-transform-class-properties', {loose: true}],
  ],
};



// module.exports = {
//   presets: [
//     'module:metro-react-native-babel-preset',
//     '@babel/preset-env',
//     '@babel/preset-react',
//   ],
//   plugins: [
//     // Tambahkan plugin lain jika diperlukan
//   ],
// };

// module.exports = {
//   presets: [
//     'module:metro-react-native-babel-preset',
//     '@babel/preset-env',
//     '@babel/preset-react',
//   ],
// };
