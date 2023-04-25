const path = require("path");

module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-portfolio-minimal",
      options: {
        siteUrl: "https://nawdb.github.io/",  // Used for sitemap generation
        manifestSettings: {
          favicon: "./content/images/nba-all-world-logo.png",  // Path is relative to the root
          siteName: "NAW Database",  // Used in manifest.json
          shortName: "NAWDB",  // Used in manifest.json
          startUrl: "/",  // Used in manifest.json
          backgroundColor: "#FFFFFF",  // Used in manifest.json
          themeColor: "#000000",  // Used in manifest.json
          display: "minimal-ui"  // Used in manifest.json
        },
        contentDirectory: "./content",
        blogSettings: {
          path: "/guides",  // Defines the slug for the blog listing page
          usePathPrefixForArticles: false  // Default true (i.e. path will be /blog/first-article)
        }
      }
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "G-0ZE4TQH7H3",
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
        enableWebVitalsTracking: true
      }
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        resolveModules: [path.join(__dirname, "content")]
      }
    },
    "gatsby-transformer-csv"
  ]
};
