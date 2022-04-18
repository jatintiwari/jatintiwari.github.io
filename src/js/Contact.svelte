<script>
    const socialMedia = {
        LINKEDIN: "https://www.linkedin.com/in/jatin-tiwari-3783aa50",
        GITHUB: "https://www.github.com/jatintiwari",
        EMAIL: "mailto:mail@jatintiwari.com",
        RESUME: "https://www.jatintiwari.com/knowmore",
    };
    const socialMediaKeys = Object.keys(socialMedia);
</script>

<div class="section">
    <div class="container text-center"><p>I will be happy to connect for new opportunities or consultation✌🏽</p></div>
    <div class="container contacts">
        {#each socialMediaKeys as key}
            <span>
                <a class="cta" target="_blank" href={socialMedia[key]}>{key}</a>
            </span>
        {/each}
    </div>
</div>

<style>
    .contacts {
        display: flex;
        justify-content: space-between
    }
</style>
