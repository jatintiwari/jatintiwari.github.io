<script>
  import BlogHeader from './common/blog-header.md';
  import Image from './../js/common/Image.svelte';
</script>

<svelte:head>

<title>Svelte Code splitting</title>
<date>27 June 2022</date>
</svelte:head>

<BlogHeader date="27 June 2022" title="Code splitting With Svelte"/>

Svelte is gaining a lot of traction these days. It is easy to implement and learn. The main reason i have started using Svelte is that it is <b>_not opinionated_</b>.
Mostly, I just have to write what actually is required - HTML, CSS and JS and do not worry about the optimizations.

But, as the application grows the end users of any application has to pay the price. The hidden cost of downloading mega chunks of JS and CSS resources. We can optimize this via using extra efficient systems and techniques in place e.g. `CDN, Browser Cache, Uglify/Minify` are a few basic optimizations techniques. As you see, It does not reduce the actual amount of code that is being parsed on the browser.

<center>

| Type | Transferred | Actual Size |
| :--: | :---------: | :---------: |
|  js  |  39.59 KB   |  100.63KB   |

</center>

The _Actual Size_ is what the browser has to parse. This in itself is a bottle neck in old/low-end devices. <b>JS is everywhere</b> now and We must optimize the experience for everyone.

> We can squeeze the air out of a pillow with a vacuum device. Even after that, there is still a piece of mass that requires space in our storage.

We can further reduce the amount of code with help of dynamic imports and keep our application as lean as possible.
The idea behind the code splitting is simple - Load only the part of application code which is required to render the particular route the user is visiting.

The code splitting of the <b>route resources</b> can further be bifurcated into above the fold and below the fold content (there is no straight way of doing it).

### <div align="center">Enough talking, Here is the code!</div>

I have a route based application, where each route loads an async `Component`.

```js
const routes = [
    {
        path: '/svelte-code-splitting',
        name: 'Svelte Code splitting',
        component: () => import('./markdown/code-splitting-svelte.md'),
    },
];
```

To load the component async and do something while it loads, I did write a util function which handles the loading and returns the default export of the `es` module.

```js
const getComponent = async (module) => {
    const component = (await module).default;
    return component;
};
```

The above function is called for each route.

```svelte
{#each articles as article}
  <Route path={article.path}>
      {#await getComponent(article.component()) then Component}
          <Component />
      {/await}
  </Route>
{/each}
```

_Notice the `artilce.component` is a function which is evoked when the route is matched._

This is the bare minimum code which is required for creating dynamic chunks during the build processes.

#### Other changes

-   `rollup.config.js`

    ```js
      output: {
        format: 'es',
        name: 'thoughts',
        dir: 'thoughts/dist/js',
      }
    ```

    `format` for dynamic chunks is _"es"_ instead of _iife_. A directory path to save the chunks is provided as `dir`.

-   `index.html`

```html
<script src="/dist/js/thoughts.js" type="module"></script>
```

The main chunk has to added as _type="module"_

### Final result

Chunks are create with `chunkName-[hash].js`

![chunks](https://user-images.githubusercontent.com/10477804/175859365-085a3232-d7ed-4b6c-ad97-1bc9f58d9cc6.png)

This can be configured with `chunkFileNames` property in `rollup.config.js`

```js
chunkFileNames: (chunkInfo) => {
  return `${chunkInfo.name}.js`;
},
```

#### Network requests

Inside the `index.html` we need to add only the the main bundle i.e. `thought.js` in our case. It has all the information of the chunks that has been created. It loads them in sync to boot the application.

<Image src="https://user-images.githubusercontent.com/10477804/175859805-b4b911cd-3152-4bfb-aeb1-ad22820dc0cc.png"/>

---

#### Useful resources

-   [Github Repo by Rich Harris](https://github.com/Rich-Harris/rollup-svelte-code-splitting)
-   [ES6 modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/)
