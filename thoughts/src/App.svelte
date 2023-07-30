<script>
    import { Router, Route, Link } from 'svelte-navigator';
    import routes from './routes';

    import Intro from './js/Intro.svelte';
    import Footer from './js/footer.svelte';
    import Header from './js/Header.svelte';

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
                {#each routes as route}
                    <Link class="route" to={route.path}>
                        <span class="list-bullet">{route.date} </span>
                        <span>{route.name}</span>
                    </Link>
                {/each}
            </Route>
        </div>
        <div class="container articles">
            {#each routes as route}
                <Route path={route.path}>
                    {#await getComponent(route.component()) then Component}
                        <Component />
                    {/await}
                </Route>
            {/each}
        </div>
        <Footer />
    </div>
</Router>
