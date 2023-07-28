<script>
  import BlogHeader from './common/blog-header.md';
  import Image from './../js/common/Image.svelte';
  
  const resume = `résumé`;
</script>

<BlogHeader date="5 July 2022" title="Build web enabled CV"/>

I have been constantly applying for jobs since 2014. And every time I had to update my {resume} I had to locate the source file. Most of the times, I might loose it due to saving it at different locations or I might not be able to find the latest version.

In short updating a {resume} was a tedious task for me. And It is!

> Most of the times we have to edit our {resume} in a very short period.

For all the impromptu and most awaited opportunities, I wanted to make it easy to keep my {resume} updated and make it <span class="mark">accessible to me <b>all the time</b></span>. So, I thought of hosting it on my website.

My {resume} is available [here](https://www.jatintiwari.com/jt). The web version gives me a lot of flexibility.

-   <b>Edit</b> it on the fly.
-   <b>Pass</b> it to anyone as a link.
-   <b>Print it anywhere</b> without having to access your drive on an insecure network.
-   I <b>don't have to remember</b> to update the right file which has all the latest changes.
-   I can have a <b>separate layout</b> for printing and viewing.

### Inspiration

[Mac App Pages](https://www.apple.com/in/pages/) has been my source of my inspiration. I have used it extensively to create my {resume}. It seamlessly adds the content to the document. We can use the GUI for the placement of the content (Everything including text is a movable object. It hold all the content in form a `box-layout` and these boxes can be moved with a drag and drop). It was less explored but far better than its other alternatives.

### Two column layout for Screen Media

I am using `flex-box` as a basic layout of my resume. The left column has my experience and right column has skills. As my experience is much more verbose than the skills 😜, I have divided the page layout in 7:3 widths.

<div align="center">
  <Image desc="Web view" width="70" alt="Web View" src="https://user-images.githubusercontent.com/10477804/177324990-e6feacf4-54c2-4c00-9b1c-a1d6bf79e76d.png"/>
</div>

### Two column split view layout for Print Media

`page - 1` Left and right containers with 7:3 widths.

`page - 2` To keep my {resume} relevant and precise I wanted to maximize the use of the page 2.
The print view has equally-spaced two columns filled with my experience information.

To achieve this I had to break the content into two different pages. Age old strategy - Enclose the content into two different containers.

`jt.html`

```html
<div class="container">
    <div class="left-container">...</div>
    <div class="right-container">...</div>
</div>
<div class="container pagebreak page-two">
    <div class="half-width-container">...</div>
    <div class="half-width-container">...</div>
</div>
```

`index.css`

```css
.pagebreak {
    clear: both;
    page-break-before: always;
}
```

<div align="center">
  <Image desc="Page 1 and Page 2 of print view" width="70" alt="Print View" src="https://user-images.githubusercontent.com/10477804/177327690-f6428b71-dfbe-4068-8885-16519ea01657.png"/>
</div>

#### Export as PDF

I have added a button to trigger the print view of the html page. This method initiates the browser's interface for the print view.

```html
<button id="print" onclick="window.print()">Print</button>
```

### How and Where to host this app

Github pages are a very easy and free options. [Follow these steps](https://pages.github.com/) to host a website. I am using using Github for hosting my [domain's](https://www.jatintiwari.com) landing page and [Firebase](https://firebase.google.com/products/hosting) for hosting this blog.

---

#### Resources

-   CSS [page-break-before](https://developer.mozilla.org/en-US/docs/Web/CSS/page-break-before) property
