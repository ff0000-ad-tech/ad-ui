<a name="UIDiv"></a>

## UIDiv
**Kind**: global class  
**Npmpackage**:   

* [UIDiv](#UIDiv)
    * [new UIDiv()](#new_UIDiv_new)
    * [.parent](#UIDiv.parent) : <code>element</code>
    * [.toString()](#UIDiv.toString)

<a name="new_UIDiv_new"></a>

### new UIDiv()
This is a display object class, which is a DOM element <div>, that internally handles assigning the passed in parameters.<br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
<pre class="sunlight-highlight-javascript">
import { UIDiv } from 'ad-ui'
</pre>
<br><br>
<b>Sample 1:</b><br>
<pre class="sunlight-highlight-javascript">
// bare minimum creation - can be added to anything and named later.
var myBase = new UIDiv()
</pre>
<br><br>
<b>Sample 1:</b><br>
<pre class="sunlight-highlight-javascript">
// simple creation - no style
// Added to a container, such as Main
T.myBase = new UIDiv({
	target : T,
	id : 'my-div'
})
</pre>
<br><br>
<b>Sample 2:</b><br>
<pre class="sunlight-highlight-javascript">
// create with assigned styles
var myBase = new UIDiv({
	target : T,
	id : 'my-div',
	css : {
		x : 36,
		y : 14,
		width : 120,
		height: 140
	}
});
</pre>

<a name="UIDiv.parent"></a>

### UIDiv.parent : <code>element</code>
Getter : Returns the parent, ie the DOM element this <div> is inside of.

**Kind**: static property of [<code>UIDiv</code>](#UIDiv)  
**Example**  
```js
// get
console.log(myImage.source)

// set
myImage.source = 'template_image'
```
<a name="UIDiv.toString"></a>

### UIDiv.toString()
A String to represet the object type.

**Kind**: static method of [<code>UIDiv</code>](#UIDiv)  
**Example**  
```js
myDiv.toString()
```
