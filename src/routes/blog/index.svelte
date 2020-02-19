<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}

	let year = (new Date()).getFullYear();
</script>

<script>
	import PostHeader from "../../components/PostHeader.svelte";
	import TagCloud from "../../components/TagCloud.svelte";
	import Recent from "../../components/Recent.svelte";
	import Metadata from "../../components/Metadata.svelte";
	import { siteUrl } from "../../stores/_config.js";
	export let posts;
</script>

<svelte:head>
	<title>Clever Dev Codes Blog</title>

	<Metadata description="Cleve's code and nerd blog" keywords="code nerdery geek travel shenanigans" url="{siteUrl}/blog" title="Clever Dev Codes" />
</svelte:head>

<div class="space-between-row-layout">
	<section class="posts" itemscope itemtype="http://schema.org/Blog">
		<div class="hidden" itemprop="about">A blog about code, travel, geek stuff.</div>
		<div class="hidden" itemprop="author">Cleve Littlefield</div>
		<div class="hidden" itemprop="copyrightYear">{year}</div>
		<div class="hidden" itemprop="copyrightHolder">Cleve Littlefield</div>
		<div itemprop="blogPosts">
		{#each posts as post}
			<article class="post" itemscope itemtype="http://schema.org/BlogPosting" itemprop="blogPost">
				<PostHeader post={post} />
				<section class="post-abstract" itemprop="abstract">{@html post.excerpt}</section>
			</article>
		{/each}
		</div>
	</section>
	<aside>
		<TagCloud posts={posts} />
		<Recent posts={posts} />
	</aside>
</div>