<script>
    import { Router, Route, Link } from 'svelte-navigator';

    import Intro from './js/Intro.svelte';
    import Footer from './js/footer.svelte';
    import Header from './js/Header.svelte';

    const routes = {
        June: [
            {
                path: '/rounded-images',
                name: 'Crop edges to create a round image',
                component: () => import('./markdown/rounded-images.md'),
            },
            {
                path: '/visual-regression',
                name: 'Visual Regression',
                component: () => import('./markdown/visual-regression.md'),
            },
        ],
    };
    const months = Object.entries(routes);

    const getComponent = async (module) => {
        const component = (await module).default;
        return component;
    };
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
                    <Route path={article.path}>
                        {#await getComponent(article.component())}
                            Loading Component!!
                        {:then Component}
                            <Component />
                        {/await}
                    </Route>
                {/each}
            {/each}
        </div>
        <Footer />
    </div>
</Router>
