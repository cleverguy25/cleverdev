import { getPosts } from './_posts.js';
import { siteUrl } from '../../stores/_config.js';

function toRFC3339(date) {
    
  function pad(n) {
      return n < 10 ? "0" + n : n;
  }

  function timezoneOffset(offset) {
      var sign;
      if (offset === 0) {
          return "Z";
      }
      sign = (offset > 0) ? "-" : "+";
      offset = Math.abs(offset);
      return sign + pad(Math.floor(offset / 60)) + ":" + pad(offset % 60);
  }

  return date.getFullYear() + "-" +
      pad(date.getMonth() + 1) + "-" +
      pad(date.getDate()) + "T" +
      pad(date.getHours()) + ":" +
      pad(date.getMinutes()) + ":" +
      pad(date.getSeconds()) + 
      timezoneOffset(date.getTimezoneOffset());
}

function renderXmlAtomFeed(posts) {
  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">

  <title>Clever Dev Codes</title>
  <link href="${siteUrl}"/>
  <link rel="self" href="${siteUrl}/blog/atom" />
  <updated>${toRFC3339(new Date())}</updated>
  <author>
    <name>Cleve Littlefield</name>
  </author>
  <id>urn:uuid:DBEF5693-FACC-47DB-9063-3AFF0FD30733</id>
  ${posts.map(post => `
  <entry>
    <title>${post.title}</title>
    <link href="${siteUrl}/blog/${post.slug}"/>
    <id>urn:uuid:${post.id}</id>
    <updated>${toRFC3339(new Date(post.publishedDate))}</updated>
    <content type="xhtml">
      <div xmlns="http://www.w3.org/1999/xhtml">
        ${post.html}
      </div>
    </content>
    <summary type="xhtml">
      <div xmlns="http://www.w3.org/1999/xhtml">
        ${post.excerpt}
      </div>
    </summary>
  </entry>`).join('\n')}

</feed>`;
}

export async function get(req, res) {

  res.writeHead(200, {
    'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
    'Content-Type': 'application/atom+xml'
  });

  const posts = await getPosts();
  const feed = renderXmlAtomFeed(posts);
  res.end(feed);

}