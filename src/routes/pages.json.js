
import { getPages } from "./_pages.js";

export async function get(request, response) {
  
  const pages = await getPages();
  response.writeHead(200, {
    'Content-Type': 'application/json'
  });
  response.end(JSON.stringify(pages));
}

