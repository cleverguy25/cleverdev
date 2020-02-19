import { getPosts } from "./blog/_posts.js";
import { siteUrl } from "../stores/_config.js";

function renderSitemapXml(slugs) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${slugs
  .map(
    slug => `
  <url>
    <loc>${siteUrl}/${slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
`
  )
  .join("\n")}
</urlset>`;
}

export async function get(req, res) {
  res.writeHead(200, {
    "Cache-Control": `public, max-age=0, must-revalidate`,
    "Content-Type": "application/xml"
  });

  const posts = await getPosts();
  const slugs = posts.map(post => `blog/${post.slug}`);
  const feed = renderSitemapXml([...slugs, "", "/blog"]);
  res.end(feed);
}
