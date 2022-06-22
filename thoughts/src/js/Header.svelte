<script>
    import Theme from './Theme.svelte';
    import { useLocation } from 'svelte-navigator';
    const location = useLocation();
</script>

{#if $location.pathname !== '/'}
    <div class="header">
        <h2><a href="/">Thoughts</a></h2>
        <Theme />
    </div>
{/if}

<style>
    .header {
        position: relative;
        display: block;
    }
</style>
