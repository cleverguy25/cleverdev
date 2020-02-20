<script context="module">
	export async function preload({ params, query }) {
		
		const pages = await this.fetch(`pages.json`).then(r => r.json());
		return { pages };
	}
</script>

<script>
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';

	export let pages;
	export let segment;
</script>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 99vh;
	}
	main {
		max-width: 75rem;
		background-color: var(--background-color);
		color: var(--primary-color);
		padding: 1.5rem;
		margin: 1.75rem auto;
		box-sizing: border-box;
		flex-grow: 1;
		border: 2px solid var(--primary-color);
		margin-bottom: 1rem;
	}

	@media (max-width: 640px) {
		main {
			border: 0px;
			padding: .5rem;
		}
	}
</style>

<svelte:head>
	<link id="RSS" title="Clever Dev Codes" type="application/rss+xml" rel="alternate prefetch" href="/blog/rss">
	<link id="ATOM" title="Clever Dev Codes" type="application/atom+xml" rel="alternate prefetch" href="/blog/atom">
</svelte:head>
<div class="layout">
	<Nav {segment} {pages}/>

	<main>
		<slot></slot>
	</main>
	
	<Footer />
</div>