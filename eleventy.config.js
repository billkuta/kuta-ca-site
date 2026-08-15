module.exports = function (eleventyConfig) {
  // Human-readable date filter, e.g. {{ date | date }} -> "August 14, 2026"
  eleventyConfig.addFilter("date", function (dateValue) {
    const d = new Date(dateValue);
    return d.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  // Copy the CSS folder straight through to the output site
  eleventyConfig.addPassthroughCopy("src/css");

  // Copy the CNAME file through unchanged (used by GitHub Pages for the
  // custom domain). It has no file extension so it needs an explicit copy.
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // A collection of everything in src/posts/, used to build the post list
  // on the home page and could later power an RSS feed, tag pages, etc.
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
};
