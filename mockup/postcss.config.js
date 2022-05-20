module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss/nesting")(require("postcss-nested")),
    require(`tailwindcss`),
    require("postcss-custom-properties"),
    require("postcss-preset-env"),
    require(`autoprefixer`)({ grid: true }),
    ...(process.env.NODE_ENV === "production"
      ? [
        require(`cssnano`)({
          preset: "default"
        })
      ]
      : [])
  ]
};
