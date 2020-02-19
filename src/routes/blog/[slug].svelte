<script context="module">
	export async function preload({ params, query }) {
		
		const post = await this.fetch(`blog/${params.slug}.json`).then(r => r.json());
		const allPosts = await this.fetch(`blog.json`).then(r => r.json());
		return { post, allPosts };
	}
</script>

<script>
	import PostHeader from "../../components/PostHeader.svelte";
	import TagCloud from "../../components/TagCloud.svelte";
	import Recent from "../../components/Recent.svelte";
	import Metadata from "../../components/Metadata.svelte";
	import { siteUrl  } from "../../stores/_config.js";

	export let post;
	export let allPosts;
	const url = `${siteUrl}/blog/${post.slug}`;
</script>


<svelte:head>
	<title>{post.title}</title>
	<link rel="canonical" href="{url}" />

	<Metadata url={url} title={post.title} description={post.description} image={post.thumb} keywords={post.tags.join(' ')} />
</svelte:head>

<div class="space-between-row-layout">
	<article class='posts'>
		<PostHeader post={post} />
		<section class="post-content" itemprop="articleBody">{@html post.html}</section>
	</article>
	<aside>
		<TagCloud posts={allPosts} />
		
		<Recent posts={allPosts} />
	</aside>
</div>
