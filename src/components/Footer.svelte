<script>
    let year = (new Date()).getFullYear();
</script>
<style>
    footer {
        height: 2rem;
        padding: .5rem;
        min-width: 22rem;
        width: 100%;
        background-color: var(--header-background-color);
        color: var(--header-color);
    }

    footer > a { 
        color: var(--contrast-link-color);
    }
</style>
<footer>
    <span>Copyright © {year} Cleve Littlefield. </span>
    <a href="privacy-policy">Privacy Policy</a>
</footer>