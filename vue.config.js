module.exports = {
  devServer: {
    proxy: "http://123.56.124.33:5000",
  },
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
};
