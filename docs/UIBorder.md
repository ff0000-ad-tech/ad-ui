<a name="UIBorder"></a>

## UIBorder
**Kind**: global class  
**Npmpackage**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Element id. |
| target | <code>element</code> | DOM Element in which to create this border. |
| size | <code>number</code> | Border thickness. |
| color | <code>string</code> | Hex code representing border color. |


* [UIBorder](#UIBorder)
    * [new UIBorder(arg)](#new_UIBorder_new)
    * [.size](#UIBorder.size)
    * [.color](#UIBorder.color)

<a name="new_UIBorder_new"></a>

### new UIBorder(arg)
This is a display object class, extending UIDiv which adds a border to a div.<br>
	Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>


| Param | Type |
| --- | --- |
| arg | <code>object</code> | 

**Example**  
```js
import { UIBorder } from 'ad-ui'
// simple button that passes in an image to the bg and 2 images as the icons for the different states of the button.  Notice no width or height is set.
var myBorder = new UIBorder({
	id : 'my-border',
	target : View.main,
	size : 1,
	color : '#ff0000'
})
```
<a name="UIBorder.size"></a>

### UIBorder.size
Getter|Setter : A Number representing the size of the border in pixels.

**Kind**: static property of [<code>UIBorder</code>](#UIBorder)  
**Example**  
```js
// SET
myBorder.size = 4;

// GET
console.log( myBorder.size )
```
<a name="UIBorder.color"></a>

### UIBorder.color
Getter|Setter : A String representing the color of the border.

**Kind**: static property of [<code>UIBorder</code>](#UIBorder)  
**Example**  
```js
// SET
myBorder.color = '#fff000'

// GET
console.log(myBorder.color)
```
