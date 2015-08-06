# rector

a code sample helper for style guides and other types of technical
documentation.

just wrap your samples in the `<rector-markup>` tag and it will render and
display the code for you. the following code snipped will generate the image
below

```html
<h1>avatar</h1>
<rector-markup>
    <avatar name="Albert Einstein" title="Theoretical Physicist" image="https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg"></avatar>

    <avatar name="Albert Einstein" image="https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg"></avatar>

    <avatar name="Albert Einstein"></avatar>

    <avatar title="Theoretical Physicist"></avatar>
</rector-markup>
```

![Sample](http://i.imgur.com/5YbfWfH.png)
