<script>
    import Theme from './Theme.svelte';
    import { Link } from 'svelte-navigator';
    // const location = useLocation();
</script>

<div class="header">
    <h2>
        <Link to="/">Thoughts</Link>
    </h2>
    <Theme />
</div>

<style lang="scss">
    .header {
        position: relative;
        display: block;
    }
</style>
