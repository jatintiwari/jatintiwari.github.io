<script>
    import { onMount } from 'svelte';

    const DARK = 'dark';
    const LIGHT = 'light';
    $: isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    onMount(() => {
        let mode = localStorage.getItem('mode');
        if (!mode) {
            mode = isDarkMode ? DARK : LIGHT;
        }
        document.documentElement.classList.add(mode);
        localStorage.setItem('mode', mode);
    });

    const handleThemeChange = () => {
        const mode = localStorage.getItem('mode');
        const newMode = mode === DARK ? LIGHT : DARK;
        isDarkMode = newMode === DARK ? true : false;
        document.documentElement.className = newMode;
        localStorage.setItem('mode', newMode);
    };
</script>

<div class="theme-container">
    <span class="theme-button sun" on:click={handleThemeChange}> ☀️ </span>
    <span class="theme-button moon" on:click={handleThemeChange}> 🌚 </span>
</div>

<style lang="scss">
    .theme-container {
        position: absolute;
        right: 5%;

        .theme-button {
            font-size: 32px;
            cursor: pointer;
            user-select: none;
            transition: 0.1s linear visibility;
            position: absolute;
        }
    }
    @media (max-width: 767px) {
        .theme-container {
            visibility: hidden;
        }
    }
</style>
