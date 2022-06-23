<script>
    export let by;
</script>

<div class="quote-container">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" class="rotate quotes left">
        <path
            d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"
        />
    </svg><span class="text-center font-xxl text"><slot /></span>
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" class="quotes right">
        <path
            d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"
        />
    </svg>
    {#if by}
        <div class="author-container">
            -
            <span class="author">{by}</span>
        </div>
    {/if}
</div>

<style lang="scss">
    @import './../css/theme.scss';
    .quote-container {
        margin: 2em 0;
        padding: 1em;
        text-align: center;
        position: relative;
        .author-container {
            text-align: right;
            .author {
                font-style: italic;
            }
        }
        .text {
            padding: 0 10px 0 0;
        }
        .quotes {
            position: absolute;
            top: 0.5em;
            &.left {
                left: -0.1em;
            }
            &.right {
                right: -0.1em;
            }
        }
        .rotate {
            transform: rotate(180deg);
        }
    }

    @media (min-width: 120px) and (max-width: 767px) {
        .quote-container {
            margin: 2em -4px;
        }
    }
</style>
