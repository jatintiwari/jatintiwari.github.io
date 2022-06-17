<script>
    export let desc;
</script>

<div class="code-container">
    {#if desc} <p class="desc">{desc}</p> {/if}
    <slot />
</div>

<style lang="scss">
    @import '../css/index.scss';

    .image-container {
        margin-bottom: 1em;
        padding: 0.5em 0.25em 0;
    }
</style>
