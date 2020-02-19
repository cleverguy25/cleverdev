import renderMarkdown from "../_render.js";
import readingTime from "reading-time";
import { SquidexClient } from "../_squidex.js";

let posts;
let lookup;

export async function getPostLookup() {
  if (!lookup) {
    const items = await getPosts();
    lookup = new Map();
    items.forEach(item => {
      lookup.set(item.slug, JSON.stringify(item));
    });
  }

  return lookup;
}

export async function getPosts() {
  if (posts) {
    return posts;
  }
  var client = new SquidexClient({
    clientId: process.env.SQUIDEX_CLIENT_ID,
    clientSecret: process.env.SQUIDEX_SECRET,
    project: process.env.SQUIDEX_PROJECT
  });

  const items = await client.query("posts");
  posts = items.map(item => {
    const post = item.data;
    const id = item.id;
    const title = post.title;
    const slug = post.slug;
    const text = post.text;
    const description = post.description;
    const tags = post.tags;
    const author = post.author;
    const publishedDate = Date.parse(post.publishedDate);
    const html = renderMarkdown(text);
    const excerpt = renderMarkdown(description);
    const readingDuration = readingTime(text);

    return {
      id,
      title,
      slug,
      html,
      excerpt,
      publishedDate,
      readingDuration,
      tags,
      author
    };
  });

  posts.sort((a, b) => {
    const dateA = new Date(a.publishedDate);
    const dateB = new Date(b.publishedDate);

    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  });

  return posts;
}
