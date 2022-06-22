<script>
    export let desc;
</script>

<div class="code-container">
    {#if desc} <p class="desc">{desc}</p> {/if}
    <slot />
</div>
