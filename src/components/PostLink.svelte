<script>
    import format from "date-fns/format";
    import PublishedDate from "./PublishedDate.svelte";
    export let post;
</script>

<h4 class="post-title" itemprop="headline">
    <a rel='prefetch' href='blog/{post.slug}' itemprop="url">{post.title}</a>
</h4>
<div class="post-metadata" role="contentinfo">
    <PublishedDate date={post.publishedDate} />
</div>