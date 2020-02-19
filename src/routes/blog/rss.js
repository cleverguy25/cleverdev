import { getPosts } from './_posts.js';
import { siteUrl } from '../../stores/_config.js';

function renderXmlRssFeed(posts) { 
	return `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
	<title>Clever Dev Codes</title>
	<link>${siteUrl}</link>
  <description><![CDATA[>var blog = [code, nerdery, travel, shenanigans];]]></description>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
	<image>
		<url>${siteUrl}/avatar.jpg</url>
		<title>Clever Dev Codes></title>
		<link>${siteUrl}</link>
	</image>
	${posts.map(post => `
		<item>
			<title>${post.title}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="false">${siteUrl}/blog/${post.slug}</guid>
			<description><![CDATA[${post.description}]]></description>
			<pubDate>${new Date(post.publishedDate).toUTCString()}</pubDate>
		</item>
	`).join('\n')}
</channel>
</rss>`;
}

export async function get(req, res) {

  res.writeHead(200, {
    'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
    'Content-Type': 'application/rss+xml'
  });

  const posts = await getPosts();
  const feed = renderXmlRssFeed(posts);
  res.end(feed);

}