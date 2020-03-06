import fs from "fs";
import path from "path";
import request from "request";

export const SQUIDEX_BASE_URL = `https://cloud.squidex.io`;
export const SQUIDEX_PREFIX = `https://cloud.squidex.io/api/assets/${process.env.SQUIDEX_PROJECT}`;

export function downloadAsset(assetUrl) {
    const relativePath = getRelativePath(assetUrl);
    const localPath = path.resolve(`./__sapper__/export${relativePath}`);
    fs.mkdirSync(path.dirname(localPath), { recursive: true });
    download(assetUrl, localPath);
    return relativePath;
  }
  
  function getRelativePath(src) {
    let queryPartIndex = src.indexOf('?');
    if (queryPartIndex < 0) {
        queryPartIndex = src.length;
    }
    return '/assets' + src.slice(0, queryPartIndex).replace(SQUIDEX_PREFIX, "");
  }

  function download(uri, filename){
    request(uri).pipe(fs.createWriteStream(filename));
  };