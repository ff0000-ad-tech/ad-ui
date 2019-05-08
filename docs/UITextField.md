<a name="UITextField"></a>

## UITextField
**Kind**: global class  
**Npmpackage**:   

* [UITextField](#UITextField)
    * [new UITextField()](#new_UITextField_new)
    * [.alignText](#UITextField.alignText) : <code>string</code> \| <code>Align</code>
    * [.fontSize](#UITextField.fontSize) : <code>number</code>
    * [.minFontSize](#UITextField.minFontSize) : <code>number</code>
    * [.fontFamily](#UITextField.fontFamily) : <code>string</code>
    * [.format](#UITextField.format) : <code>string</code> \| [<code>TextFormat</code>](#TextFormat)
    * [.leading](#UITextField.leading) : <code>number</code>
    * [.spacing](#UITextField.spacing) : <code>number</code>
    * [.bufferText](#UITextField.bufferText) : <code>number</code> \| <code>array</code>
    * [.text](#UITextField.text) : <code>string</code>
    * [.smoothing](#UITextField.smoothing) : <code>boolean</code>
    * [.resetToDefault(arguments)](#UITextField.resetToDefault)
    * [.setDefault()](#UITextField.setDefault)

<a name="new_UITextField_new"></a>

### new UITextField()
This is a display object class, extending [UIComponent](#UIComponent).  By extending [UIComponent](#UIComponent) this has all of its native properties and methods.
See [UIComponent](#UIComponent) for more info.<br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
<pre class="sunlight-highlight-javascript">
import { UITextField } from 'ad-ui'
</pre>
It is a DOM element that contains text and handles its styling, layout, and formatting.  There are multiple format types, which allow for different
use cases, whether it be an auto word wrapping paragraph style or rigid lines.
<br><br>
Auto-sizing of font is built into the types, so there is no longer a need to run a secondary method.  Just set that type and it does it automatically.
See [TextFormat](#TextFormat) for more info on each type.
<br><br>
UITextfield works by utilizing native css properties to accomplish things like vertical and horizontal alignment, leading (line spacing),
and padding. There are getter/setters for display properties so generally speaking, there should not be a need to manually manipulate the css of the content.
Rather than having multiple nested divs that all must using their width and height to accomplish these, using the native css allows for greater control.
<br><br>
So, UITextField is simply a &lt;div> and a child &lt;span> element that holds the content. That &lt;span> element is relativly placed which is how all the css
works, so it is advised against targeting that &lt;span> for any reason.  Use the top level for animation.
<br><br>
<b>Sample 1:</b><br>
<pre class="sunlight-highlight-javascript">
// creates a textfield on Main container that displays text in a line
T.myTextField = new UITextField({
	target : T,
	id : 'my-textfield',
	css : {
		x : 50,
		y : 200,
		width : 300,
		height : 90
	},
	fontSize : 30,
	fontFamily : 'template_font',
	format : TextFormat.INLINE,
	alignText : Align.CENTER,
	bufferText : {
		top : 1,
		bottom : 1,
		left : 5,
		right : 5
	},
	leading : .8,
	spacing : 2,
	text : 'This is my awesome sentence!'
})
// referenced later anywhere outside the class by
View.main.myTextField
</pre>
<br><br>
<b>Sample 2:</b><br>
<pre class="sunlight-highlight-javascript">
// creates a textfield that displays text as a paragraph, but resizes to fit the container
T.myTextField = new UITextField ({
	target : T,
	id : 'my-textfield',
	css : {
		x : 50,
		y : 200,
		width : 200,
		height : 90
	},
	fontSize : 30,
	fontFamily : 'template_font',
	format : TextFormat.PARAGRAPH_FIT,
	alignText : Align.LEFT,
	leading : .8,
	text : 'This is my awesome sentence!'
});
</pre>
<br><br>
<b>Sample 3:</b><br>
<pre class="sunlight-highlight-javascript">
// creates a textfield and resizes the container to fit the text
View.main.myTextField = new UITextField ({
	target : View.main,
	id : 'my-textfield',
	css : {
		x : 50,
		y : 200,
		width : 30,
		height : 10
	},
	fontSize : 30,
	fontFamily : 'template_font',
	format : TextFormat.INLINE_CLAMP,
	alignText : Align.LEFT,
	leading : .8,
	text : 'This is my awesome sentence!'
});
</pre>

<a name="UITextField.alignText"></a>

### UITextField.alignText : <code>string</code> \| <code>Align</code>
Getter|Setter : A String, or [Align](Align) constant, representing the alignment of the text content inside the UITextField.

**Kind**: static property of [<code>UITextField</code>](#UITextField)  
**Example**  
```js
// change the size of the font
View.main.myTextField.alignText = Align.BOTTOM_RIGHT

// get the current size of the font
console.log(View.main.myTextField.alignText)
```
<a name="UITextField.fontSize"></a>

### UITextField.fontSize : <code>number</code>
Getter|Setter : A Number representing the current size of the text font.

**Kind**: static property of [<code>UITextField</code>](#UITextField)  
**Example**  
```js
// change the size of the font
View.main.myTextField.fontSize = 14

// get the current size of the font
console.log(View.main.myTextField.fontSize)
```
<a name="UITextField.minFontSize"></a>

### UITextField.minFontSize : <code>number</code>
Getter|Setter : A Number representing the minimum size of the text font to avoid resozing down to 0. Default is 1.

**Kind**: static property of [<code>UITextField</code>](#UITextField)  
**Example**  
```js
// change the minimum size of the font
View.main.myTextField.minFontSize = 5

// get the current minimum size of the font
console.log(View.main.myTextField.minFontSize)
```
<a name="UITextField.fontFamily"></a>

### UITextField.fontFamily : <code>string</code>
Getter|Setter : A String representing the current font family being assigned to the text.

**Kind**: static property of [<code>UITextField</code>](#UITextField)  
**Example**  
```js
// change the font
View.main.myTextField.fontFamily = 'Arial'

// get the current font
console.log(View.main.myTextField.fontFamily)
```
<a name="UITextField.format"></a>

### UITextField.format : <code>string</code> \| [<code>TextFormat</code>](#TextFormat)
Getter|Setter : A String, or [TextFormat](#TextFormat) constant, representing the layout type for the text within the UITextField.  
	<br><br>
	This is what defines if the text is either in a line, word wrapped like a paragraph, has auto sizing to the font soze or if the 
	UITextField is resized to the content.  See [TextFormat](#TextFormat) for more info.

**Kind**: static property of [<code>UITextField</code>](#UITextField)  
**Example**  
```js
View.main.myTextField = new UITextField({
	target : View.main,
	id : 'my-textfield',
	css : {
		width : 200,
		height : 90
	},
	fontSize : 30,
	format : TextFormat.INLINE,
	text : 'This is my awesome sentence!'
})

// change from an inline to a word warping paragraph style
View.main.myTextField.format = TextFormat.PARAGRAPH

// change back to inline with autosizing
View.main.myTextField.format = TextFormat.INLINE_FIT

// change back to a word warpping paragraph style that auto sizes the font to fit perfectly
View.main.myTextField.format = TextFormat.PARAGRAPH_FIT

// resize the UITextField to fit the size of all the text as inline
View.main.myTextField.format = TextFormat.INLINE_CLAMP

// resize the UITextField to fit the size of all the text as a paragraph
View.main.myTextField.format = TextFormat.PARAGRAPH_CLAMP
```
<a name="UITextField.leading"></a>

### UITextField.leading : <code>number</code>
Getter|Setter : A Number representing the percentage of spacing between each line relative to the font size.
	<br>
	By default, a value of 1 is equal to a default line-height value similar to Photoshop. A value of 0 will have each line on top of each other,
	as if it was written over the previous line.  So to create a look that is slightly tighter than default, you would use something like a value of .8 to bring
	the lines a little closer together.
	<br>
	The use of a percentage allows for the font size to change without having to redefine the line-height spacing.

**Kind**: static property of [<code>UITextField</code>](#UITextField)  
**Example**  
```js
// change the percentage of spacing between lines relative to the font size
View.main.myTextField.leading = .8

// get the current percentage of spacing between lines relative to the font size
console.log(View.main.myTextField.leading)
```
<a name="UITextField.spacing"></a>

### UITextField.spacing : <code>number</code>
Getter|Setter : A Number representing the spacing between each letter.

**Kind**: static property of [<code>UITextField</code>](#UITextField)  
**Example**  
```js
// change the spacing between each letter
View.main.myTextField.spacing = 3

// get the current letter spacing
console.log(View.main.myTextField.spacing)
```
<a name="UITextField.bufferText"></a>

### UITextField.bufferText : <code>number</code> \| <code>array</code>
Getter|Setter : A Number or Array of Numbers representing the amount of spacing from the edges of the UITextField and the
	text content.
	<br><br>
	This sets the css margin, but also is used for calculations for auto sized formats.  Setting the margin
	manually will cause layout issues as the class does not have those numbers to calculate against.

**Kind**: static property of [<code>UITextField</code>](#UITextField)  
**Example**  
```js
// set the padding on all 4 sides uniformly
View.main.myTextField.bufferText = 5

// set the padding on top & bottom = 7 and left & right = 5
View.main.myTextField.bufferText = [7, 5]

// set the top = 7, right = 3, bottom = 5, left = 6
View.main.myTextField.bufferText = [7, 3, 5, 6]

// get the current padding
console.log(View.main.myTextField.bufferText)
```
<a name="UITextField.text"></a>

### UITextField.text : <code>string</code>
Getter|Setter : A String representing the current String text content.

**Kind**: static property of [<code>UITextField</code>](#UITextField)  
**Example**  
```js
// change the display text
View.main.myTextField.text = "Change my text to say this."

// get the current display text
console.log(View.main.myTextField.text)
```
<a name="UITextField.smoothing"></a>

### UITextField.smoothing : <code>boolean</code>
Getter|Setter : A Boolean to add or remove the css smoothing: <code>-webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;</code>

**Kind**: static property of [<code>UITextField</code>](#UITextField)  
**Example**  
```js
View.main.myTextField.smoothing = false

// get the current smoothing
console.log(View.main.myTextField.smoothing)
```
<a name="UITextField.resetToDefault"></a>

### UITextField.resetToDefault(arguments)
Change specific properties, or all properties (by passing nothing in) back to their default values, which are initally set to the values passed in upon instantiation
	of a UITextField. This is useful when reusing a UITextField for multiple inputs, such as with carousels where the content is
	constantly updating and the carousel scrolls.

**Kind**: static method of [<code>UITextField</code>](#UITextField)  

| Param | Type |
| --- | --- |
| arguments | <code>args</code> | 

**Example**  
```js
// reset all properties to their default values by passing in no parameters
myTextField.resetToDefault()

// reset only these two specific properties to their default values by passing in Strings
myTextField.resetToDefault('leading', 'fontSize')
```
<a name="UITextField.setDefault"></a>

### UITextField.setDefault()
Assign a default value, so that when resetToDefault() is called, it will include this value.

**Kind**: static method of [<code>UITextField</code>](#UITextField)  
**Example**  
```js
myTextField.setDefault('fontSize', 16)
```
