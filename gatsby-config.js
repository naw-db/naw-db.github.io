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
        // googleAnalytics: {
        //     trackingId: "UA-XXXXXX-X",
        //     anonymize: true, // Default true
        //     environments: ["production", "development"]  // Default ["production"]
        // }
      }
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        resolveModules: [path.join(__dirname, "content")]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        // The unique name for each instance
        name: "player_base_stats",
        // Path to the directory
        path: `${__dirname}/content/data/players.csv`
      }
    },
    "gatsby-transformer-csv"
  ]
};
