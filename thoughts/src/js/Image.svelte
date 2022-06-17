<script>
    export let src, desc;
</script>

<div class="image-container">
    {#if desc} <p class="desc">{desc}</p> {/if}
    <img loading=lazy alt={desc} class="responsive-image" {src} />
</div>

<style lang="scss">
    @import '../css/index.scss';
    @import '../css/utils.scss';

    .image-container {
        margin-bottom: 1em;
        padding: 0.5em;
        @extend .br-radius;
        @extend .grey-grad;
        @extend .center;
        .desc {
            text-align: left;
            margin: 0;
            font-size: 12px;
            padding: 0 0 0.5em 0;
        }
        .responsive-image {
            @extend .box-shadow;
            @extend .br-radius;
            width: 100%;
            min-height: 100px;
            max-height: 550px;
        }
    }
</style>
