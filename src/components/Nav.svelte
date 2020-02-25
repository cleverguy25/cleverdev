<script>
  import Social from "./Social.svelte";

  export let segment;
  export let pages;
</script>

<style>
  header {
    width: 100%;
    height: 3.5rem;
    background-color: var(--header-background-color);
	color: var(--header-color);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  @media (max-width: 26rem) {
    header {
      height: 7rem;
    }
  }

  nav {
    padding-right: 1rem;
    margin-left: 1rem;
  }
  nav a {
    color: var(--header-color);
    padding-right: 1rem;
  }

  nav div {
    display: flex;
    flex-direction: row;
  }
  .selected {
    font-weight: bold;
  }

  .logo-image {
    z-index: 10;
  }

  .logo-image > img {
    width: 4rem;
    height: 4rem;
    border-radius: 0.5rem;
    border: 0.1rem solid var(--header-color);
    display: inline-block;
    margin-left: 1rem;
    margin-top: 0.5rem;
  }

  .title-bar {
    margin-left: 0.5rem;
    margin-top: 0.25rem;
    display: flex;
    flex-flow: row wrap;
	justify-content: space-between;
	width: 100%;
  }

  .site-name {
    margin-left: 0.5rem;
    font-size: 1rem;
    display: block;
  }

  .description {
    margin-left: 1.25rem;
    font-family: var(--monospace-font-family);
    font-size: 0.75rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
</style>

<header>
    <a href="/" class="logo-image">
      <img alt="Cleve Littlefield" src="avatar.jpg" />
    </a>
    <div class="title-bar">
      <div>
        <span class="site-name">
          <strong>clever dev codes</strong>
        </span>
        <p class="show-for-small-up description">
          var blog = [code, nerdery, travel, shenanigans];
        </p>
      </div>
      <div>
        <Social />
        <nav>
          <div>
            {#each pages as page}
              <a class:selected={segment === page.segment} href=".">
                {page.title}
              </a>
            {/each}
            <a rel="prefetch" class:selected={segment === 'blog'} href="blog">
              blog
            </a>
          </div>
        </nav>
      </div>
    </div>
</header>
