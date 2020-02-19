<script>
    import format from "date-fns/format";
    export let date;
    const publishedDate = format(date, "mm-dd-yyyy");
    const publishedDateDisplay = format(date, "yyyy MMM dd");
</script>

<span>
    <icon class="typcn typcn-calendar"></icon>
    <time class="post-published" datetime={publishedDate} itemprop="datePublished">{publishedDateDisplay}</time>
</span>