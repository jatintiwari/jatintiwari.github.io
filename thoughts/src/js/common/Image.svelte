<script>
    import { onMount } from 'svelte';

    export let src,
        inline = false,
        desc,
        rounded = false,
        withBorder = false,
        height = 150,
        width;
    $: imageHeight = height;
    const init = () => {
        const viewPortWidth = document.body.scrollWidth;
        if (viewPortWidth < 400 && height > 400) {
            imageHeight = height * 0.5;
        } else {
            imageHeight = height;
        }
    };
    window.addEventListener('resize', init);
    onMount(init);
</script>

{#if withBorder}
    <div
        class="border-image-container"
        style={`min-height:${imageHeight}px; min-width: ${imageHeight}px; display: ${
            inline ? 'inline-block' : 'block'
        }`}
    >
        {#if desc} <p class="desc">{desc}</p> {/if}
        <img loading="lazy" alt={desc} class="responsive-image" {src} />
    </div>
{/if}

{#if rounded}
    <div class="rounded-image-container" style={`display: ${inline ? 'inline-block' : 'block'}`}>
        <div style={`height:${imageHeight}px; width: ${imageHeight}px;`}>
            <img loading="lazy" alt={desc} class="responsive-image" {src} />
        </div>
    </div>
{/if}

{#if !rounded && !withBorder}
    <figure>
        <div class="image-container" style={`display: ${inline ? 'inline-block' : 'block'}`}>
            <div style={`min-height:${imageHeight}px;`}>
                <img style={width ? `width:${width}%` : ``} loading="lazy" alt={desc} class="responsive-image" {src} />
            </div>
            {#if desc} <figcaption class="desc">{desc}</figcaption> {/if}
        </div>
    </figure>
{/if}

<style lang="scss">
    @import '../../css/index.scss';
    @import '../../css/utils.scss';

    .image-container {
        @extend .br-radius;
        margin-top: 1em;
        .responsive-image {
            @extend .br-radius;
            height: 100%;
            width: 100%;
        }
    }

    .desc {
        font-size: 0.8em;
    }

    .rounded-image-container {
        display: inline-block;
        .responsive-image {
            height: 100%;
            transition: 0.5s height cubic-bezier(0.075, 0.82, 0.165, 1);
        }
    }

    .border-image-container {
        margin-bottom: 1em;
        padding: 0.5em;
        @extend .br-radius;
        @extend .grey-grad;
        @extend .text-center;
        .desc {
            text-align: left;
            margin: 0 !important;
            font-size: 12px;
            padding: 0 0 0.5em 0;
        }
        .responsive-image {
            @extend .box-shadow;
            @extend .br-radius;
            width: 100%;
            height: 100%;
        }
    }
</style>
