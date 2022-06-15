<script>
    import { Router, Route, Link } from 'svelte-navigator';

    import Intro from './js/Intro.svelte';
    import Footer from './js/footer.svelte';

    import VisualRegression from './markdown/visual-regression.md';

    const routes = [
        {
            path: '/visual-regression',
            name: 'Visual Regression',
            component: VisualRegression,
        },
    ];
</script>

<div id="app">
    <Router>
        <Route path="/">
            <Intro />
            {#each routes as route}
                <Link class="route" to={route.path}>{route.name}</Link>
            {/each}
            <Footer />
        </Route>
        {#each routes as route}
            <Route path={route.path} component={route.component} />
        {/each}
    </Router>
</div>
