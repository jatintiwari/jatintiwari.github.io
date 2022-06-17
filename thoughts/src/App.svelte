<script>
    import { Router, Route, Link } from 'svelte-navigator';

    import Intro from './js/Intro.svelte';
    import Footer from './js/footer.svelte';

    import VisualRegression from './markdown/visual-regression.md';

    const routes = {
        June: [
            {
                path: '/visual-regression',
                name: 'Visual Regression',
                component: VisualRegression,
            },
        ],
    };
    const months = Object.entries(routes);
</script>

<div id="app">
    <Router>
        <Route path="/">
            <div class="intro">
                <Intro />
            </div>
            <div class="routes">
                {#each months as [month, articles]}
                    <p><b>{month}</b></p>
                    {#each articles as article}
                        <Link class="route" to={article.path}>{article.name}</Link>
                    {/each}
                {/each}
            </div>
        </Route>
        <div class="articles">
            {#each months as [_, articles]}
                {#each articles as article}
                    <Route path={article.path} component={article.component} />
                {/each}
            {/each}
        </div>
    </Router>
    <Footer />
</div>
