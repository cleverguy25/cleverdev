<script>
    import PostLink from "./PostLink.svelte";
    export let posts;
    const filteredPosts = posts.slice(0, 3);
</script>

<div>
    <h4>Recent Posts</h4>
    <div>
    {#each filteredPosts as post}
        <PostLink post={post} />
    {/each}
    </div>
</div>
    