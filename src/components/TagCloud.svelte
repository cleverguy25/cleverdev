<script>
  export let posts;

  const map = {};
  for (let i = 0; i < posts.length; i++) {
    const tags = posts[i].tags;
    for (let j = 0; j < tags.length; j++) {
      const tag = tags[j];
      if (tag in map) {
        map[tag] += 1;
      } else {
        map[tag] = 1;
      }
    }
  }
  let tagCounts = map;
</script>

<div class="inline-block">
    <h4>Tags</h4>
    <div class="flex-row-wrap">
    {#each Object.entries(tagCounts) as [tag, count]}
      <a href="/blog/tagged/{tag}" rel="tag" itemprop="keywords url">{tag}&nbsp;({count})</a>
    {/each}
    </div>
</div>