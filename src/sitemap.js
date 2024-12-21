import { createSitemap, SitemapStream, streamToPromise } from "sitemap";
const { Readable } = require("stream");
const hostname = "https://allospace.co";

const urls = [
  { url: "/", changefreq: "daily", priority: 1 },
  { url: "/register", changefreq: "monthly", priority: 0.8 },
  { url: "/login", changefreq: "monthly", priority: 0.8 },
  { url: "/offices", changefreq: "monthly", priority: 0.8 },
  { url: "/conference-rooms", changefreq: "monthly", priority: 0.8 },
  { url: "/meeting-rooms", changefreq: "monthly", priority: 0.8 },
];

const stream = new SitemapStream({
  hostname: hostname,
  lastmodDateOnly: false,
  xmlns: {
    news: false,
    xhtml: true,
    image: true,
    video: true,
    custom: [
      'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"',
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    ],
  },
});
return streamToPromise(Readable.from(urls).pipe(stream)).then((data) =>
  data.toString()
);
