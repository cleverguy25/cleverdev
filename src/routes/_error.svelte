<script>
				
	const exclamations = ["Great Odin's Raven!", "By the beard of Zeus, ouch!", 
            "Knights of Columbus, that hurt!", "Son of a bee-sting!", 
			"Oh Shit---ake Mushrooms"];
	
	const errorMessages = [
		"Uhh, something went very wrong, our bad.  One hundred little bugs in the code, One hundred little bugs.  Fix a bug, check the fix in, One hundred little bugs in the code.", 
        "Uhh, something went very wrong, sorry about that.  You know what they say, Programming is 10% science, 20% ingenuity, and 70% getting the ingenuity to work with the science."]
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
	function getRandomElement(inputArray) {
		const element = Math.floor((Math.random() * inputArray.length));
		return inputArray[element];
	}

	let title;
	if (status === 404) {
		title = "Page not found."
	} else {
		title = "Oops, something went wrong."
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>{status}</h1>
<figure>
<img alt='It is a feature not a bug...' src='feature.jpg'>
</figure>
<h3>{getRandomElement(exclamations)}</h3>
<h4>Something went wrong.</h4>
<p>{getRandomElement(errorMessages)}</p>

<p>{error.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}

