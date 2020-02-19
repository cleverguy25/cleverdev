<script>
import { siteUrl  } from "../stores/_config.js";
export let description;
export let keywords;
export let url;
export let title;
export let image = null;
</script>

<meta name="description" content="{description}" />
<meta name="keywords" content="{keywords}"/>

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
{#if image}
<meta property="og:image" content="{image}">
{:else}
<meta property="og:image" content="{siteUrl}/avatar.jpg">
{/if}

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="{url}">
<meta property="twitter:title" content="{title}">
<meta property="twitter:description" content="{description}">
{#if image}
<meta property="twitter:image" content="{image}">
{:else}
<meta property="twitter:image" content="{siteUrl}/avatar.jpg">
{/if}