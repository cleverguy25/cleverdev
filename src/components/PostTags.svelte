<script>
    export let tags;
</script>

{#each tags as tag}
    <a href="/blog/tagged/{tag}" rel="tag" itemprop="keywords url">{tag}</a>
{/each}