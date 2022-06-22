<script>
    import Quotes from './Quotes.svelte';
    import Image from './common/Image.svelte';
</script>

<div class="intro-container">
    <Quotes by="Phil Knight">The best way to reinforce your knowledge of subject is to share it.</Quotes>
    <div class="intro">
        <Image
            rounded
            height="150"
            src="https://user-images.githubusercontent.com/10477804/175023783-dfc547fa-24be-4e46-941b-a9822c4f6f5f.png"
        />
        <div class="intro-text-container">
            <div class="intro-text">Hello, I am Jatin</div>
            <p class="intro-text">Software Engineer, Gregarious Personality.</p>
            <p class="intro-text">
                More than 1000 thoughts cross my mind every day, I will be writing about a few which makes me curious.
            </p>
        </div>
    </div>
</div>

<style lang="scss">
    .intro-container {
        margin-bottom: 1em;
        .intro {
            display: flex;
            justify-content: flex-start;
            padding: 0 1em;
            .intro-text-container {
                padding: 1em 0 0 1em;
            }
        }
    }
</style>
