<script>
  import Image from '../js/common/Image.svelte';
  import Quotes from '../js/Quotes.svelte';
  import BlogHeader from './common/blog-header.md';
</script>

<BlogHeader date="15 June 2022" title="Visual diffing for End to End Testing"/>

For end-to-end UI testing there are a few case which can go untested with any amount of automated testing unless they are compared manually every time.

There are many cases where details like

-   Color of text
-   Background elements
-   Placement of element

These a few of many cases in the view port requires manual intervention as they cannot be detected with automated scripts.

Automated scripts can assure existence of element but cannot easily assert elements correct position.

<Image withBorder height="500" desc="Base Image" src="https://user-images.githubusercontent.com/10477804/173744949-8d029afc-c61e-4bcd-8801-c57aab049b8a.png"/>

<Image withBorder height="500" desc="Checkpoint image - taken during test runs" src="https://user-images.githubusercontent.com/10477804/173744940-c93d452b-fcbe-4c57-af35-b0f9f2bb9de3.png"/>

<Image withBorder height="500" desc="Comparison between baseline and checkpoint image" src="https://user-images.githubusercontent.com/10477804/173744923-377e9b21-5849-4a97-bb0d-cfe7efa3d4bc.png"/>

### What is happening here?

-   Baseline image is created once we push a feature/fix to production.
-   Checkpoint image is created a fresh every time we run a test.
-   Diff image is created once a fresh checkpoint is created and compared with existing baseline image.
-   Only If there is a diff, then a new diff image is created.

#### Above baseline image has a few diffs

-   Raise a request tab icon is missing.
-   Right most cross has started appearing in checkpoint image.
-   Filter drop down is missing in upper tab bar.
<!-- <Quotes>
Good testing is difficult. Perfect is unimaginable.
</Quotes> -->

> Good testing is difficult.
> Perfect is unimaginable.

### Agenda

We have clear agenda that we are only asserting UI Application code. That said, it is a black box testing of the UI code based on assumption that if nothing changes in API response our application should render UI as per the expectation. The expectation in our case is set via baseline images.

If there is a change in API response then update the snapshots and baseline screenshots to set new expectation.

### How to write a test suite?

```js
{
  "name": "test name",
  "outputFile": "file name to store the output - checkpoint, diff",
  "url": "url for test page",
  "snapshots": [
    {
      "url": "url of the xhr to intercept",
      "query": "query params(optional)",
      "response": [
        "file name in the snapshots folder to proxy this network request response"
      ] | "fileName"
    }
  ],
  "usesAgent": "(can add) select one from config template",
  "fullPage": "boolean - to take full page screen shot",
  "disableNavigationToBaseURL": "should not navigate back to the previous route - global"
"actions": [
    {
      "type": "on of the keys in the array [click, text].",
      "id": "xPath, id, className",
      "wait": "explicit wait millis",
      "skipTask": "skip the task assigned to actions via runner",
      "disableNavigationToBaseURL": "should not navigate back to the previous route"
    }
  ],
}
```

### How this is done?

-   Using Puppeteer (compatible with other automations as well) a headless browser is spawned.
-   Every request on this page is intercepted.
-   If this request matches any of the listed urls in snapshots array in JSON it served with the custom response.
    -   It waits till the browser finishes its last network call for the page.
-   Then if actions are included in the JSON then it executes.
    -   On completion of each action a checkpoint screenshot image is taken.
    -   If no actions are provided then single checkpoint screenshot will be taken after loading the url.
-   After running all the suites images comparison is done.
    -   Error images are created.
    -   Dashboard data is generated to show the complete test suites results.

### Benefits

-   Helps in
    -   Validating components integration.
    -   Presence of component in the righteous manner.
-   **Cross browser integration can be easily tested**
    -   Chromium, Webkit, Firefox can be easily tested across all the platforms.
-   Puppeteer, Selenium, Playwright can be used for executing JSON test suites.
-   **Can be used by any web app and can also be extended to other teams.**
