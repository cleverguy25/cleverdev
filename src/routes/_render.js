import prism from "prismjs";
import marked from "marked";
import cheerio from 'cheerio';
import { downloadAsset, SQUIDEX_PREFIX } from "./_downloadAsset";
require('prismjs/components/prism-jsx.min');

const renderer = new marked.Renderer();
renderer.code = (code, language) => {
  const parser = prism.languages[language] || prism.languages.html;
  const highlighted = prism.highlight(code, parser, language)
  return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`
}

export default function renderMarkdown(text) {
    const html = marked(text, { renderer: renderer }).replace(/^\t{3}/gm, '');
    if (process.env.npm_lifecycle_script.startsWith('sapper export') === false) {
      return html;
    }

    const dom = cheerio.load(html);
    const images = dom("img");

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const src = img.attribs.src;
      const width = img.attribs.width;
      const height = img.attribs.height;
      let imageSpec = getImageSpec(width, height);
      const assetUrl = `${src}${imageSpec}`;
      const index = src.indexOf(SQUIDEX_PREFIX);
      
      if (src && index > -1 ) {
        const relativePath = downloadAsset(assetUrl);
        img.attribs.src = relativePath;
      }
    }

    return dom.html();
}

function getImageSpec(width, height) {
  let imageSpec = "";
  if (width) {
    imageSpec += `&width=${width}`;
  }
  if (height) {
    imageSpec += `&height=${height}`;
  }
  return imageSpec;
}