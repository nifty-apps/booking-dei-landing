const path = require("path");
module.exports = {
  i18n: {
    defaultLocale: "en",
    // locales: ['en', 'de', 'id', 'ar', 'pt', 'zh'],
    locales: ["en", "bn"],
    fallbackLng: "en",
  },
  ssg: true, // Set to true for Static Site Generation (SSG)
  reloadOnPrerender: true, // Set to true if you want to refetch data on each page prerender
  localePath: path.resolve("./public/locales"),
};
