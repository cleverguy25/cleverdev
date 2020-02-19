<script>
    import format from "date-fns/format";
    import PostTags from "./PostTags.svelte"
    import PublishedDate from "./PublishedDate.svelte";
    export let post;
    const duration = post.readingDuration.time / 60000;
    const publishedDate = format(post.publishedDate, "mm-dd-yyyy");
    const publishedDateDisplay = format(post.publishedDate, "yyyy MMM dd");
</script>

<header>
    <h2 class="post-title" itemprop="headline">
        <a rel='prefetch' href='blog/{post.slug}' itemprop="url">{post.title}</a>
    </h2>
</header>
<div class="post-metadata" role="contentinfo">
    <PublishedDate date={post.publishedDate} />
    <span>
        <span class="post-author" itemscope itemtype="http://schema.org/Person" itemprop="author">by <span itemprop="name">{post.author}</span></span>
        <icon class="typcn typcn-stopwatch"></icon>
        <span class="post-reading-time" itemprop="timeRequired" content="PT{duration}M">{post.readingDuration.text}</span>
    </span>
    <span>
        <PostTags tags={post.tags} />
    </span>
</div>