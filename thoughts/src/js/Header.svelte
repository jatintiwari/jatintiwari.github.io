<script>
    import Theme from './Theme.svelte';
    import Center from './../js/common/Center.svelte';
    import { Link } from 'svelte-navigator';
    // const location = useLocation();
</script>

<Center>
    <div class="container">
        <div class="header space-between">
            <Link class="heading" to="/"><h2>Thoughts</h2></Link>
            <Theme />
        </div>
    </div>
</Center>

<style lang="scss">
    .header {
        &.space-between {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
