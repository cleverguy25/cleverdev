<script context="module">
	export async function preload({ params, query }) {
		const posts = await this.fetch(`blog/tagged/${params.tag}.json`).then(r => r.json());
		const allPosts = await this.fetch(`blog.json`).then(r => r.json());
		return { tag: params.tag, posts, allPosts };
	}
</script>

<script>
	import PostHeader from "../../../components/PostHeader.svelte";
	import TagCloud from "../../../components/TagCloud.svelte";
	import Recent from "../../../components/Recent.svelte";
	import { siteUrl  } from "../../../stores/_config.js";
	export let tag;
	export let posts;
	export let allPosts;
	const title = `Posts tagged with ${tag}`;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="space-between-row-layout">
	<div class="posts">
		{#each posts as post}
			<article class="post">
				<PostHeader post={post} />
				<section class="post-abstract" itemprop="abstract">{@html post.excerpt}</section>
			</article>
		{/each}
	</div>
	<aside>
		<TagCloud posts={allPosts} />
		<Recent posts={allPosts} />
	</aside>
</div>