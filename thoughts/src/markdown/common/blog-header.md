<script>
  export let date, title;
</script>

#### {date}

{#if title}

# {title}

{/if}
<slot/>

---
