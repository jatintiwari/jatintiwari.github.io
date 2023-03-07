<script>
    const socialMedia = {
        LINKEDIN: 'https://www.linkedin.com/in/jatin-tiwari-3783aa50/',
        GITHUB: 'https://www.github.com/jatintiwari',
        EMAIL: 'mailto:mail@jatintiwari.com',
        RESUME: 'https://www.jatintiwari.com/jt',
    };
    const socialMediaKeys = Object.keys(socialMedia);
    $: mount = false;
    setTimeout(() => {
        mount = true;
    }, 100);
</script>

{#if mount}
    <div class="section sticky-bottom border-dark">
        <div class="container contacts bg-blue">
            {#each socialMediaKeys as key}
                <span>
                    <a class="cta" target="_blank" href={socialMedia[key]}>{key}</a>
                </span>
            {/each}
        </div>
    </div>
{/if}

<style>
    .sticky-bottom {
        position: sticky;
        bottom: 0px;
        border-top: 1px solid;
    }
    .contacts {
        display: flex;
        justify-content: space-between;
    }

    @media (max-width: 767px) {
        .contacts {
            font-size: 0.8em;
        }
    }
</style>
