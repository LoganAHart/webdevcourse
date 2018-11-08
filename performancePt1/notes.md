# Performance Notes Part 1

## Minimize Files

Text:
Often part of the build process (e.g. with webpack)
Minimize Text (e.g. Uglify JS)

Images:
  JPG:
    Tendency towards larger file size. Often used for images/photos with lots of colors, downside - can't be made transparent.
  GIF:
    Colors are often limited, reduced color leads to smaller file sizes.
  PNG:
    Limited colors, often used for logos, transparency can be added.
  SVG:
    Vector graphics, rather simplistic with minimal colors. Can be expanded/scaled without losing resolution. Extremely small size.

- Additional image details:
- transparency: use PNG
- animations: use GIF
- colorful images: use JPG
- simple icons, logos, and illustrations: use SVGs
- Reduce PNG with [tiny PNG](https://tinypng.com/)
- Reduce JPG with [JPEG-optimizer](http://jpeg-optimizer.com/)
- Try to choose simple illustrations over highly detailed photographs
- Always lower JPEG image quality (30-60%)
- Resize image based on size it will be displayed
- Display different sized images for different backgrounds.
- Use CDNs like imigx
- Remove image metadata [VerExif](https://www.verexif.com/en/)

Newer files formats with enhanced compression exist, but browser support is not completely there yet.

Media Queries: resize images based on the size it will be displayed

```css
@media screen and (min-width: 900px) {
  body {
    background: url(./large-background.jpg) no-repeat center center fixed;
    background-size: cover;
  }
}
```

## Critical Render Path

                  | (DOM content loaded)                  | (load event)
                  |                                       |
DOM --> CSSOM --> 5) Render Tree --> 6) Layout --> 7) Paint
1) HTML        __ 4) run JS                               | 8) JS
  \           |
   2) CSS --> 3) JS

(#8 --> js interaction with DOM triggers re-draw, cycle through render tree, layout and paint again)

HTML markup is transformed into a Document Object Model (DOM); CSS markup is transformed into a CSS Object Model (CSSOM).

CSS Object Model (CSSOM) The CSS Object Model is a set of APIs allowing the manipulation of CSS from JavaScript. It is much like the DOM, but for the CSS rather than the HTML. It allows users to read and modify CSS style dynamically.

-------------------------------

1. Parsing HTML:

Note - css and javascript files take priority over images

Example Optimizations:

a) Load style tag in the head

b) Load script right before the closing body tag

- Why?
- Javascript requires html and css parsing to finish (step 4), by loading the css before the JS, we give css ample time to create the CSSOM.
- Example: if Javascript files are put in the head tag, the scripts can delay rendering of css/html (unless something like defer is used).

-------------------------------

2. CSS:

Note - css is render blocking.

Example Optimizations:

a) Only load whatever is needed.

b) Above the Fold Loading:

Prioritize the information the user initial sees when the page is loaded.

```js
const loadStyleSheet = (src) => {
  if (document.createStylesheet) {
    document.createStylesheet(src);
  } else {
    const stylesheet = document.createElement('link');
    const head = document.querySelector('head');
    stylesheet.href = src;
    stylesheet.type = 'text/css';
    stylesheet.rel = 'stylesheet';
    head.appendChild(stylesheet);
  }
}
window.onload = () => {
  loadStyleSheet('./belowTheFold.css')
}
```

c) Media Attributes

```html
<link rel="stylesheet" href="./style.css" media="all">
<link rel="stylesheet" href="./style2.css" media="only screen and (min-width: 500px)">
```

d) Less Specificity

-------------------------------

3. JavaScript

a) Load scripts asynchronously & defer loading of scripts

```html
  <script></script>
  /*
    - should be used for critical app scripts
  */
  <script async></script>
  /*
    - downloads js on another thread
    - potential downside, difficult to predict when the js will finish loading
    - could be a problem if we need access to some of the DOM elements in the js.
    use case: should be used when the js does not interact with the DOM/is not essential to the user experience.
  */
  <script defer></script>
  /*
    - waits to execute until after html has been parsed.
    - will execute in order of appearance.
    use case: great candidate for scripts that will interact with the render tree, but do not interact with the "above the fold" content.
  */
```

b) Minimize DOM manipulation

c) Avoid long running Javascript
