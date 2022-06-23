<script>
    import { Router, Route, Link } from 'svelte-navigator';

    import Intro from './js/Intro.svelte';
    import Footer from './js/footer.svelte';
    import Header from './js/Header.svelte';

    import VisualRegression from './markdown/visual-regression.md';
    import RoundedImages from './markdown/rounded-images.md';

    const routes = {
        June: [
            {
                path: '/rounded-images',
                name: 'Crop edges to create a round image',
                component: RoundedImages,
            },
            {
                path: '/visual-regression',
                name: 'Visual Regression',
                component: VisualRegression,
            },
        ],
    };
    const months = Object.entries(routes);
</script>

<Router>
    <Header />
    <div id="app">
        <div class="container routes">
            <Route path="/">
                <Intro />
                {#each months as [month, articles]}
                    <p><b>{month}</b></p>
                    {#each articles as article}
                        <Link class="route" to={article.path}>{article.name}</Link>
                    {/each}
                {/each}
            </Route>
        </div>
        <div class="container">
            {#each months as [_, articles]}
                {#each articles as article}
                    <Route path={article.path} component={article.component} />
                {/each}
            {/each}
        </div>
        <Footer />
    </div>
</Router>
