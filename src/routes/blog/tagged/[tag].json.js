
import { getPosts } from "../_posts.js";

export async function get(request, response) {
  const { tag } = request.params;
  const results = [];
  const posts = await getPosts();
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    if (post.tags.includes(tag)) {
      results.push(post);
    }
  }
  response.writeHead(200, {
    'Content-Type': 'application/json'
  });
  response.end(JSON.stringify(results));
}

