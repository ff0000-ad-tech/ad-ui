<a name="UIImage"></a>

## UIImage
**Kind**: global class  
**Npmpackage**:   

* [UIImage](#UIImage)
    * [new UIImage()](#new_UIImage_new)
    * [.source](#UIImage.source) : <code>string</code>
    * [.retina](#UIImage.retina) : <code>boolean</code>
    * [.ratio](#UIImage.ratio) : <code>string</code>
    * [.aspectRatio](#UIImage.aspectRatio) : <code>boolean</code>

<a name="new_UIImage_new"></a>

### new UIImage()
This is a display object class, extending [UIComponent](#UIComponent).  It is a DOM element that has default values for the
background image styles. They can still be overwritten by simply changing them with [Styles.setCss](Styles.setCss) or the
native [setCss](#UIComponent.setCss) method directly on the UIImage instance.<br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
<pre class="sunlight-highlight-javascript">
import { UIImage } from 'ad-ui'
</pre>
<br><br>
By default, UIImage has these styles set:<br>
<pre class="sunlight-highlight-javascript">
background-repeat : no-repeat;
background-size : contain;
</pre>
<br><br>
By extending UIComponent this has all of its native properties and methods.  See [UIComponent](#UIComponent) for more info.
<br><br>
<b>Sample 1:</b><br>
<pre class="sunlight-highlight-javascript">
// bare minimum creation - image source is required, but can be added to anything and named later.
var myImage = new UIImage({
	source : 'template_image'
});
</pre>
<br><br>
<b>Sample 2:</b><br>
<pre class="sunlight-highlight-javascript">
// simple creation - no style
// Added to a container, such as Main
T.myImage = new UIImage({
	target : T,
	id : 'my-image',
	source : 'template_image'
});
</pre>
<br><br>
<b>Sample 3:</b><br>
<pre class="sunlight-highlight-javascript">
// simple creation using a double sized source image
var myImage = new UIImage({
	target : T,
	id : 'my-image',
	source : 'template_image',
	retina : true
});
</pre>
<br><br>
<b>Sample 4:</b><br>
<pre class="sunlight-highlight-javascript">
// create with assigned styles
var myImage = new UIImage({
	target : T,
	id : 'my-image',
	source : 'template_image',
	css : {
		x : 36,
		y : 14,
		width : 120,
		height: 140
	}
});
</pre>
<br><br>
<b>Sample 5:</b><br>
<pre class="sunlight-highlight-javascript">
// create with only a known height, but maintain the aspect ratio
var myImage = new UIImage({
	target : T,
	id : 'my-image',
	source : 'template_image',
	css : {
		width : 120
	},
	aspectRatio : true
});
</pre>
<br><br>
<b>Sample 6:</b><br>
<pre class="sunlight-highlight-javascript">
// create and align the image inline
var myImage = new UIImage({
	target : T,
	id : 'my-image',
	source : 'template_image',
	align : {
		x:{
			type : Align.RIGHT,
			offset : -10
		},
		y: {
			type : Align.TOP,
			offset : 10
		}
	},
	aspectRatio : true
});
</pre>

<a name="UIImage.source"></a>

### UIImage.source : <code>string</code>
Getter|Setter : The Image element id, via [ImageManager](ImageManager), can be changed if need be but best to just make a new UIImage if a new source is needed.
	Also, use this if you need to access the image for things like getting the original width or height.

**Kind**: static property of [<code>UIImage</code>](#UIImage)  
**Example**  
```js
// get
console.log(myImage.source)

// set
myImage.source = 'template_image'
```
<a name="UIImage.retina"></a>

### UIImage.retina : <code>boolean</code>
Getter|Setter : A Boolean to determine if the image source is double the size of the desired width & height. This is only relevant
	if when creating a new UIImage, you do not proved a width or height value.  If you do, the UIImage will simply be
	the size provided.

**Kind**: static property of [<code>UIImage</code>](#UIImage)  
**Example**  
```js
// get
console.log(myImage.retina)

// set
myImage.retina = false
```
<a name="UIImage.ratio"></a>

### UIImage.ratio : <code>string</code>
Getter|Setter : A String to set the background-size property.  Use the [Ratio](Ratio) class for constants that are easier
	to understand: [Ratio.EXACT](Ratio.EXACT), [Ratio.FIT](Ratio.FIT), [Ratio.FILL](Ratio.FILL), [Ratio.STRETCH](Ratio.STRETCH)

**Kind**: static property of [<code>UIImage</code>](#UIImage)  
**Example**  
```js
// get
console.log(myImage.ratio)

// set
myImage.ratio = Ratio.FILL
```
<a name="UIImage.aspectRatio"></a>

### UIImage.aspectRatio : <code>boolean</code>
Getter|Setter : A Boolean to allow for the size of the element to maintain aspect ratio when either the width or height
	are changed by directly setting them on the element, ie UIImage.width or UIImage.height.  If using Styles.setCss() this will NOT work.

**Kind**: static property of [<code>UIImage</code>](#UIImage)  
**Example**  
```js
// get
console.log(myImage.aspectRatio)

// set
myImage.aspectRatio = true
```
