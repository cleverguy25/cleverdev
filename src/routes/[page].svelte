<script context="module">
	export async function preload({ params, query }) {
		
		const page = await this.fetch(`${params.page}.json`).then(r => r.json());
		const allPosts = await this.fetch(`blog.json`).then(r => r.json());
		return { page, allPosts };
	}
</script>

<script>
	import TagCloud from "../components/TagCloud.svelte";
	import Recent from "../components/Recent.svelte";
	import Metadata from "../components/Metadata.svelte";
	import { siteUrl  } from "../stores/_config.js";

	export let page;
	export let allPosts;
	const url = `${siteUrl}/${page.segment}`;
</script>


<svelte:head>
	<title>{page.title}</title>
	<link rel="canonical" href="{url}" />

	<Metadata url={url} title={page.title} description={page.description} keywords={page.keywords.join(' ')} />
</svelte:head>

<div class="space-between-row-layout">
	<section class="page">{@html page.html}</section>
	<aside>
		<TagCloud posts={allPosts} />
		
		<Recent posts={allPosts} />
	</aside>
</div>
