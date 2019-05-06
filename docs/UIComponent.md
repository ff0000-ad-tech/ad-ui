<a name="UIComponent"></a>

## UIComponent
**Kind**: global class  
**Npmpackage**:   

* [UIComponent](#UIComponent)
    * [new UIComponent()](#new_UIComponent_new)
    * [.x](#UIComponent.x) : <code>number</code>
    * [.y](#UIComponent.y) : <code>number</code>
    * [.enabled](#UIComponent.enabled) : <code>boolean</code>
    * [.showing](#UIComponent.showing) : <code>boolean</code>
    * [.width](#UIComponent.width) : <code>number</code>
    * [.height](#UIComponent.height) : <code>number</code>
    * [.hide()](#UIComponent.hide)
    * [.show()](#UIComponent.show)
    * [.setCss()](#UIComponent.setCss)
    * [.addChild()](#UIComponent.addChild)
    * [.inspect()](#UIComponent.inspect)
    * [.toString()](#UIComponent.toString)

<a name="new_UIComponent_new"></a>

### new UIComponent()
This is a display object class, which is an extension of a DOM element &lt;div> with extra base functionality.
There are inherited properties and methods for enabling, show, hide, etc. It is a base class that can be
extended for custom UI elements. <br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
<pre class="sunlight-highlight-javascript">
import { UIComponent } from 'ad-ui'
</pre>
<br><br>
<b>Sample 1:</b><br>
<pre class="sunlight-highlight-javascript">
// bare minimum creation - can be added to anything and named later.
var myBase = new UIComponent();
</pre>
<br><br>
<b>Sample 2:</b><br>
<pre class="sunlight-highlight-javascript">
// simple creation - no style
var myBase = new UIComponent({
	target: View.main,
	id: 'my-component'
})
</pre>
<br><br>
<b>Sample 3:</b><br>
<pre class="sunlight-highlight-javascript">
// create with assigned styles
var myBase = new UIComponent({
	target: View.main,
	id: 'my-component',
	css: {
		x: 36,
		y: 14,
		width: 120,
		height: 140
	}
})
</pre>
<br><br>
<b>Sample 4:</b><br>
<pre class="sunlight-highlight-javascript">
// create and align the image inline
var myImage = new UIComponent({
	target: View.main,
	id: 'my-component',
	align: {
		x:{
			type: Align.RIGHT,
			offset: -10
		},
		y: {
			type: Align.TOP,
			offset: 10
		}
	}
})
</pre>
<br><br>

<a name="UIComponent.x"></a>

### UIComponent.x : <code>number</code>
Getter|Setter : A Number representing the x position.  Directly gets/sets the css transform x.

**Kind**: static property of [<code>UIComponent</code>](#UIComponent)  
**Example**  
```js
// get
console.log(myComponent.x)

// set
myComponent.x = 7
```
<a name="UIComponent.y"></a>

### UIComponent.y : <code>number</code>
Getter|Setter : A Number representing the y position.  Directly gets/sets the css transform y.

**Kind**: static property of [<code>UIComponent</code>](#UIComponent)  
**Example**  
```js
// get
console.log(myComponent.y)

// set
myComponent.y = 14
```
<a name="UIComponent.enabled"></a>

### UIComponent.enabled : <code>boolean</code>
Getter|Setter : A Boolean to toggle if the Gesture events are active.

**Kind**: static property of [<code>UIComponent</code>](#UIComponent)  
**Example**  
```js
// get
console.log(myComponent.enabled)

// set
myComponent.enabled = true
```
<a name="UIComponent.showing"></a>

### UIComponent.showing : <code>boolean</code>
Getter|Setter : A Boolean to check if the component is currently showing. Can NOT be set.

**Kind**: static property of [<code>UIComponent</code>](#UIComponent)  
**Example**  
```js
// get
console.log(myComponent.showing)
```
<a name="UIComponent.width"></a>

### UIComponent.width : <code>number</code>
Getter|Setter : A Number representing the width of the div.  Directly gets/sets the style css width.

**Kind**: static property of [<code>UIComponent</code>](#UIComponent)  
**Example**  
```js
// get
console.log(myComponent.width)

// set
myComponent.width = 140
```
<a name="UIComponent.height"></a>

### UIComponent.height : <code>number</code>
Getter|Setter : A Number representing the height of the div.  Directly gets/sets the style css height.

**Kind**: static property of [<code>UIComponent</code>](#UIComponent)  
**Example**  
```js
// get
console.log(myComponent.height)

// set
myComponent.height = 140
```
<a name="UIComponent.hide"></a>

### UIComponent.hide()
Visually removes the component from the DOM by setting its display property to none

**Kind**: static method of [<code>UIComponent</code>](#UIComponent)  
**Example**  
```js
myComponent.hide()
```
<a name="UIComponent.show"></a>

### UIComponent.show()
Visually displays the component in the DOM

**Kind**: static method of [<code>UIComponent</code>](#UIComponent)  
**Example**  
```js
myComponent.show()
```
<a name="UIComponent.setCss"></a>

### UIComponent.setCss()
Set any of the style properites of the component.  A direct link to Styles.setCss() for convience.

**Kind**: static method of [<code>UIComponent</code>](#UIComponent)  
**Example**  
```js
myComponent.setCss({
	width : 300,
	height : 150
})
```
<a name="UIComponent.addChild"></a>

### UIComponent.addChild()
Add a DOM element to the component.

**Kind**: static method of [<code>UIComponent</code>](#UIComponent)  
**Example**  
```js
myComponent.addChild(myChild)
```
<a name="UIComponent.inspect"></a>

### UIComponent.inspect()
Traces out an object of all the public properties and methods of the component.

**Kind**: static method of [<code>UIComponent</code>](#UIComponent)  
**Example**  
```js
myComponent.inspect()
```
<a name="UIComponent.toString"></a>

### UIComponent.toString()
A String to represet the object type.

**Kind**: static method of [<code>UIComponent</code>](#UIComponent)  
**Example**  
```js
myComponent.toString()
```
