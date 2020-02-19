import prism from "prismjs";
import marked from "marked";
import fs from "fs";
import path from "path";
import request from "request";
import cheerio from 'cheerio';
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
    const prefix = `https://cloud.squidex.io/api/assets/${process.env.SQUIDEX_PROJECT}/`;

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const src = img.attribs.src;
      const width = img.attribs.width;
      const height = img.attribs.height;
      let imageSpec = getImageSpec(width, height);
      const assetUrl = `${src}${imageSpec}`;
      const index = src.indexOf(prefix);
      
      if (src && index > -1 ) {
        const relativePath = getRelativePath(src, prefix);
        const localPath = path.resolve(`./__sapper__/export${relativePath}`);
        fs.mkdirSync(path.dirname(localPath), { recursive: true});
        download(assetUrl, localPath);
        img.attribs.src = relativePath;
      }
    }

    return dom.html();
}

function getRelativePath(src, prefix) {
  const queryPartIndex = src.indexOf('?');
  return '/assets/' + src.slice(0, queryPartIndex).replace(prefix, "");
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

function download(uri, filename){
  request(uri).pipe(fs.createWriteStream(filename));
};