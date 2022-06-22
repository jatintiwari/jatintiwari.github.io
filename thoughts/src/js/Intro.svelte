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
            src="https://user-images.githubusercontent.com/10477804/175003161-0d5a4926-c371-40d2-aa4e-3d7803108067.png"
        />
        <div class="intro-text">I am writing about the things which makes me curious.</div>
    </div>
</div>

<style lang="scss">
    .intro-container {
        margin-bottom: 1em;
        .intro {
            display: flex;
            justify-content: flex-start;
            padding: 0 1em;
            .intro-text {
                padding: 1em 0 0 1em;
            }
        }
    }
</style>
