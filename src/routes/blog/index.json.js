
import { getPosts } from "./_posts.js";

export async function get(request, response) {
  
  const posts = await getPosts();
  response.writeHead(200, {
    'Content-Type': 'application/json'
  });
  response.end(JSON.stringify(posts));
}

