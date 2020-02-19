import renderMarkdown from "./_render.js";
import { SquidexClient } from "./_squidex.js";
require("prismjs/components/prism-jsx.min");

let pages;
let lookup;

export async function getPageLookup() {
  if (!lookup) {
    const items = await getPages();
    lookup = new Map();
    items.forEach(item => {
      lookup.set(item.segment, JSON.stringify(item));
    });
  }

  return lookup;
}

export async function getPages() {
  if (pages) {
    return pages;
  }

  var client = new SquidexClient({
    clientId: process.env.SQUIDEX_CLIENT_ID,
    clientSecret: process.env.SQUIDEX_SECRET,
    project: process.env.SQUIDEX_PROJECT
  });

  const items = await client.query("pages");
  pages = items.map(item => {
    const page = item.data;
    const id = item.id;
    const title = page.title;
    const text = page.text;
    const segment = page.segment;
    const description = page.description;
    const keywords = page.keywords;
    const html = renderMarkdown(text);
    const excerpt = renderMarkdown(description);

    return {
      id,
      title,
      segment,
      html,
      excerpt,
      keywords
    };
  });

  return pages;
}
