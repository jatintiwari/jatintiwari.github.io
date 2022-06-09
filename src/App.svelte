<script>
    import Intro from './js/Intro.svelte';
    import Passion from './js/Passion.svelte';
    import Skills from './js/Skills.svelte';
    import Contact from './js/Contact.svelte';
    import Theme from './js/Theme.svelte';
</script>

<main id="app">
    <Theme/>
    <Intro />
    <Skills />
    <Passion />
    <Contact />
</main>

<style lang="scss">
    main {
        padding: 1em;
        margin: 0 auto;
    }
    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
