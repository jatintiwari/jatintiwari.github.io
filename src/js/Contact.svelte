<script>
    const socialMedia = {
        LINKEDIN: "https://www.linkedin.com/in/jatin-tiwari-3783aa50",
        GITHUB: "https://www.github.com/jatintiwari",
        EMAIL: "mailto:mail@jatintiwari.com",
        RESUME: "https://www.jatintiwari.com/knowmore",
    };
    const socialMediaKeys = Object.keys(socialMedia);
</script>

<div class="section sticky-bottom">
    <div class="container contacts bg-blue">
        {#each socialMediaKeys as key}
            <span>
                <a class="cta" target="_blank" href={socialMedia[key]}>{key}</a>
            </span>
        {/each}
    </div>
</div>

<style>
    .sticky-bottom {
        position: sticky;
        bottom: 0px;
    }
    .contacts {
        display: flex;
        justify-content: space-between;
    }
</style>
