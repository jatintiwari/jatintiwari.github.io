<script>
    import { Router, Route, Link } from 'svelte-navigator';
    import Intro from './js/Intro.svelte';
    import VisualRegression from './markdown/visual-regression.md';
</script>

<div id="app">
    <Router>
        <Route path="/">
            <div>
                <Link to="/">Home</Link>
                <Link to="/visual-regression">Visual Regression Tests</Link>
            </div>
            <Intro />
        </Route>

        <Route path="/visual-regression">
            <VisualRegression />
        </Route>
    </Router>
</div>
